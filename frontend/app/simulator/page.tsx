'use client';

import { useState } from 'react';

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:8080/api/v1';

export default function SimulatorPage() {
  const [complaints, setComplaints] = useState(20);
  const [traffic, setTraffic] = useState(15);
  const [air, setAir] = useState(10);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function runSimulation() {
    setLoading(true);

    try {
      const res = await fetch(`${API}/assistant/what-if`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ward_id: 'W003',
          reduce_complaints: complaints,
          reduce_traffic: traffic,
          improve_air_quality: air
        })
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="card gradient">
        <h1 className="text-4xl font-bold">
          AI What-If Simulator
        </h1>

        <p className="mt-2 text-slate-200">
          Predict policy impact before implementation.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <div className="card">
          <h3 className="font-bold mb-3">
            Reduce Complaints
          </h3>

          <input
            type="range"
            min="0"
            max="40"
            value={complaints}
            onChange={(e) =>
              setComplaints(Number(e.target.value))
            }
            className="w-full"
          />

          <p>{complaints}%</p>
        </div>

        <div className="card">
          <h3 className="font-bold mb-3">
            Reduce Traffic
          </h3>

          <input
            type="range"
            min="0"
            max="40"
            value={traffic}
            onChange={(e) =>
              setTraffic(Number(e.target.value))
            }
            className="w-full"
          />

          <p>{traffic}%</p>
        </div>

        <div className="card">
          <h3 className="font-bold mb-3">
            Improve Air Quality
          </h3>

          <input
            type="range"
            min="0"
            max="40"
            value={air}
            onChange={(e) =>
              setAir(Number(e.target.value))
            }
            className="w-full"
          />

          <p>{air}%</p>
        </div>
      </div>

      <button
        onClick={runSimulation}
        className="px-6 py-3 rounded-xl bg-cyan-500 font-bold"
      >
        {loading ? 'Running...' : 'Run Simulation'}
      </button>

      {result && (
        <div className="card border border-cyan-700">
          <h2 className="text-2xl font-bold text-cyan-300">
            {result.ward}
          </h2>

          <div className="mt-4 space-y-2">
            <p>
              Current Score:
              <b> {result.current_score}</b>
            </p>

            <p>
              Projected Score:
              <b className="text-green-400">
                {' '}
                {result.projected_score}
              </b>
            </p>

            <p>
              Improvement:
              <b className="text-green-400">
                {' '}
                +{result.improvement}
              </b>
            </p>
          </div>

          <p className="mt-4 text-slate-300">
            {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}