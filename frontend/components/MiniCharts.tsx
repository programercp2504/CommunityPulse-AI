'use client';

import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';

const trendData = [
  { day: 'Mon', score: 70, complaints: 20 },
  { day: 'Tue', score: 68, complaints: 24 },
  { day: 'Wed', score: 72, complaints: 18 },
  { day: 'Thu', score: 65, complaints: 31 },
  { day: 'Fri', score: 58, complaints: 36 },
];

const wardData = [
  { ward: 'Central', score: 70 },
  { ward: 'Riverside', score: 78 },
  { ward: 'Market', score: 58 },
];

export default function MiniCharts() {
  return (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="card">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Health Score Trend</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData}>
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold text-cyan-300 mb-4">Ward Comparison</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={wardData}>
              <XAxis dataKey="ward" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="score" fill="#38bdf8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}