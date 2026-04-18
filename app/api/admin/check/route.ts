import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const session = cookies().get('afri_admin_session')
    return NextResponse.json({ authed: session?.value === '1' })
}