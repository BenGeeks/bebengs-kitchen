import { NextResponse } from 'next/server';

export function middleware(req, res) {
  const { headers, nextUrl } = req;
  const { origin, pathname } = nextUrl;
  const protectedApi = ['/api/v1/address', '/api/v1/customer', '/api/v1/menu', '/api/v1/orders'];
  const token = headers['authorization'] && headers['authorization'].split(' ')[1];
  if (protectedApi.includes(pathname)) {
    try {
      req.apiUser = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.apiUser.token = token;
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(`${origin}/login`);
    }
  } else {
    return NextResponse.next();
  }
}
