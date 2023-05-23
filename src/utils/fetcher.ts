class FetchError extends Error {
  info: any;
  status: number | undefined;

  constructor(message: string, status?: number) {
    super(message);
    this.status = status;
  }
}

export default async function fetcher(url: string, options: object) {
  const res = await fetch(url, options);

  if (!res.ok) {
    const error = new FetchError(
      `Error while fetching data. ${res.statusText}`,
      res.status
    );

    throw error;
  }
  return res.json();
}
