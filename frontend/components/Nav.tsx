import Link from "next/link";

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-cyan-400">
          CommunityPulse AI
        </Link>

        <div className="flex gap-4 text-sm text-slate-300">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/assistant">AI Assistant</Link>
          <Link href="/health-score">Health Score</Link>
          <Link href="/complaints">Complaints</Link>
          <Link href="/recommendations">Recommendations</Link>
        </div>
      </div>
    </nav>
  );
}