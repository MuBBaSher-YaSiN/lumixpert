'use client'
import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/message/ANIWZWWGHAGUB1"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-10 right-5 z-100 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all"
            aria-label="WhatsApp Chat"
        >
            <FaWhatsapp size={24} />
        </a>
    )
}
