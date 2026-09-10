export const getJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path, {
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
