import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
    const store = await cookies()
    const session = store.get('afri_admin_session')

    return NextResponse.json({
        authed: session?.value === '1',
    })
}