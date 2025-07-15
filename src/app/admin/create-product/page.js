'use client'
import { useEffect, useState } from 'react'
import { loginAdmin, isAdminLoggedIn, logoutAdmin } from '../../../utils/auth'
import { db } from '../../../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import AdminHeader from '@/components/AdminHeader'

const categories = [
    { key: 'metall', label: 'Metall' },
    { key: 'holz', label: 'Holz' },
    { key: 'leder', label: 'Leder' },
    { key: 'acryl', label: 'Acryl / Glas' }
]

export default function CreateProductPage() {
    const [auth, setAuth] = useState(false)
    const [form, setForm] = useState({ category: '', text: '', imageUrl: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
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

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!form.category || !form.text || !form.imageUrl) return alert('Alle Felder sind erforderlich.')
        setLoading(true)
        try {
            await addDoc(collection(db, 'products'), {
                category: form.category,
                text: form.text,
                image: form.imageUrl,
                createdAt: serverTimestamp()
            })
            setForm({ category: '', text: '', imageUrl: '' })
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error('Fehler:', err)
        } finally {
            setLoading(false)
        }
    }

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
            <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg">
                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold text-red-500">Produkt Erstellen</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded focus:ring-2 focus:ring-red-500"
                        required
                    >
                        <option value="">Kategorie wählen</option>
                        {categories.map((cat) => (
                            <option key={cat.key} value={cat.key}>
                                {cat.label}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="Bild-URL"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded focus:ring-2 focus:ring-red-500"
                        required
                    />

                    <textarea
                        name="text"
                        placeholder="Produktbeschreibung"
                        value={form.text}
                        onChange={handleChange}
                        rows="4"
                        className="w-full p-3 bg-zinc-800 text-white border border-zinc-700 rounded focus:ring-2 focus:ring-red-500"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white font-semibold cursor-pointer"
                    >
                        {loading ? 'Wird gespeichert…' : 'Produkt Hochladen'}
                    </button>

                    {success && (
                        <p className="text-green-500 text-sm mt-2 text-center">Produkt erfolgreich gespeichert.</p>
                    )}
                </form>
            </div>
        </section>
    )
}
