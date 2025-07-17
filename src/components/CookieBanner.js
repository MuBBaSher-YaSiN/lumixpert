'use client'
import { useEffect, useState } from 'react'

export default function CookieBanner() {
    const [visible, setVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [consent, setConsent] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    })

    useEffect(() => {
        const stored = localStorage.getItem('cookieConsent')
        if (!stored) setVisible(true)
    }, [])

    const handleAcceptAll = () => {
        const fullConsent = { necessary: true, analytics: true, marketing: true }
        localStorage.setItem('cookieConsent', JSON.stringify(fullConsent))
        setVisible(false)
    }

    const handleRejectAll = () => {
        const minimalConsent = { necessary: true, analytics: false, marketing: false }
        localStorage.setItem('cookieConsent', JSON.stringify(minimalConsent))
        setVisible(false)
    }

    const handleSavePreferences = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(consent))
        setVisible(false)
    }

    if (!visible) return null

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black text-white p-4 border-t border-red-600 shadow-md text-sm">
            {!showSettings ? (
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                    <p>
                        Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Sie können Ihre Einstellungen
                        anpassen.
                    </p>
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={handleRejectAll}
                            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-white"
                        >
                            Alle ablehnen
                        </button>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded text-white"
                        >
                            Anpassen
                        </button>
                        <button
                            onClick={handleAcceptAll}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                        >
                            Alle akzeptieren
                        </button>
                    </div>
                </div>
            ) : (
                <div className="max-w-3xl mx-auto p-4 bg-zinc-900 rounded-xl border border-zinc-700">
                    <h3 className="text-lg font-semibold text-red-500 mb-4">Cookie Einstellungen</h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" checked disabled className="accent-red-600" />
                            <span>Notwendige Cookies (immer aktiv)</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={consent.analytics}
                                onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                                className="accent-red-600"
                            />
                            <span>Analytische Cookies (Google Analytics etc.)</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={consent.marketing}
                                onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                                className="accent-red-600"
                            />
                            <span>Marketing Cookies (Facebook Pixel, Werbung)</span>
                        </label>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={() => setShowSettings(false)}
                            className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded text-white"
                        >
                            Zurück
                        </button>
                        <button
                            onClick={handleSavePreferences}
                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
                        >
                            Einstellungen speichern
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
