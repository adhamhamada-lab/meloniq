import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization')

  const validUser = process.env.ADMIN_USER!
  const validPass = process.env.ADMIN_PASS!
  const validAuth = 'Basic ' + btoa(`${validUser}:${validPass}`)

  if (auth !== validAuth) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin"',
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin'],
}