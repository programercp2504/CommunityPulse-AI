import { api } from '../../lib/api';
import Link from 'next/link';
import MiniCharts from '../../components/MiniCharts';
import CityMap from '../../components/CityMap';

export default async function Dashboard() {
  const data = await api('/wards');

  return (
    <div className="space-y-6">
      <div className="card gradient">
        <p className="text-cyan-100 font-semibold">Live civic intelligence</p>
        <h1 className="text-4xl font-extrabold mt-2">Community Dashboard</h1>
        <p className="text-slate-100 mt-2">
          Track health scores, complaints, traffic pressure and air quality across wards.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {data.wards.map((w:any)=>(
          <Link href={`/health-score?ward=${w.ward_id}`} key={w.ward_id} className="card hover:scale-105 transition">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-bold text-xl">{w.name}</h2>
                <p className="text-sm text-slate-400">Population: {w.population}</p>
              </div>
              <span className="text-4xl font-extrabold text-cyan-300">{w.health_score}</span>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <div>
                <p className="text-slate-400">Air Quality</p>
                <div className="h-2 bg-slate-800 rounded-full">
                  <div className="h-2 bg-cyan-400 rounded-full" style={{width:`${100 - w.latest_metric.air_quality_index}%`}} />
                </div>
              </div>

              <div>
                <p className="text-slate-400">Traffic</p>
                <div className="h-2 bg-slate-800 rounded-full">
                  <div className="h-2 bg-blue-400 rounded-full" style={{width:`${w.latest_metric.traffic_index}%`}} />
                </div>
              </div>

              <p className="text-slate-300">Complaints: {w.latest_metric.complaint_count}</p>
            </div>
          </Link>
        ))}
      </div>

      <MiniCharts />

      <CityMap />
    </div>
  );
}