export default async function fetcher(url: string) {
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });
  if (!res.ok) {
    throw new Error('Error while fetching data');
  }
  return res.json();
}
