import Link from "next/link";

export default function Home() {
  return (

    <div className="space-y-10">
      <section className="card gradient p-10">

  <div className="mb-4 inline-block px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-semibold">
    Google Cloud APAC Hackathon 2026 Submission
  </div>

  <p className="text-cyan-200 font-semibold">
    Google Cloud + Gemini Powered
  </p>

        <h1 className="text-5xl font-extrabold mt-4">
          CommunityPulse AI
        </h1>

        <p className="text-lg mt-5 max-w-3xl">
          An AI-powered Decision Intelligence Platform that helps
          communities and city stakeholders analyze data,
          predict outcomes and improve quality of life.
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <Link href="/dashboard" className="card">
            Dashboard
          </Link>

          <Link href="/assistant" className="card">
            AI Assistant
          </Link>

          <Link href="/report" className="card">
            Executive Report
          </Link>

          <Link href="/simulator" className="card">
            What-if Simulator
          </Link>
        </div>
      </section>

      <div className="grid md:grid-cols-4 gap-5">
  <div className="card">
    <p className="text-slate-400">Community Health Score</p>
    <h2 className="text-4xl font-extrabold text-cyan-300">68</h2>
  </div>

  <div className="card">
    <p className="text-slate-400">Active Complaints</p>
    <h2 className="text-4xl font-extrabold text-red-300">68</h2>
  </div>

  <div className="card">
    <p className="text-slate-400">Highest Risk Ward</p>
    <h2 className="text-2xl font-extrabold text-yellow-300">
      Market South
    </h2>
  </div>

  <div className="card">
    <p className="text-slate-400">Predicted Improvement</p>
    <h2 className="text-4xl font-extrabold text-green-300">
      +16
    </h2>
  </div>
</div>
    </div>
  );
}