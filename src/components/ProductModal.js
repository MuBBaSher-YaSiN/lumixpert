'use client'
import { useEffect, useState } from 'react'
import { db } from '../lib/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { IoClose } from 'react-icons/io5'

export default function ProductModal({ category, onClose }) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedProduct, setSelectedProduct] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            const q = query(collection(db, 'products'), where('category', '==', category.key))
            const snap = await getDocs(q)
            const data = snap.docs.map((doc) => doc.data())
            setProducts(data)
            setLoading(false)
        }
        fetchProducts()
    }, [category])

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center px-4">
            {/* Category Modal */}
            <div className="bg-zinc-900 w-full max-w-4xl rounded-xl overflow-hidden border border-zinc-800 relative">
                <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                    <div>
                        <h3 className="text-xl font-semibold">{category.title} Galerie</h3>
                        <p className="text-sm text-gray-400">{products.length} Produkte</p>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
                        <IoClose />
                    </button>
                </div>

                <div className="p-6">
                    {loading ? (
                        <p className="text-gray-400">Lade Produkte...</p>
                    ) : products.length === 0 ? (
                        <div className="text-center text-gray-400 py-12">
                            <div className="text-3xl mb-2">+</div>
                            <p className="font-semibold">Keine Produkte vorhanden</p>
                            <p className="text-sm mt-2">
                                Verwenden Sie das Admin Panel, um Produktbilder für {category.title} hinzuzufügen.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {products.map((p, i) => (
                                <div
                                    key={i}
                                    onClick={() => setSelectedProduct(p)}
                                    className="bg-zinc-800 p-3 rounded-lg cursor-pointer hover:border hover:border-red-500 transition"
                                >
                                    <img
                                        src={p.image}
                                        alt="product"
                                        className="rounded mb-2 w-full h-40 object-cover"
                                    />
                                    <p className="text-sm text-gray-300 line-clamp-3">{p.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Product Detail Modal (Nested) */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center px-4">
                    <div className="bg-zinc-900 max-w-md w-full rounded-xl overflow-hidden border border-zinc-800 relative">
                        <div className="flex justify-between items-center p-4 border-b border-zinc-800">
                            <h3 className="text-lg font-semibold">Produktansicht</h3>
                            <button
                                onClick={() => setSelectedProduct(null)}
                                className="text-gray-400 hover:text-white text-xl"
                            >
                                <IoClose />
                            </button>
                        </div>
                        <div className="p-4">
                            <img
                                src={selectedProduct.image}
                                alt="product-full"
                                className="w-full h-auto rounded mb-4"
                            />
                            <p className="text-sm text-gray-200 whitespace-pre-line">
                                {selectedProduct.text}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
