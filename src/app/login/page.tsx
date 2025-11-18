"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setError(null)
		setLoading(true)

		try {
			const res = await fetch('/api/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email, password }),
			})

			const data = await res.json()
			if (!res.ok) {
				setError(data?.message || 'Login failed')
				setLoading(false)
				return
			}

			// store token and email in localStorage (pseudo-session)
			localStorage.setItem('token', data.token)
			localStorage.setItem('email', data.email)

			setLoading(false)
			router.push('/dashboard')
		} catch (err) {
			setError('Network error')
			setLoading(false)
		}
	}

	return (
		<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '70vh' }}>
			<form onSubmit={handleSubmit} style={{ width: 360, padding: 24, border: '1px solid #eaeaea', borderRadius: 8 }}>
				<h2 style={{ margin: '0 0 12px 0' }}>Login</h2>

				<label style={{ display: 'block', marginBottom: 6 }}>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						style={{ width: '100%', padding: '8px 10px', marginTop: 6 }}
					/>
				</label>

				<label style={{ display: 'block', margin: '10px 0 6px' }}>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						style={{ width: '100%', padding: '8px 10px', marginTop: 6 }}
					/>
				</label>

				{error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}

				<button
					type="submit"
					disabled={loading}
					style={{ marginTop: 12, width: '100%', padding: '10px 12px' }}
				>
					{loading ? 'Signing in...' : 'Sign in'}
				</button>

				<div style={{ marginTop: 10, fontSize: 13, color: '#555' }}>
					For demo: use one of the emails from `notes.json` and password <strong>password123</strong>.
				</div>
			</form>
		</div>
	)
}

