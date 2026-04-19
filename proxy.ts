import { NextRequest, NextResponse } from 'next/server'

export function proxy(req: NextRequest) {
    const session = req.cookies.get('afri_admin_session')
    const isLogin = req.nextUrl.pathname === '/admin/login'
    const isAuthed = session?.value === '1'

    if (isLogin && isAuthed) {
        return NextResponse.redirect(new URL('/admin', req.url))
    }

    if (!isLogin && !isAuthed) {
        return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}