"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type GeneratedNote = {
  subtopic: string
  subtopicid: string
  note: string
}

type NoteSubject = {
  subject: string
  subjectid: string
  topic: string
  generated_notes: GeneratedNote[]
}

export default function DashboardPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string | null>(null)
  const [notes, setNotes] = useState<NoteSubject[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const em = localStorage.getItem('email')
    if (!em) {
      router.push('/login')
      return
    }
    setEmail(em)

    fetch(`/api/notes?email=${encodeURIComponent(em)}`)
      .then((r) => r.json())
      .then((data) => {
        if (!data?.ok) {
          setError(data?.message || 'Failed to load notes')
        } else {
          setNotes(data.notes)
        }
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [router])

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>
  if (error) return <div style={{ padding: 24, color: 'red' }}>{error}</div>

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Dashboard</h1>
        <div>
          <strong>{email}</strong>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('email')
              router.push('/login')
            }}
            style={{ marginLeft: 12 }}
          >
            Sign out
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16, marginTop: 18 }}>
        {notes && notes.length ? (
          notes.map((s) => (
            <div key={s.subjectid} style={{ border: '1px solid #eaeaea', padding: 12, borderRadius: 8 }}>
              <h3 style={{ margin: '0 0 6px' }}>{s.subject}</h3>
              <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{s.topic}</div>
              <div style={{ fontSize: 13 }}>
                <strong>Subtopics:</strong>
                <ul>
                  {s.generated_notes.map((g) => (
                    <li key={g.subtopicid} style={{ marginTop: 6 }}>
                      <strong>{g.subtopic}:</strong> {g.note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <div>No subjects found for this account.</div>
        )}
      </div>
    </div>
  )
}
