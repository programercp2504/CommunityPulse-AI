export default function CityMap() {
  const wards = [
    { name: 'Central Plaza', score: 70, top: '18%', left: '18%' },
    { name: 'Riverside East', score: 78, top: '32%', left: '58%' },
    { name: 'Market South', score: 58, top: '62%', left: '38%' },
  ];

  return (
    <div className="card">
      <h2 className="text-xl font-bold text-cyan-300 mb-4">Live Ward Map</h2>

      <div className="relative h-80 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,#22d3ee_1px,transparent_1px)] [background-size:24px_24px]" />

        {wards.map((w) => (
          <div
            key={w.name}
            className="absolute"
            style={{ top: w.top, left: w.left }}
          >
            <div className="relative">
              <div className="absolute -inset-3 rounded-full bg-cyan-400 opacity-30 animate-ping" />
              <div className="relative rounded-xl bg-slate-900 border border-cyan-500 px-4 py-2 shadow-lg">
                <p className="font-bold text-white">{w.name}</p>
                <p className="text-cyan-300">Score {w.score}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}