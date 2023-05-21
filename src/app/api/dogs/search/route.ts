import { API_ENDPOINT } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const DATA_URL = `${API_ENDPOINT}/dogs/search`;

export async function GET(req: NextRequest) {
  console.log('getting breeds');

  const res = await fetch(DATA_URL, {
    headers: {
      Cookie: cookies()
        .getAll()
        .map(({ name, value }) => `${name}=${value}`)
        .join('; '),
    },
  });

  if (!res.ok) {
    console.error(`Error fetching data: ${res.statusText}`);
    return NextResponse.json(`Error: ${res.statusText}`, {
      status: res.status,
    });
  }

  const data = await res.json();

  console.log({ data });

  return NextResponse.json(data);
}
