// 'use client'
// import { useState } from 'react'
// import { db } from '../lib/firebase'
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
// import { motion } from 'framer-motion'
// import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'

// export default function ContactSection() {
//     const [form, setForm] = useState({ name: '', email: '', betreff: '', message: '' })
//     const [loading, setLoading] = useState(false)
//     const [success, setSuccess] = useState(false)

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value })
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         setLoading(true)

//         try {
//             await addDoc(collection(db, 'contacts'), {
//                 ...form,
//                 createdAt: serverTimestamp(),
//             })
//             setForm({ name: '', email: '', betreff: '', message: '' })
//             setSuccess(true)
//             setTimeout(() => setSuccess(false), 3000)
//         } catch (err) {
//             console.error('Error saving contact:', err)
//         } finally {
//             setLoading(false)
//         }
//     }

//     return (
//         <section id='contactForm' className="bg-black text-white py-24 px-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 30 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//                 viewport={{ once: true }}
//                 className="text-center mb-12"
//             >
//                 <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">Kontakt Aufnehmen</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">
//                     Bereit, Ihre Marke mit Premium-Lasergravuren auf ein neues Level zu bringen?
//                     Kontaktieren Sie uns für eine Beratung.
//                 </p>
//             </motion.div>

//             <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
//                 {/* Form Side */}
//                 <motion.div
//                     initial={{ opacity: 0, x: -30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                     className="bg-zinc-900 rounded-xl p-6 hover:shadow-red-600/30 hover:shadow-lg transition-all"
//                 >
//                     <h3 className="text-xl font-semibold mb-4 text-red-500">Nachricht Senden</h3>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         {['name', 'email', 'betreff'].map((field) => (
//                             <input
//                                 key={field}
//                                 type={field === 'email' ? 'email' : 'text'}
//                                 name={field}
//                                 placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
//                                 value={form[field]}
//                                 onChange={handleChange}
//                                 className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                                 required
//                             />
//                         ))}
//                         <textarea
//                             name="message"
//                             placeholder="Nachricht"
//                             rows="5"
//                             value={form.message}
//                             onChange={handleChange}
//                             className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
//                             required
//                         />
//                         <button
//                             type="submit"
//                             disabled={loading}
//                             className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
//                         >
//                             {loading ? 'Wird gesendet...' : 'Nachricht Senden'}
//                             <FaPaperPlane />
//                         </button>
//                         {success && (
//                             <p className="text-green-500 text-sm mt-2 text-center">
//                                 Nachricht erfolgreich gesendet.
//                             </p>
//                         )}
//                     </form>
//                 </motion.div>

//                 {/* Info Side */}
//                 <motion.div
//                     initial={{ opacity: 0, x: 30 }}
//                     whileInView={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.6 }}
//                     viewport={{ once: true }}
//                     className="flex flex-col justify-center space-y-8"
//                 >
//                     <div className="space-y-4 text-sm">
//                         <h3 className="text-lg font-semibold text-red-500">Kontaktinformationen</h3>

//                         {[
//                             {
//                                 icon: <FaEnvelope className="text-xl" />,
//                                 label: 'E-Mail',
//                                 value: 'lumixpert.de@gmail.com',
//                             },
//                             {
//                                 icon: <FaPhone className="text-xl" />,
//                                 label: 'Telefon',
//                                 value: '+49 178 1638184',
//                             },
//                             {
//                                 icon: <FaMapMarkerAlt className="text-xl" />,
//                                 label: 'Adresse',
//                                 value: 'Schwalbenweg 19\n34212 Melsungen',
//                             },
//                         ].map((item, i) => (
//                             <div
//                                 key={i}
//                                 className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-red-500 hover:shadow-red-500/20 hover:shadow-lg transition-all duration-300"
//                             >
//                                 <div className="text-red-400 group-hover:text-red-500 transition">{item.icon}</div>
//                                 <div className="text-white">
//                                     <p className="text-sm font-semibold mb-1 text-red-500">{item.label}</p>
//                                     <p className="whitespace-pre-line text-sm">{item.value}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="text-sm p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
//                         <h4 className="text-lg font-semibold text-red-500 mb-2">Öffnungszeiten</h4>
//                         <p>Montag – Freitag: 9:00 – 18:00</p>
//                         <p>Samstag: 10:00 – 16:00</p>
//                         <p>Sonntag: geschlossen</p>
//                     </div>
//                 </motion.div>
//             </div>
//         </section>
//     )
// }

