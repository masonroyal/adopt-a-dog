import { API_ENDPOINT } from '@/utils/constants';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  console.log('logging in user');

  const { name, email } = await req.json();

  const res = await fetch(`${API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email }),
  });

  if (!res.ok) {
    return NextResponse.redirect('/login');
  }

  return NextResponse.json("ok it worked, you're logged in", {
    status: 200,
    headers: res.headers,
  });
}
