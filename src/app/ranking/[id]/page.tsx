'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import rankingService from '../../../services/rankingService';
import { RankingResponse } from '../../../types/ranking';
import { ArrowLeft, TrendingUp, BarChart3, MessageSquare, CheckCircle, XCircle } from 'lucide-react';

export default function RankingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [ranking, setRanking] = useState<RankingResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadRanking();
  }, [params.id]);

  const loadRanking = async () => {
    setLoading(true);
    setError(null);
    try {
      const response: RankingResponse = await rankingService.rankJob({
        candidate_profile: {},
        job_id: Number(params.id),
        use_ai: true,
      });
      setRanking(response);
    } catch (err: any) {
      setError('Failed to load ranking details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-transparent py-12 px-4">
        <div className="max-w-4xl mx-auto flex justify-center">
          <div className="animate-spin rounded-none h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </div>
    );
  }

  if (error || !ranking) {
    return (
      <div className="min-h-screen bg-transparent py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-900/30 border-2 border-red-600 text-red-500 border border-red-200 rounded-none p-4">
            <p className="text-red-500">{error || 'Ranking not found'}</p>
          </div>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-red-500';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-900/30 border-2 border-green-500 text-green-500';
    if (score >= 60) return 'bg-red-900/30';
    if (score >= 40) return 'bg-yellow-900/30 border-2 border-yellow-500 text-yellow-500';
    return 'bg-red-900/30 border-2 border-red-600 text-red-500';
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-4"
          >
            <ArrowLeft size={20} />
            Back to Rankings
          </button>
          <h1 className="text-3xl font-bold text-amber-50 mb-2">
            Job #{ranking.job_id} Ranking Details
          </h1>
          <p className="text-amber-400/80">
            Rank #{ranking.rank} • Overall Score: {ranking.overall_score.toFixed(1)}%
          </p>
        </div>

        {/* Overall Score Card */}
        <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-amber-50 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-purple-600" />
              Overall Match Score
            </h2>
            <div className={`text-4xl font-bold ${getScoreColor(ranking.overall_score)}`}>
              {ranking.overall_score.toFixed(1)}%
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-none h-4 mb-4">
            <div
              className={`h-4 rounded-none transition-all duration-300 ${
                ranking.overall_score >= 80 ? 'bg-green-900/30 border-2 border-green-500 text-green-5000' :
                ranking.overall_score >= 60 ? 'bg-blue-900/30 border-2 border-blue-500 text-blue-5000' :
                ranking.overall_score >= 40 ? 'bg-yellow-500' : 'bg-red-900/30 border-2 border-red-600 text-red-5000'
              }`}
              style={{ width: `${ranking.overall_score}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between text-sm text-amber-400/80">
            <span>Confidence Score: {ranking.confidence_score.toFixed(1)}%</span>
            <span>AI Ranking: {ranking.ai_ranking ? 'Enabled' : 'Disabled'}</span>
          </div>
        </div>

        {/* Scoring Breakdown */}
        <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-amber-50 mb-4 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-purple-600" />
            Scoring Breakdown
          </h2>
          <div className="space-y-4">
            {Object.entries(ranking.breakdown).map(([factor, data]: [string, any]) => (
              <div key={factor}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-amber-200 capitalize">
                    {factor}
                  </span>
                  <span className={`text-sm font-bold ${getScoreColor(data.score)}`}>
                    {data.score.toFixed(1)}% (Weight: {(data.weight * 100).toFixed(0)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-none h-2">
                  <div
                    className={`h-2 rounded-none transition-all duration-300 ${
                      data.score >= 80 ? 'bg-green-900/30 border-2 border-green-500 text-green-5000' :
                      data.score >= 60 ? 'bg-blue-900/30 border-2 border-blue-500 text-blue-5000' :
                      data.score >= 40 ? 'bg-yellow-500' : 'bg-red-900/30 border-2 border-red-600 text-red-5000'
                    }`}
                    style={{ width: `${data.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Match */}
        <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-amber-50 mb-4">Skills Match</h2>
          <div className="mb-4">
            <p className="text-sm text-amber-400/80 mb-2">
              Matched Skills ({ranking.skills_match.matched_skills.length}):
            </p>
            <div className="flex flex-wrap gap-2">
              {ranking.skills_match.matched_skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 border-2 border-green-500 text-green-500 text-green-500 rounded-none text-sm"
                >
                  <CheckCircle size={14} />
                  {skill}
                </span>
              ))}
            </div>
          </div>
          {ranking.skills_match.missing_skills.length > 0 && (
            <div>
              <p className="text-sm text-amber-400/80 mb-2">
                Missing Skills ({ranking.skills_match.missing_skills.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {ranking.skills_match.missing_skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-red-900/30 border-2 border-red-600 text-red-500 text-red-500 rounded-none text-sm"
                  >
                    <XCircle size={14} />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* AI Explanation */}
        <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-amber-50 mb-4 flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-purple-600" />
            AI Explanation
          </h2>
          <div className="prose max-w-none">
            <p className="text-amber-200 whitespace-pre-wrap">{ranking.explanation}</p>
          </div>
        </div>

        {/* Match Status */}
        <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md p-6">
          <h2 className="text-xl font-semibold text-amber-50 mb-4">Match Status</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-none ${getScoreBgColor(ranking.experience_match.score)}`}>
              <p className="text-sm font-medium text-amber-200">Experience</p>
              <p className={`text-lg font-bold ${getScoreColor(ranking.experience_match.score)}`}>
                {ranking.experience_match.score.toFixed(1)}%
              </p>
              <p className="text-xs text-amber-400/80">{ranking.experience_match.status}</p>
            </div>
            <div className={`p-4 rounded-none ${getScoreBgColor(ranking.location_match.score)}`}>
              <p className="text-sm font-medium text-amber-200">Location</p>
              <p className={`text-lg font-bold ${getScoreColor(ranking.location_match.score)}`}>
                {ranking.location_match.score.toFixed(1)}%
              </p>
              <p className="text-xs text-amber-400/80">{ranking.location_match.status}</p>
            </div>
            <div className={`p-4 rounded-none ${getScoreBgColor(ranking.salary_match.score)}`}>
              <p className="text-sm font-medium text-amber-200">Salary</p>
              <p className={`text-lg font-bold ${getScoreColor(ranking.salary_match.score)}`}>
                {ranking.salary_match.score.toFixed(1)}%
              </p>
              <p className="text-xs text-amber-400/80">{ranking.salary_match.status}</p>
            </div>
            <div className={`p-4 rounded-none ${getScoreBgColor(ranking.industry_match.score)}`}>
              <p className="text-sm font-medium text-amber-200">Industry</p>
              <p className={`text-lg font-bold ${getScoreColor(ranking.industry_match.score)}`}>
                {ranking.industry_match.score.toFixed(1)}%
              </p>
              <p className="text-xs text-amber-400/80">{ranking.industry_match.status}</p>
            </div>
            <div className={`p-4 rounded-none ${getScoreBgColor(ranking.seniority_match.score)}`}>
              <p className="text-sm font-medium text-amber-200">Seniority</p>
              <p className={`text-lg font-bold ${getScoreColor(ranking.seniority_match.score)}`}>
                {ranking.seniority_match.score.toFixed(1)}%
              </p>
              <p className="text-xs text-amber-400/80">{ranking.seniority_match.status}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
