import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body || {}

    const filePath = path.join(process.cwd(), 'notes.json')
    const data = await fs.promises.readFile(filePath, 'utf-8')
    const users = JSON.parse(data)

    const user = users.find((u: any) => u.email === email && u.password === password)
    if (!user) {
      return NextResponse.json({ ok: false, message: 'Invalid credentials' }, { status: 401 })
    }

    const token = Buffer.from(email).toString('base64')
    return NextResponse.json({ ok: true, email, token })
  } catch (err) {
    return NextResponse.json({ ok: false, message: 'Server error' }, { status: 500 })
  }
}
