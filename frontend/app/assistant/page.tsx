'use client';
import { useState } from 'react';
import { api } from '../../lib/api';

export default function Assistant() {
  const [q, setQ] = useState('Why is Market South health score low and what should we do first?');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  async function ask() {
    setLoading(true);
    const r = await api('/assistant/chat', {
      method: 'POST',
      body: JSON.stringify({ question: q })
    });
    setAnswer(r.answer);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold">AI Assistant</h1>
        <p className="text-slate-400 mt-2">Ask natural-language questions about community data.</p>
      </div>

      <div className="card">
        <textarea
          className="w-full h-32 bg-slate-950 border border-slate-700 rounded-xl p-4 text-white"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <button onClick={ask} className="mt-4 gradient px-5 py-3 rounded-xl font-bold">
          {loading ? 'Thinking...' : 'Ask Gemini'}
        </button>
      </div>

      <div className="card border-cyan-700">
        <h2 className="text-2xl font-bold text-cyan-300">AI Answer</h2>
        <p className="mt-4 text-slate-300 leading-7">
          {answer || 'Ask a question to generate a grounded civic insight.'}
        </p>
      </div>
    </div>
  );
}