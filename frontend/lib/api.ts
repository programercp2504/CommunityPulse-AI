const BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  'http://127.0.0.1:8080/api/v1';

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