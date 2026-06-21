import { api } from '../../lib/api';
import Link from 'next/link';
export default async function Dashboard(){
 const data=await api('/wards');
 return <div><h1 className="text-3xl font-bold">Community Dashboard</h1><p className="text-slate-600 mt-2">Latest ward-level metrics from mock community data.</p><div className="grid md:grid-cols-3 gap-5 mt-6">{data.wards.map((w:any)=><Link href={`/health-score?ward=${w.ward_id}`} key={w.ward_id} className="card hover:shadow-md"><div className="flex justify-between"><h2 className="font-bold text-xl">{w.name}</h2><span className="text-3xl font-extrabold text-blue-600">{w.health_score}</span></div><p className="text-sm text-slate-500">Population: {w.population}</p><div className="mt-4 space-y-2 text-sm"><p>AQI: {w.latest_metric.air_quality_index}</p><p>Traffic Index: {w.latest_metric.traffic_index}</p><p>Complaints: {w.latest_metric.complaint_count}</p></div></Link>)}</div></div>
}
