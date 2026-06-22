const BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://communitypulse-backend-51588990250.asia-south1.run.app/api/v1';

export async function api(path: string, options?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {})
    }
  });

  if (!res.ok) throw new Error(`API error ${res.status}`);

  return res.json();
}