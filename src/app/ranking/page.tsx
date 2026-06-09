'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import rankingService from '../../services/rankingService';
import { RankingResponse, BatchRankingResponse } from '../../types/ranking';
import { TrendingUp, Filter, Download, RefreshCw } from 'lucide-react';

export default function RankingDashboardPage() {
  const router = useRouter();
  const [rankings, setRankings] = useState<RankingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useAI, setUseAI] = useState(true);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [apiCost, setApiCost] = useState(0);
  const [apiTokens, setApiTokens] = useState(0);

  useEffect(() => {
    loadRankings();
  }, [useAI]);

  const loadRankings = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: BatchRankingResponse = await rankingService.rankJobsBatch({
        candidate_profile: {},
        use_ai: useAI,
      });
      setRankings(response.rankings);
      setApiCost(response.api_cost);
      setApiTokens(response.api_tokens);
    } catch (err: any) {
      setError('Failed to load rankings');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadRankings();
  };

  const handleExport = async () => {
    try {
      const data = await rankingService.exportRankings('csv');
      const blob = new Blob([data.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `rankings-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  const handleJobClick = (jobId: number) => {
    setSelectedJobId(jobId);
    router.push(`/ranking/${jobId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <TrendingUp className="w-10 h-10 text-purple-600" />
            Job Ranking Dashboard
          </h1>
          <p className="text-gray-600">
            AI-powered job matching and ranking based on your profile
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useAI}
                  onChange={(e) => setUseAI(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm font-medium text-gray-700">Use AI Ranking</span>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>
          {useAI && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                API Cost: ${apiCost.toFixed(4)} | Tokens Used: {apiTokens}
              </p>
            </div>
          )}
        </div>

        {/* Rankings List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Ranked Jobs</h2>
            <p className="text-sm text-gray-600 mt-1">
              {rankings.length} jobs ranked by match score
            </p>
          </div>
          
          {rankings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No rankings available. Click refresh to load rankings.
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {rankings.map((ranking) => (
                <div
                  key={ranking.job_id}
                  onClick={() => handleJobClick(ranking.job_id)}
                  className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-lg font-bold text-purple-600">
                          #{ranking.rank}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Job #{ranking.job_id}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Overall Score: {ranking.overall_score.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">Confidence</p>
                        <p className="text-lg font-bold text-purple-600">
                          {ranking.confidence_score.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">Skills</p>
                        <p className="text-lg font-bold text-blue-600">
                          {ranking.skills_match.score.toFixed(1)}%
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-700">Experience</p>
                        <p className="text-lg font-bold text-green-600">
                          {ranking.experience_match.score.toFixed(1)}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {ranking.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
