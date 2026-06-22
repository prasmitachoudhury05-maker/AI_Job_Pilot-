'use client';

import { useState, useEffect } from 'react';

export default function InterviewPrepDashboard() {
  const [resumeId, setResumeId] = useState('');
  const [jobId, setJobId] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [history, setHistory] = useState<any[]>([]);
  const [activePrep, setActivePrep] = useState<any>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      const response = await fetch('/api/v1/interview-prep', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setHistory(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      
      const response = await fetch('/api/v1/interview-prep', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resumeId, jobId })
      });

      if (!response.ok) {
        throw new Error('Failed to generate interview prep');
      }

      const doc = await response.json();
      setActivePrep(doc);
      fetchHistory(); // refresh list
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold mb-8 text-amber-50">Interview Prep Coaching</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & History */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-sm border border-amber-900/50 p-6">
            <h2 className="text-xl font-semibold mb-4 text-amber-50">Generate Cheat Sheet</h2>
            
            {error && (
              <div className="bg-red-900/30 border-2 border-red-600 text-red-500 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-amber-200 dark:text-gray-300 mb-1">Resume ID</label>
                <input 
                  type="number" required
                  value={resumeId} onChange={(e) => setResumeId(e.target.value)}
                  className="w-full border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors dark:border-slate-600 dark:bg-slate-700 text-amber-50 rounded p-2"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-amber-200 dark:text-gray-300 mb-1">Job ID (from Tracking CRM)</label>
                <input 
                  type="number" required
                  value={jobId} onChange={(e) => setJobId(e.target.value)}
                  className="w-full border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors dark:border-slate-600 dark:bg-slate-700 text-amber-50 rounded p-2"
                  placeholder="e.g. 1"
                />
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-red-600 hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all hover:-translate-y-1 text-amber-50 font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? 'AI Coach is analyzing...' : 'Generate Prep Sheet'}
              </button>
            </form>
          </div>

          <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-sm border border-amber-900/50 p-6">
            <h2 className="text-xl font-semibold mb-4 text-amber-50">Saved Prep Sheets</h2>
            {history.length === 0 ? (
              <p className="text-sm text-amber-400/80 dark:text-gray-400">No prep sheets generated yet.</p>
            ) : (
              <ul className="space-y-3">
                {history.map((doc: any) => (
                  <li 
                    key={doc.id} 
                    onClick={() => setActivePrep(doc)}
                    className="p-3 border dark:border-amber-900/50 rounded cursor-pointer hover:bg-amber-950/50 dark:hover:bg-slate-700 transition"
                  >
                    <div className="font-medium text-sm text-amber-50">{doc.job?.title || 'Unknown Job'}</div>
                    <div className="text-xs text-amber-400/80 dark:text-gray-400">{doc.job?.companyName}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Editor/Preview */}
        <div className="lg:col-span-2">
          <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-sm border border-amber-900/50 h-[800px] flex flex-col">
            <div className="bg-amber-950/50 bg-black border-2 border-amber-900/50 border-b dark:border-amber-900/50 p-4 flex justify-between items-center">
              <h2 className="text-xl font-black uppercase tracking-wider text-gray-800 text-amber-50">
                {activePrep ? `Cheat Sheet: ${activePrep.job?.companyName || 'Job'}` : 'Select a Cheat Sheet'}
              </h2>
            </div>
            
            <div className="p-0 flex-1 overflow-auto">
              {activePrep ? (
                <div className="p-8 prose dark:prose-invert max-w-none">
                  {/* Super simple markdown rendering to keep dependencies low */}
                  {activePrep.content.split('\n').map((line: string, i: number) => {
                    if (line.startsWith('### ')) return <h3 key={i} className="text-2xl font-black uppercase tracking-widest mt-6 mb-2">{line.replace('### ', '')}</h3>;
                    if (line.startsWith('- ')) return <li key={i} className="ml-4 mb-1">{line.replace('- ', '')}</li>;
                    if (line.trim() === '') return <br key={i} />;
                    return <p key={i} className="mb-2">{line}</p>;
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400 dark:text-amber-400/80">
                  Select or generate a cheat sheet to prep for your interview.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
