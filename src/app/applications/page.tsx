'use client';

import { useState, useEffect } from 'react';

const STATUSES = ['APPLIED', 'INTERVIEWING', 'OFFER', 'REJECTED', 'WITHDRAWN'];

export default function ApplicationTracking() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newJobId, setNewJobId] = useState('');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      const response = await fetch('/api/v1/applications', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch applications');
      const data = await response.json();
      setApplications(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      const response = await fetch(`/api/v1/applications/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (response.ok) {
        fetchApplications();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJobId) return;
    
    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      const response = await fetch('/api/v1/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ jobId: parseInt(newJobId, 10), status: 'APPLIED' })
      });
      if (response.ok) {
        setNewJobId('');
        fetchApplications();
      } else {
        const data = await response.json();
        alert(data.detail || 'Failed to log application');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-10 text-center">Loading Tracking Board...</div>;

  return (
    <div className="container mx-auto p-6 max-w-[1400px]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Application Tracking</h1>
        
        <form onSubmit={handleLogApplication} className="flex gap-2">
          <input 
            type="number" 
            placeholder="Job ID to track..." 
            value={newJobId}
            onChange={(e) => setNewJobId(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
            required
          />
          <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Log App
          </button>
        </form>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="flex gap-6 overflow-x-auto pb-4">
        {STATUSES.map(status => {
          const columnApps = applications.filter(app => app.status === status);
          
          return (
            <div key={status} className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0 min-h-[500px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-gray-700">{status.replace('_', ' ')}</h2>
                <span className="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-bold">
                  {columnApps.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {columnApps.map(app => (
                  <div key={app.id} className="bg-white p-4 rounded shadow-sm border border-gray-200 hover:border-blue-400 transition">
                    <h3 className="font-semibold text-gray-900 truncate" title={app.job?.title}>
                      {app.job?.title || 'Unknown Job'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{app.job?.companyName || 'Unknown Company'}</p>
                    
                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                      <select 
                        className="text-xs border-none bg-gray-50 text-gray-600 rounded p-1 cursor-pointer outline-none w-full"
                        value={app.status}
                        onChange={(e) => handleUpdateStatus(app.id, e.target.value)}
                      >
                        {STATUSES.map(s => (
                          <option key={s} value={s}>{s.replace('_', ' ')}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
