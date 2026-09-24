import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // راوت الفحص العام ده بيستخدمه العميل نفسه وقت الطلب — لازم يفضل من غير باسورد
  if (pathname === '/api/discount/validate') {
    return NextResponse.next()
  }

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
  matcher: ['/admin', '/api/admin/:path*', '/api/discount', '/api/discount/:path*'],
}