'use client';

import { useState } from 'react';

export default function SimulatorPage() {
  const [complaints, setComplaints] = useState(20);
  const [traffic, setTraffic] = useState(15);
  const [air, setAir] = useState(10);

  const currentScore = 58;
  const improvement = Math.round(complaints * 0.35 + traffic * 0.3 + air * 0.35);
  const projectedScore = Math.min(100, currentScore + improvement);

  return (
    <div className="space-y-6">
      <div className="card gradient">
        <h1 className="text-4xl font-bold">AI What-If Simulator</h1>
        <p className="mt-2">Predict policy impact before implementation.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="card">
          <h3 className="font-bold mb-3">Reduce Complaints</h3>
          <input type="range" min="0" max="40" value={complaints} onChange={(e) => setComplaints(Number(e.target.value))} className="w-full" />
          <p>{complaints}%</p>
        </div>

        <div className="card">
          <h3 className="font-bold mb-3">Reduce Traffic</h3>
          <input type="range" min="0" max="40" value={traffic} onChange={(e) => setTraffic(Number(e.target.value))} className="w-full" />
          <p>{traffic}%</p>
        </div>

        <div className="card">
          <h3 className="font-bold mb-3">Improve Air Quality</h3>
          <input type="range" min="0" max="40" value={air} onChange={(e) => setAir(Number(e.target.value))} className="w-full" />
          <p>{air}%</p>
        </div>
      </div>

      <div className="card border border-cyan-700">
        <h2 className="text-2xl font-bold text-cyan-300">Simulation Result</h2>
        <p className="mt-4">Current Score: <b>{currentScore}</b></p>
        <p>Projected Score: <b className="text-green-400">{projectedScore}</b></p>
        <p>Improvement: <b className="text-green-400">+{improvement}</b></p>
      </div>
    </div>
  );
}