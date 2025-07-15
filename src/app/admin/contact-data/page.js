'use client'
import { useEffect, useState } from 'react'
import { db } from '../../../lib/firebase'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { loginAdmin, isAdminLoggedIn, logoutAdmin } from '../../../utils/auth'
import AdminHeader from '@/components/AdminHeader'

export default function ContactDataPage() {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)

    const [auth, setAuth] = useState(false)
    const [loginForm, setLoginForm] = useState({ email: '', password: '' })

    useEffect(() => {
        setAuth(isAdminLoggedIn())
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        const valid = loginAdmin(loginForm.email, loginForm.password)
        if (valid) {
            setAuth(true)
        } else {
            alert('Ungültige Anmeldedaten')
        }
    }

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const ref = collection(db, 'contacts')
                const q = query(ref, orderBy('createdAt', 'desc'))
                const snapshot = await getDocs(q)
                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
                setMessages(data)
            } catch (err) {
                console.error('Error fetching contact messages:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [])

    if (!auth) {
        return (
            <section className="min-h-screen bg-black text-white py-20 px-4 flex items-center justify-center">
                <form onSubmit={handleLogin} className="bg-zinc-900 p-6 rounded-lg border border-zinc-700 w-full max-w-sm space-y-4">
                    <h2 className="text-xl font-bold text-red-500">Admin Login</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="E-Mail"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Passwort"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded"
                    />
                    <button type="submit" className="w-full bg-red-600 hover:bg-red-700 py-2 rounded text-white font-semibold cursor-pointer">
                        Login
                    </button>
                </form>
            </section>
        )
    }


    return (
        <section className="min-h-screen bg-black text-white py-12 px-4">
            <AdminHeader />

            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Kontaktformulare</h1>

                {loading ? (
                    <p className="text-gray-400">Lade Nachrichten...</p>
                ) : messages.length === 0 ? (
                    <p className="text-gray-400">Keine Nachrichten gefunden.</p>
                ) : (
                    <div className="space-y-6">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:shadow-md hover:border-red-500 transition"
                            >
                                <div className="mb-2 flex flex-wrap justify-between gap-2">
                                    <span className="text-red-500 font-medium">{msg.name}</span>
                                    <span className="text-sm text-gray-400">{msg.createdAt?.toDate().toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-gray-300 mb-1">
                                    <span className="text-red-400">E-Mail:</span> {msg.email}
                                </p>
                                <p className="text-sm text-gray-300 mb-1">
                                    <span className="text-red-400">Betreff:</span> {msg.subject}
                                </p>
                                <p className="text-sm text-gray-200 whitespace-pre-line mt-2">
                                    {msg.message}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    )
}
