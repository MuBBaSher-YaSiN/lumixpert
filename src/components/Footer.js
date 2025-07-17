'use client'
import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa'

export default function Footer() {
    return (
        <footer className="bg-black text-white border-t border-red-700 pt-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-2">
                    <span className="text-white">LUMI </span>
                    <span className="text-red-600">XPERT</span>
                </h2>
                <div className="h-1 w-24 mx-auto bg-red-600 mb-4" />

                <p className="text-gray-300 text-sm md:text-base max-w-xl mx-auto mb-6">
                    Ihr Partner für professionelle Lasergravuren mit modernster Technologie und höchsten Qualitätsstandards.
                </p>

                <div className="flex justify-center gap-6 mb-10">
                    <a
                        href="https://www.instagram.com/lumi.xpert/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 transition"
                    >
                        <FaInstagram size={20} />
                    </a>
                    <a
                        href="https://www.facebook.com/profile.php?id=61577765944704"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-zinc-800 p-3 rounded-full hover:bg-red-600 transition"
                    >
                        <FaFacebookF size={20} />
                    </a>
                </div>

                <div className="border-t border-zinc-700 pt-4 pb-6 text-sm flex flex-col md:flex-row justify-center items-center text-gray-400">
                    <p className='text-center'>© {new Date().getFullYear()} LumiXpert. All rights reserved.</p>
                    <div className="flex gap-4 mt-2 md:mt-0">
                        {/* <Link href="/datenschutz" className="hover:text-white transition">Data protection</Link>
                        <Link href="/impressum" className="hover:text-white transition">imprint</Link> */}
                    </div>
                </div>
            </div>
        </footer>
    )
}
