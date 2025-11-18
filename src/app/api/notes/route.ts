import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const email = url.searchParams.get('email')

    const filePath = path.join(process.cwd(), 'notes.json')
    const data = await fs.promises.readFile(filePath, 'utf-8')
    const users = JSON.parse(data)

    if (!email) {
      return NextResponse.json({ ok: false, message: 'Missing email' }, { status: 400 })
    }

    const user = users.find((u: any) => u.email === email)
    if (!user) {
      return NextResponse.json({ ok: false, message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ ok: true, notes: user.notes })
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}
