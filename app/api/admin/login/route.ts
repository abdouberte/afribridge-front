import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const { password } = await req.json()

    // ✅ process.env sans NEXT_PUBLIC_ = côté serveur uniquement
    if (password !== process.env.ADMIN_PASSWORD) {
        return NextResponse.json(
            { error: 'Mot de passe incorrect.' },
            { status: 401 }
        )
    }

    // Pose un cookie httpOnly — inaccessible au JS du navigateur
    const response = NextResponse.json({ ok: true })
    response.cookies.set('afri_admin_session', '1', {
        httpOnly: true,   // inaccessible via document.cookie
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 8, // 8 heures
        path: '/admin',
    })

    return response
}

export async function DELETE() {
    const response = NextResponse.json({ ok: true })
    response.cookies.delete('afri_admin_session')
    return response
}