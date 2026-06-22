import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-10">
      <section className="card gradient min-h-[420px] flex flex-col justify-center">
        <p className="text-cyan-100 font-semibold">AI-powered civic decision intelligence</p>
        <h1 className="text-5xl font-extrabold mt-4">
          Smarter communities through real-time data and Gemini AI
        </h1>
        <p className="text-lg mt-5 max-w-3xl text-slate-100">
          CommunityPulse AI analyzes ward health, citizen complaints, traffic, air quality and recommends actions for better city decisions.
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/dashboard" className="bg-white text-blue-700 px-5 py-3 rounded-xl font-bold">
            Open Dashboard
          </Link>
          <Link href="/assistant" className="bg-slate-900 text-white px-5 py-3 rounded-xl font-bold">
            Ask AI Assistant
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-5">
        <div className="card">
          <h2 className="text-xl font-bold text-cyan-300">Community Score</h2>
          <p className="text-slate-300 mt-2">0–100 explainable health score for every ward.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold text-cyan-300">Complaint Analyzer</h2>
          <p className="text-slate-300 mt-2">AI categorizes complaints and detects priority issues.</p>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold text-cyan-300">Recommendations</h2>
          <p className="text-slate-300 mt-2">Action plans with projected score improvement.</p>
        </div>
      </section>
    </div>
  );
}