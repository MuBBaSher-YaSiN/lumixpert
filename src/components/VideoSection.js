// 'use client'
// import { motion } from 'framer-motion'

// export default function VideoSection() {
//     return (
//         <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-56 px-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="max-w-2xl mx-auto text-center"
//             >
//                 <div className="flex items-center justify-center mb-6">
//                     <div className="w-20 h-20 rounded-full border-2 border-red-400 flex items-center justify-center bg-black hover:scale-105 transition-all duration-300">
//                         <svg
//                             className="w-6 h-6 text-red-400"
//                             fill="currentColor"
//                             viewBox="0 0 24 24"
//                         >
//                             <path d="M8 5v14l11-7z" />
//                         </svg>
//                     </div>
//                 </div>

//                 <h2 className="text-xl sm:text-2xl font-semibold mb-2">Video Kommt Bald</h2>
//                 <p className="text-gray-400 text-sm sm:text-base">
//                     Our premium laser engraving process showcased in stunning detail
//                 </p>
//             </motion.div>
//         </section>
//     )
// }

'use client'
import { motion } from 'framer-motion'

export default function VideoSection() {
    return (
        <section className="bg-gradient-to-br from-zinc-900 to-black text-white py-56 px-4 relative overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center mb-12"
            >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500">
                    Sehen Sie, wie Markenenergie sichtbar wird
                </h2>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-2xl mx-auto text-center"
            >
                <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 rounded-full border-2 border-red-400 flex items-center justify-center bg-black hover:scale-105 transition-all duration-300">
                        <svg
                            className="w-6 h-6 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold mb-2">Video Kommt Bald</h3>
                <p className="text-gray-400 text-sm sm:text-base">
                    Our premium laser engraving process showcased in stunning detail
                </p>
            </motion.div>
        </section>
    )
}
