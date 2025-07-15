'use client'
import Image from 'next/image'

export default function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center bg-black text-white relative px-4 text-center">
            <div className="mb-6">
                <Image
                    src="/logo.webp"
                    alt="LUMIXPERT Logo"
                    width={100}
                    height={100}
                    className="mx-auto mb-4 drop-shadow-xl"
                />
                <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
                    <span className="text-white">LUMI </span>
                    <span className="text-red-600">XPERT</span>
                </h1>
            </div>

            <p className="text-lg md:text-2xl mb-4">
                Wir <span className="text-red-400 font-semibold">verewigen</span> die Energie Ihrer Marke.
            </p>

            <p className="text-sm md:text-base text-gray-300 max-w-xl mb-6">
                Präzise Lasergravuren, die gewöhnliche Produkte in außergewöhnliche Markenerlebnisse verwandeln.
            </p>

            <button
                onClick={() => {
                    const contactForm = document.getElementById('contactForm')
                    if (contactForm) {
                        contactForm.scrollIntoView({ behavior: 'smooth' })
                    }
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-full shadow-lg transition cursor-pointer">
                Angebot anfordern →
            </button>

            <div className="absolute bottom-8 animate-bounce">
                <span className="text-gray-300 text-sm">Scrollen zum Erkunden</span>
                <div className="w-5 h-5 mt-1 border-b-2 border-r-2 border-gray-300 rotate-45 mx-auto"></div>
            </div>
        </section>
    )
}
