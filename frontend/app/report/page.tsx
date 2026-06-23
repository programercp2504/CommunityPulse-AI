const API =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:8080/api/v1';

async function getReport() {
  const res = await fetch(`${API}/assistant/report`, {
    cache: 'no-store'
  });

  return res.json();
}

export default async function ReportPage() {
  const report = await getReport();

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-bold">
        Executive AI Report
      </h1>

<button
  onClick={() => window.print()}
  className="card"
>
  Download Report PDF
</button>

      <div className="card">
        <h2 className="text-2xl font-bold">
          {report.title}
        </h2>

        <p className="mt-4">
          {report.summary}
        </p>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold">
          Top Issues
        </h2>

        <ul className="mt-3 space-y-2">
          {report.top_issues.map((item:string, i:number)=>(
            <li key={i}>- {item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold">
          Recommended Actions
        </h2>

        <ul className="mt-3 space-y-2">
          {report.recommended_actions.map((item:string, i:number)=>(
            <li key={i}>- {item}</li>
          ))}
        </ul>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold">
          Expected Impact
        </h2>

        <p className="mt-3">
          {report.expected_impact}
        </p>
      </div>
    </div>
  );
}