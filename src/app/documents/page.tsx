'use client';

import { useState, useEffect } from 'react';

export default function DocumentGenerator() {
  const [resumeId, setResumeId] = useState('');
  const [jobId, setJobId] = useState('');
  const [documentType, setDocumentType] = useState('COVER_LETTER');
  const [tone, setTone] = useState('Professional');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [documents, setDocuments] = useState<any[]>([]);
  const [activeDocument, setActiveDocument] = useState<any>(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem('token') || 'dummy-token';
      const response = await fetch('/api/v1/documents', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
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
      
      const response = await fetch('/api/v1/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ resumeId, jobId, documentType, tone })
      });

      if (!response.ok) {
        throw new Error('Failed to generate document');
      }

      const doc = await response.json();
      setActiveDocument(doc);
      fetchHistory(); // refresh list
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Document Generation Engine</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form & History */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Generate New Document</h2>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Resume ID</label>
                <input 
                  type="number" required
                  value={resumeId} onChange={(e) => setResumeId(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job ID</label>
                <input 
                  type="number" required
                  value={jobId} onChange={(e) => setJobId(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                  placeholder="e.g. 1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select 
                  value={documentType} onChange={(e) => setDocumentType(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 bg-white"
                >
                  <option value="COVER_LETTER">Cover Letter</option>
                  <option value="OUTREACH_LINKEDIN">LinkedIn Recruiter Note</option>
                  <option value="OUTREACH_EMAIL">Cold Email</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
                <select 
                  value={tone} onChange={(e) => setTone(e.target.value)}
                  className="w-full border border-gray-300 rounded p-2 bg-white"
                >
                  <option value="Professional">Professional</option>
                  <option value="Enthusiastic">Enthusiastic</option>
                  <option value="Confident">Confident</option>
                  <option value="Direct">Direct & Concise</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors disabled:opacity-50 mt-2"
              >
                {loading ? 'AI is writing...' : 'Generate Document'}
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Past Documents</h2>
            {documents.length === 0 ? (
              <p className="text-sm text-gray-500">No documents generated yet.</p>
            ) : (
              <ul className="space-y-3">
                {documents.map((doc: any) => (
                  <li 
                    key={doc.id} 
                    onClick={() => setActiveDocument(doc)}
                    className="p-3 border rounded cursor-pointer hover:bg-gray-50 transition"
                  >
                    <div className="font-medium text-sm">{doc.documentType.replace('_', ' ')}</div>
                    <div className="text-xs text-gray-500">{doc.job?.title || 'Unknown Job'} • {doc.tone}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Column: Editor/Preview */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 h-[800px] flex flex-col">
            <div className="bg-gray-50 border-b p-4 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-800">
                {activeDocument ? activeDocument.documentType.replace('_', ' ') : 'Document Preview'}
              </h2>
              {activeDocument && (
                <button 
                  onClick={() => navigator.clipboard.writeText(activeDocument.content)}
                  className="text-sm text-indigo-600 font-medium hover:underline"
                >
                  Copy to Clipboard
                </button>
              )}
            </div>
            
            <div className="p-0 flex-1">
              {activeDocument ? (
                <textarea 
                  className="w-full h-full p-6 resize-none outline-none text-gray-800 font-serif leading-relaxed"
                  defaultValue={activeDocument.content}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Select or generate a document to preview.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
