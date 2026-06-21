import Link from "next/link";

export default function Nav() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl text-blue-700">
          CommunityPulse AI
        </Link>

        <div className="flex gap-4 text-sm">
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
