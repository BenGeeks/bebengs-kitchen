import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function middleware(req) {
  if (req.method === 'OPTIONS') {
    const res = new NextResponse();
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.headers.set('Access-Control-Allow-Credentials', 'true');
    return res;
  }

  if (req.nextUrl.pathname === '/api/v2/user/login') {
    return NextResponse.next();
  }

  if (req.nextUrl.pathname.startsWith('/api/v2/')) {
    const token = req.headers.get('authorization')?.split(' ')[1];

    try {
      const { payload } = await jwtVerify(token, secret);
      const userPayload = JSON.stringify(payload);

      const response = NextResponse.next();
      response.headers.set('x-user-payload', userPayload);
      return response;
    } catch (error) {
      return NextResponse.json({ status: 'false', message: 'Token has expired, please log in again.' }, { status: 401 });
    }
  }
}
