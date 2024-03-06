export const fetcher = <T>(
  ...args: [input: RequestInfo, init?: RequestInit]
): Promise<T> => fetch(...args).then((res) => res.json())
