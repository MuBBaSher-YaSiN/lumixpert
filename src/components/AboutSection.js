'use client'
import { motion } from 'framer-motion'
import { FaBolt, FaLayerGroup, FaHeart } from 'react-icons/fa'

const features = [
    {
        title: 'Schnelle Skalierbarkeit',
        description:
            'Von Prototypen bis zur Massenproduktion. Wir skalieren nach Ihren Anforderungen ohne Qualitätsverlust.',
        icon: <FaBolt size={24} />,
    },
    {
        title: 'Individuelle Lösungen',
        description:
            'Maßgeschneiderte Gravurlösungen für Ihre spezifischen Markenanforderungen und Produktspezifikationen.',
        icon: <FaLayerGroup size={24} />,
    },
    {
        title: 'Emotionales Branding',
        description:
            'Wir schaffen bleibende Eindrücke, indem wir Ihre Marke auf emotionaler Ebene mit Ihren Kunden verbinden.',
        icon: <FaHeart size={24} />,
    },
]

export default function AboutSection() {
    return (
        <section className="bg-black text-white py-36 px-4">
            <div className="max-w-5xl mx-auto text-center mb-12">
                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Über Uns
                </motion.h2>
                <motion.p
                    className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    Wir sind auf Premium-Lasergravuren spezialisiert und verwandeln gewöhnliche Produkte in außergewöhnliche Markenerlebnisse, die Ihr Publikum begeistern.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {features.map((item, i) => (
                    <motion.div
                        key={i}
                        className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-md transition-all duration-300 hover:shadow-xl hover:shadow-red-500/30 hover:scale-[1.03] hover:border-red-500 group"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.15 }}
                        viewport={{ once: true }}
                    >
                        <div className="mb-4 text-red-500 flex items-center justify-center w-12 h-12 rounded-full bg-black border border-red-500 shadow-red-500/20 shadow-md mx-auto group-hover:bg-red-600 group-hover:text-white transition-all">
                            {item.icon}
                        </div>
                        <h3 className="text-lg font-semibold text-center mb-2 group-hover:text-red-400 transition-all duration-200">
                            {item.title}
                        </h3>
                        <p className="text-sm text-gray-400 text-center group-hover:text-gray-300 transition-all duration-200">
                            {item.description}
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
