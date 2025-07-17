'use client'
import { useState, useEffect } from 'react'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs } from 'firebase/firestore'
import ProductModal from './ProductModal'

const categories = [
    {
        key: 'metall',
        title: 'Metall',
        desc: 'Hochwertige Gravuren auf Edelstahl, Aluminium und weiteren Metallen.',
        image: '/metall.webp',
    },
    {
        key: 'holz',
        title: 'Holz',
        desc: 'Präzise Gravuren auf nachhaltigem Holz für besondere Produkte.',
        image: '/holz.webp',
    },
    {
        key: 'leder',
        title: 'Leder',
        desc: 'Stilvolle Gravuren auf Leder für exklusive Accessoires.',
        image: '/leder.webp',
    },
    {
        key: 'acryl',
        title: 'Acryl / Glas',
        desc: 'Klare Gravuren für moderne und elegante Designs.',
        image: '/glas.webp',
    },
]

export default function ProductsSection() {
    const [modalCategory, setModalCategory] = useState(null)
    const [productCounts, setProductCounts] = useState({})

    useEffect(() => {
        const fetchCounts = async () => {
            let counts = {}
            for (const cat of categories) {
                const q = query(collection(db, 'products'), where('category', '==', cat.key))
                const snap = await getDocs(q)
                counts[cat.key] = snap.size
            }
            setProductCounts(counts)
        }
        fetchCounts()
    }, [])

    return (
        <section className="bg-black text-white py-24 px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">Unsere Galerie</h2>
                <p className="text-gray-400">Entdecken Sie unsere hochwertigen Gravurmaterialien für außergewöhnliche Ergebnisse.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {categories.map((cat) => (
                    <div
                        key={cat.key}
                        onClick={() => setModalCategory(cat)}
                        className="relative bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-500 hover:shadow-red-600/20 hover:shadow-lg cursor-pointer transition-all"
                    >
                        <img
                            src={cat.image}
                            alt={cat.title}
                            className="w-full h-94 object-cover"
                            loading="lazy"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{cat.title}</h3>
                            <p className="text-sm text-gray-400">{cat.desc}</p>

                            <button
                                onClick={() => setModalCategory(cat)}
                                className="mt-2 inline-block bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-full transition cursor-pointer"
                            >
                                Mehr erfahren →
                            </button>

                        </div>
                        <div className="absolute top-3 right-3 text-xs bg-white text-black px-3 py-1 rounded-full shadow">
                            {productCounts[cat.key] ?? 0} Produkte
                        </div>
                    </div>
                ))}
            </div>

            {modalCategory && (
                <ProductModal category={modalCategory} onClose={() => setModalCategory(null)} />
            )}
        </section>
    )
}
