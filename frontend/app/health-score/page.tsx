import { api } from '../../lib/api';

export default async function HealthScorePage({
  searchParams,
}: {
  searchParams: Promise<{ ward?: string }>;
}) {
  const params = await searchParams;
  const ward = params?.ward || 'W001';
  const data = await api(`/wards/${ward}/health-score`);

  const score = data.score || 70;
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">Community Health Score</h1>
      <p className="text-slate-400">Explainable score based on air, traffic, complaints and weather.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card flex flex-col items-center justify-center">
          <svg width="190" height="190">
            <circle cx="95" cy="95" r={radius} stroke="#334155" strokeWidth="18" fill="none" />
            <circle
              cx="95"
              cy="95"
              r={radius}
              stroke="#22d3ee"
              strokeWidth="18"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
              transform="rotate(-90 95 95)"
            />
            <text x="95" y="105" textAnchor="middle" className="fill-white text-5xl font-bold">
              {score}
            </text>
          </svg>
          <p className="text-cyan-300 font-bold mt-4">Ward: {ward}</p>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold text-cyan-300">Gemini Explanation</h2>
          <p className="mt-4 text-slate-300 leading-7">{data.explanation}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        {Object.entries(data.breakdown || {}).map(([key, value]) => (
          <div className="card" key={key}>
            <p className="text-sm text-slate-400">{key}</p>
            <p className="text-3xl font-bold text-cyan-300">{String(value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}