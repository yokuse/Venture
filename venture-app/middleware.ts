import csrf from 'edge-csrf';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { userAgent } from 'next/server';
import { Next } from 'react-bootstrap/esm/PageItem';
import { NextApiRequest } from 'next';

// initalize protection function
const csrfProtect = csrf();

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // User Agent Protection
  const url = request.nextUrl;
  const { isBot } = userAgent(request);
  if (isBot){
    return new NextResponse(null, { status: 500 })
  }


  // CSRF protection
  if (request.nextUrl.pathname.startsWith('/account/login')){
    const csrfError = await csrfProtect(request, response);

    // check result
    if (csrfError) {
      const url = request.nextUrl.clone();
      url.pathname = '/api/csrf_invalid';
      return NextResponse.rewrite(url);
    }
    return response;
  } 

}

export const config = {
  matcher: '/:path*',
}