'use client'
import { useState, useEffect } from 'react'
import { db } from '../../../lib/firebase'
import {
    collection,
    getDocs,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
} from 'firebase/firestore'
import { motion } from 'framer-motion'
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa'
import { loginAdmin, isAdminLoggedIn, logoutAdmin } from '../../../utils/auth'
import AdminHeader from '@/components/AdminHeader'


export default function ManageProductsPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState({ text: '', image: '' })

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
        const fetchProducts = async () => {
            setLoading(true)
            const ref = collection(db, 'products')
            const q = query(ref, orderBy('createdAt', 'desc'))
            const snap = await getDocs(q)
            setProducts(snap.docs.map(d => ({ id: d.id, ...d.data() })))
            setLoading(false)
        }
        fetchProducts()
    }, [])

    const handleDelete = async (id) => {
        if (!confirm('Produkt wirklich löschen?')) return
        await deleteDoc(doc(db, 'products', id))
        setProducts(products.filter(p => p.id !== id))
    }

    const startEdit = (p) => {
        setEditId(p.id)
        setForm({ text: p.text, image: p.image })
    }

    const cancelEdit = () => {
        setEditId(null)
        setForm({ text: '', image: '' })
    }

    const saveEdit = async (id) => {
        const refDoc = doc(db, 'products', id)
        await updateDoc(refDoc, { text: form.text, image: form.image })
        setProducts(products.map(p => p.id === id ? { ...p, text: form.text, image: form.image } : p))
        cancelEdit()
    }

    if (loading) {
        return <p className="text-gray-400 p-6">Lädt Produkte…</p>
    }

    if (products.length === 0) {
        return <p className="text-gray-400 p-6">Keine Produkte vorhanden.</p>
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

            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6 text-red-500">Produkte verwalten</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map(p => (
                        <motion.div
                            key={p.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-md hover:shadow-red-500/20 transition"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            {editId === p.id ? (
                                <div className="p-4 space-y-3">
                                    <input
                                        type="text"
                                        value={form.image}
                                        onChange={e => setForm({ ...form, image: e.target.value })}
                                        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                                        placeholder="Bild-URL"
                                    />
                                    <textarea
                                        rows="3"
                                        value={form.text}
                                        onChange={e => setForm({ ...form, text: e.target.value })}
                                        className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-sm"
                                    />
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => saveEdit(p.id)}
                                            className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm cursor-pointer"
                                        >
                                            <FaSave /> Speichern
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            className="flex items-center gap-1 bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded text-sm cursor-pointer"
                                        >
                                            <FaTimes /> Abbrechen
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <img
                                        src={p.image}
                                        alt="Produkt"
                                        className="w-full h-40 object-cover"
                                    />
                                    <div className="p-4">
                                        <p className="text-sm text-gray-300 whitespace-pre-line">{p.text}</p>
                                        <div className="mt-4 flex justify-between">
                                            <button
                                                onClick={() => startEdit(p)}
                                                className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(p.id)}
                                                className="text-gray-400 hover:text-red-500 transition cursor-pointer"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
