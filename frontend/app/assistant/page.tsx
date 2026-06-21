'use client';
import { useState } from 'react';
import { api } from '../../lib/api';
export default function Assistant(){
 const [q,setQ]=useState('Why is Market South health score low and what should we do first?'); const [answer,setAnswer]=useState(''); const [loading,setLoading]=useState(false);
 async function ask(){setLoading(true); const r=await api('/assistant/chat',{method:'POST',body:JSON.stringify({question:q})}); setAnswer(r.answer); setLoading(false)}
 return <div><h1 className="text-3xl font-bold">AI Assistant</h1><p className="text-slate-600 mt-2">Ask natural-language questions about community data.</p><div className="card mt-6"><textarea className="input h-28" value={q} onChange={e=>setQ(e.target.value)} /><button className="btn mt-4" onClick={ask}>{loading?'Thinking...':'Ask Gemini'}</button></div>{answer&&<div className="card mt-6 bg-blue-50"><h2 className="font-bold text-xl">Answer</h2><p className="mt-3 leading-7 whitespace-pre-wrap">{answer}</p></div>}</div>
}
