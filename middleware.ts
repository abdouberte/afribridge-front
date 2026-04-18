import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
    const session = req.cookies.get('afri_admin_session')

    // Si pas de session et qu'on essaie d'accéder à /admin
    if (req.nextUrl.pathname.startsWith('/admin') && session?.value !== '1') {
        return NextResponse.redirect(new URL('/admin/login', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}