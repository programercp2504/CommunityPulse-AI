import { api } from '../../lib/api';

export default async function Recommendations() {
  const data = await api('/wards/W003/recommendations');

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">AI Recommendations</h1>
      <p className="text-slate-400">Priority actions for Market South.</p>

      <div className="grid md:grid-cols-3 gap-5">
        {data.recommendations.map((r:any, i:number) => (
          <div key={i} className="card hover:scale-105 transition">
            <span className="text-xs bg-cyan-900 text-cyan-200 px-3 py-1 rounded-full">
              Rank #{i + 1} • {r.priority}
            </span>
            <h2 className="text-2xl font-bold mt-5">{r.title}</h2>
            <p className="text-slate-300 mt-3">{r.reason}</p>
            <p className="mt-5 text-sm text-slate-400">{r.department}</p>
            <p className="text-green-400 font-bold mt-3">Projected impact +{r.impact}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold text-cyan-300">What-if Simulator Result</h2>
        <p className="mt-4 text-slate-300">
          Current score: <b>58</b> → Projected score: <b>66</b> | Improvement: <b className="text-green-400">+8</b>
        </p>
        <div className="mt-4 h-4 rounded-full bg-slate-800 overflow-hidden">
          <div className="h-full gradient w-[66%]" />
        </div>
      </div>
    </div>
  );
}