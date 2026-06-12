const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function http(path, options = {}) {
  const hasBody = options.body && options.method !== 'GET';

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: hasBody ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    const message = await res.text();
    throw new Error(message);
  }

  return res.json();
}

