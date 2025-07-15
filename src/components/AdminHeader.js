'use client'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { logoutAdmin } from '../utils/auth'
import { useEffect, useState } from 'react'

const links = [
    { href: '/admin/create-product', label: 'Produkt Erstellen' },
    { href: '/admin/products', label: 'Produkte Verwalten' },
    { href: '/admin/contact-data', label: 'Kontaktanfragen' },
]

export default function AdminHeader() {
    const pathname = usePathname()
    const router = useRouter()
    const [activePath, setActivePath] = useState('')

    useEffect(() => {
        setActivePath(pathname)
    }, [pathname])

    const handleLogout = () => {
        logoutAdmin()
        router.push('/admin/create-product') // or to login route
    }

    return (
        <header className="bg-zinc-900 border-b border-zinc-800 text-white px-4 py-4 mb-8 shadow-sm">
            <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-6">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-sm font-medium hover:text-red-500 transition ${activePath === link.href ? 'text-red-500' : 'text-white'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <button
                    onClick={handleLogout}
                    className="text-sm text-red-400 hover:underline transition cursor-pointer"
                >
                    Logout
                </button>
            </div>
        </header>
    )
}
