type QueryValue = string | number | boolean | null | undefined;

export const getJson = async <T>(
  path: string,
  params?: Record<string, QueryValue>,
): Promise<T> => {
  const query = params
    ? Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
      .join("&")
    : "";
  const url = query ? `${path}${path.includes("?") ? "&" : "?"}${query}` : path;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  return await response.json() as T;
};

export const withFallback = async <T>(
  request: () => Promise<T>,
  fallback: T,
  resourceName: string,
): Promise<T> => {
  try {
    return await request();
  } catch (error) {
    console.error(`Failed to fetch ${resourceName}:`, error);
    return fallback;
  }
};