'use client'
import { useState, useRef } from 'react'
import { db } from '../lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { motion } from 'framer-motion'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'

export default function ContactSection() {
    const [form, setForm] = useState({ name: '', email: '', betreff: '', message: '' })
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [captchaVerified, setCaptchaVerified] = useState(false)
    const recaptchaRef = useRef()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleCaptcha = (token) => {
        setCaptchaVerified(!!token)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!captchaVerified) return alert('Bitte bestätigen Sie das reCAPTCHA.')

        setLoading(true)
        try {
            await addDoc(collection(db, 'contacts'), {
                ...form,
                createdAt: serverTimestamp(),
            })
            setForm({ name: '', email: '', betreff: '', message: '' })
            recaptchaRef.current.reset()
            setCaptchaVerified(false)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            console.error('Error saving contact:', err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section id="contactForm" className="bg-black text-white py-24 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-2 text-red-500">Kontakt Aufnehmen</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Bereit, Ihre Marke mit Premium-Lasergravuren auf ein neues Level zu bringen?
                    Kontaktieren Sie uns für eine Beratung.
                </p>
            </motion.div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
                {/* Form Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-zinc-900 rounded-xl p-6 hover:shadow-red-600/30 hover:shadow-lg transition-all"
                >
                    <h3 className="text-xl font-semibold mb-4 text-red-500">Nachricht Senden</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {['name', 'email', 'betreff'].map((field) => (
                            <input
                                key={field}
                                type={field === 'email' ? 'email' : 'text'}
                                name={field}
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={form[field]}
                                onChange={handleChange}
                                className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                                required
                            />
                        ))}
                        <textarea
                            name="message"
                            placeholder="Nachricht"
                            rows="5"
                            value={form.message}
                            onChange={handleChange}
                            className="w-full p-3 rounded bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition-all"
                            required
                        />

                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6LcLEIYrAAAAACd1Dzso1toEraY54pNO1FJhCGn0"
                            onChange={handleCaptcha}
                            className="pt-2"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded text-white font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                            {loading ? 'Wird gesendet...' : 'Nachricht Senden'}
                            <FaPaperPlane />
                        </button>

                        {success && (
                            <p className="text-green-500 text-sm mt-2 text-center">
                                Nachricht erfolgreich gesendet.
                            </p>
                        )}
                    </form>
                </motion.div>

                {/* Info Side */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex flex-col justify-center space-y-8"
                >
                    <div className="space-y-4 text-sm">
                        <h3 className="text-lg font-semibold text-red-500">Kontaktinformationen</h3>

                        {[
                            {
                                icon: <FaEnvelope className="text-xl" />,
                                label: 'E-Mail',
                                value: 'lumixpert.de@gmail.com',
                            },
                            {
                                icon: <FaPhone className="text-xl" />,
                                label: 'Telefon',
                                value: '+49 178 1638184',
                            },
                            {
                                icon: <FaMapMarkerAlt className="text-xl" />,
                                label: 'Adresse',
                                value: 'Schwalbenweg 19\n34212 Melsungen',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-red-500 hover:shadow-red-500/20 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="text-red-400 group-hover:text-red-500 transition">{item.icon}</div>
                                <div className="text-white">
                                    <p className="text-sm font-semibold mb-1 text-red-500">{item.label}</p>
                                    <p className="whitespace-pre-line text-sm">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-sm p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-red-500 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300">
                        <h4 className="text-lg font-semibold text-red-500 mb-2">Öffnungszeiten</h4>
                        <p>Montag – Freitag: 9:00 – 18:00</p>
                        <p>Samstag: 10:00 – 16:00</p>
                        <p>Sonntag: geschlossen</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
