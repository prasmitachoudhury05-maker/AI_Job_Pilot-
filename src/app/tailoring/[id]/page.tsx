'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function TailoringEditor() {
  const params = useParams();
  const router = useRouter();
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const token = localStorage.getItem('token') || 'dummy-token';
        const response = await fetch(`/api/v1/tailoring/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) throw new Error('Failed to load tailoring session');
        
        const data = await response.json();
        setSession(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchSession();
  }, [params.id]);

  if (loading) return <div className="p-10 text-center">Loading AI Editor...</div>;
  if (error) return <div className="p-10 text-red-500 text-center">Error: {error}</div>;
  if (!session) return null;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Resume Editor</h1>
        <button onClick={() => router.push('/tailoring')} className="text-blue-600 hover:underline">
          &larr; Back to Dashboard
        </button>
      </div>

      {/* Metrics Header */}
      <div className="bg-white rounded-lg shadow p-4 mb-6 flex gap-8 items-center border border-gray-200">
        <div>
          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Original ATS Match</span>
          <div className="text-2xl font-bold text-gray-800">{session.originalAtsScore}%</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">New ATS Match</span>
          <div className="text-2xl font-bold text-green-600">{session.newAtsScore}%</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Improvement</span>
          <div className="text-2xl font-bold text-blue-600">+{session.scoreImprovement}%</div>
        </div>
      </div>

      {/* Side-by-side Editor */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[600px]">
          <div className="bg-gray-50 border-b p-3 font-semibold text-gray-700">Original Resume</div>
          <div className="p-4 flex-1 overflow-y-auto whitespace-pre-wrap text-sm text-gray-600">
            {session.originalResume}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-green-200 flex flex-col h-[600px]">
          <div className="bg-green-50 border-b border-green-200 p-3 font-semibold text-green-800">Tailored Resume (AI)</div>
          <textarea 
            className="p-4 flex-1 w-full resize-none outline-none text-sm text-gray-800 bg-transparent"
            defaultValue={session.tailoredResume}
          />
        </div>
      </div>

      {/* AI Change Logs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="bg-gray-50 border-b p-3 font-semibold text-gray-700">AI Modifications</div>
        <div className="p-4 space-y-4">
          {session.changeLogs && session.changeLogs.length > 0 ? (
            session.changeLogs.map((log: any) => (
              <div key={log.id} className="border border-blue-100 bg-blue-50/30 p-4 rounded-md">
                <p className="text-sm text-gray-500 mb-2 font-medium">Why we changed this:</p>
                <p className="text-sm italic text-blue-800 mb-4">{log.explanation}</p>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-xs text-red-600 line-through bg-red-50 p-2 rounded">
                    {log.originalText}
                  </div>
                  <div className="text-xs text-green-700 bg-green-50 p-2 rounded">
                    {log.tailoredText}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No major AI modifications were recorded for this session.</p>
          )}
        </div>
      </div>
    </div>
  );
}
