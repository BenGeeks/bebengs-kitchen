import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Always set CORS headers
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,OPTIONS,DELETE,POST,PUT');
  response.headers.set(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    console.log('THIS HAS BEEN TRIGGERED');
    return new Response(null, { status: 204, headers: response.headers });
  }

  if (pathname === '/api/v2/user/login') {
    return response;
  }

  if (pathname.startsWith('/api/v2/')) {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ status: 'Failed', message: 'No authorization header' }), {
        status: 401,
        headers: response.headers,
      });
    }

    const token = authHeader.split(' ')[1];

    try {
      const { payload } = await jwtVerify(token, secret);
      const userPayload = JSON.stringify(payload);

      response.headers.set('x-user-payload', userPayload);
      return response;
    } catch (error) {
      return new Response(JSON.stringify({ status: 'Failed', message: 'Token has expired, please log in again.' }), {
        status: 401,
        headers: response.headers,
      });
    }
  }

  return response;
}
