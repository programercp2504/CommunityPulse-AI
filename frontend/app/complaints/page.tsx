'use client';
import { useState } from 'react';
import { api } from '../../lib/api';
export default function Complaints(){
 const [description,setDescription]=useState('Garbage has not been collected near the market for five days and smell is spreading.');
 const [ward,setWard]=useState('W003'); const [result,setResult]=useState<any>(null); const [loading,setLoading]=useState(false);
 async function analyze(){setLoading(true); setResult(await api('/complaints/analyze',{method:'POST',body:JSON.stringify({ward_id:ward,description})})); setLoading(false)}
 return <div><h1 className="text-3xl font-bold">Complaint Analyzer</h1><div className="grid md:grid-cols-2 gap-6 mt-6"><div className="card"><label className="font-semibold">Ward</label><select className="input mt-2" value={ward} onChange={e=>setWard(e.target.value)}><option>W001</option><option>W002</option><option>W003</option></select><label className="font-semibold mt-4 block">Complaint</label><textarea className="input mt-2 h-36" value={description} onChange={e=>setDescription(e.target.value)} /><button onClick={analyze} className="btn mt-4">{loading?'Analyzing...':'Analyze Complaint'}</button></div>{result&&<div className="card"><h2 className="text-xl font-bold">AI Analysis</h2><p className="mt-3"><b>Category:</b> {result.analysis.category}</p><p><b>Severity:</b> {result.analysis.severity}</p><p className="mt-3 text-slate-700">{result.analysis.analysis}</p><h3 className="font-bold mt-5">Similar Past Complaints</h3>{result.similar_complaints.map((c:any)=><div className="mt-3 p-3 bg-slate-50 rounded-xl" key={c.complaint_id}><p>{c.description}</p><p className="text-sm text-blue-700">Similarity {c.similarity}%</p></div>)}</div>}</div></div>
}
