'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TailoringDashboard() {
  const router = useRouter();
  const [resumeId, setResumeId] = useState('');
  const [jobId, setJobId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleStartTailoring = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Assuming a mock token for local manual testing since there's no complex UI auth context here
      const token = localStorage.getItem('token') || 'dummy-token';
      
      const response = await fetch('/api/v1/tailoring', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resumeId, jobId })
      });

      if (!response.ok) {
        throw new Error('Failed to start tailoring session');
      }

      const session = await response.json();
      router.push(`/tailoring/${session.id}`);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Resume Tailoring Engine</h1>
      
      <div className="bg-black border-2 border-amber-900/50 rounded-none shadow-md p-6 border border-amber-900/50">
        <h2 className="text-xl font-semibold mb-4">Start New Session</h2>
        <p className="text-amber-400/80 mb-6">
          Select a resume and a target job to have Groq AI automatically rewrite and optimize your bullet points.
        </p>

        {error && (
          <div className="bg-red-900/30 border-2 border-red-600 text-red-500 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleStartTailoring} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-1">Resume ID</label>
            <input 
              type="number" 
              required
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              className="w-full border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded p-2"
              placeholder="e.g. 1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-200 mb-1">Job ID</label>
            <input 
              type="number" 
              required
              value={jobId}
              onChange={(e) => setJobId(e.target.value)}
              className="w-full border border-2 border-amber-900/50 bg-black text-amber-50 hover:border-red-600 transition-colors rounded p-2"
              placeholder="e.g. 1"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-red-600 hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all hover:-translate-y-1 text-amber-50 font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50"
          >
            {loading ? 'Generating AI Resume...' : 'Tailor Resume'}
          </button>
        </form>
      </div>
    </div>
  );
}
