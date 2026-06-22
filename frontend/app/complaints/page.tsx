'use client';
import { useState } from 'react';
import { api } from '../../lib/api';

export default function Complaints() {
  const [ward, setWard] = useState('W003');
  const [text, setText] = useState('Garbage has not been collected near the market for five days and smell is spreading.');
  const [result, setResult] = useState<any>(null);

  async function analyze() {
    const r = await api('/complaints/analyze', {
      method: 'POST',
      body: JSON.stringify({ ward_id: ward, description: text })
    });
    setResult(r);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Complaint Analyzer</h1>
      <p className="text-slate-400">Detect category, severity and similar civic issues using AI.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <label className="text-sm text-slate-300">Ward</label>
          <select
            value={ward}
            onChange={e => setWard(e.target.value)}
            className="w-full mt-2 bg-slate-950 border border-slate-700 rounded-xl p-3"
          >
            <option value="W001">Central Plaza</option>
            <option value="W002">Riverside East</option>
            <option value="W003">Market South</option>
          </select>

          <label className="block mt-5 text-sm text-slate-300">Complaint</label>
          <textarea
            className="w-full h-40 mt-2 bg-slate-950 border border-slate-700 rounded-xl p-4"
            value={text}
            onChange={e => setText(e.target.value)}
          />

          <button onClick={analyze} className="mt-5 gradient px-5 py-3 rounded-xl font-bold">
            Analyze Complaint
          </button>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyan-300">AI Analysis Result</h2>
          {result ? (
            <div className="mt-4 space-y-3 text-slate-300">
              <p><b>Category:</b> {result.category}</p>
              <p><b>Severity:</b> {result.severity}</p>
              <p><b>Suggested action:</b> {result.suggested_action}</p>
              <p><b>Similar cases:</b> {result.similar_cases?.length || 0}</p>
            </div>
          ) : (
            <p className="mt-4 text-slate-400">Submit a complaint to see AI analysis.</p>
          )}
        </div>
      </div>
    </div>
  );
}