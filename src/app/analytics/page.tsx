'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts';

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState<any>(null);
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      const headers = { 'Authorization': `Bearer ${token}` };

      const [metricsRes, funnelRes, timelineRes] = await Promise.all([
        fetch('/api/v1/analytics/metrics', { headers }),
        fetch('/api/v1/analytics/funnel', { headers }),
        fetch('/api/v1/analytics/timeline', { headers })
      ]);

      if (metricsRes.ok) setMetrics(await metricsRes.json());
      if (funnelRes.ok) setFunnelData(await funnelRes.json());
      if (timelineRes.ok) setTimelineData(await timelineRes.json());

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = () => {
    window.print();
  };

  if (loading) return <div className="p-10 text-center">Loading Analytics...</div>;

  return (
    <div className="container mx-auto p-6 max-w-7xl print:max-w-none print:p-0">
      
      <div className="flex justify-between items-center mb-8 print:mb-4">
        <div>
          <h1 className="text-3xl font-bold text-amber-50">Job Search Analytics</h1>
          <p className="text-amber-400/80">Performance & Conversion Metrics</p>
        </div>
        <button 
          onClick={handleExportPDF}
          className="bg-red-600 text-amber-50 px-4 py-2 rounded hover:bg-black hover:text-red-600 hover:border-red-600 border-2 border-transparent transition-all hover:-translate-y-1 print:hidden"
        >
          Export PDF
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-black border-2 border-amber-900/50 p-6 rounded-none shadow-sm border border-amber-900/50">
          <div className="text-sm font-medium text-amber-400/80 mb-1">Total Applications</div>
          <div className="text-4xl font-bold text-amber-50">{metrics?.total || 0}</div>
        </div>
        <div className="bg-black border-2 border-amber-900/50 p-6 rounded-none shadow-sm border border-amber-900/50">
          <div className="text-sm font-medium text-amber-400/80 mb-1">Currently Interviewing</div>
          <div className="text-4xl font-bold text-red-500">{metrics?.interviewing || 0}</div>
        </div>
        <div className="bg-black border-2 border-amber-900/50 p-6 rounded-none shadow-sm border border-amber-900/50">
          <div className="text-sm font-medium text-amber-400/80 mb-1">Offers Received</div>
          <div className="text-4xl font-bold text-green-600">{metrics?.offer || 0}</div>
        </div>
        <div className="bg-black border-2 border-amber-900/50 p-6 rounded-none shadow-sm border border-amber-900/50">
          <div className="text-sm font-medium text-amber-400/80 mb-1">Rejections</div>
          <div className="text-4xl font-bold text-red-500">{metrics?.rejected || 0}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Funnel Chart */}
        <div className="bg-black border-2 border-amber-900/50 p-6 rounded-none shadow-sm border border-amber-900/50">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6">Application Funnel</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={120} />
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-black border-2 border-amber-900/50 p-6 rounded-none shadow-sm border border-amber-900/50">
          <h2 className="text-2xl font-black uppercase tracking-widest mb-6">Application Volume (Last 30 Days)</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timelineData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{fontSize: 12}} minTickGap={30} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Line type="monotone" dataKey="applications" stroke="#8b5cf6" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Print styles specifically hiding navbar if it exists, adjusting margins */}
      <style jsx global>{`
        @media print {
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          nav, header { display: none !important; }
          .container { max-width: 100% !important; margin: 0 !important; padding: 20px !important; }
        }
      `}</style>
    </div>
  );
}
