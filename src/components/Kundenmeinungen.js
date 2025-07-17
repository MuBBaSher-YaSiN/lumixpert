// 'use client'

// export default function Kundenmeinungen() {
//     const reviews = [
//         {
//             name: 'Anna M.',
//             review: 'Top Qualität und sehr professionelle Abwicklung. Wir bestellen sicher wieder!',
//         },
//         {
//             name: 'Jonas T.',
//             review: 'Unsere Kunden sind begeistert vom neuen Branding!',
//         },
//         {
//             name: 'Laura S.',
//             review: 'Sehr zuverlässig und schnell geliefert. Absolut empfehlenswert.',
//         },
//         {
//             name: 'Max R.',
//             review: 'Hochwertige Gravuren und freundlicher Service – besser geht’s nicht.',
//         },
//         {
//             name: 'Sophie B.',
//             review: 'Das Team hat unsere Idee perfekt umgesetzt. Vielen Dank!',
//         },
//         {
//             name: 'Lukas H.',
//             review: 'Individuell, hochwertig und sehr professionell. Jederzeit wieder.',
//         },
//     ]

//     return (
//         <section className="bg-black text-white py-24 px-4">
//             <div className="max-w-6xl mx-auto text-center mb-12">
//                 <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">Kundenmeinungen</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">
//                     Was unsere Kunden über unsere Arbeit sagen – echte Eindrücke, echte Ergebnisse.
//                 </p>
//             </div>

//             <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
//                 {reviews.map((item, i) => (
//                     <div
//                         key={i}
//                         className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition-all duration-300 group"
//                     >
//                         <p className="text-gray-300 mb-4 text-sm leading-relaxed group-hover:text-white transition">
//                             “{item.review}”
//                         </p>
//                         <div className="text-red-500 font-semibold text-sm">– {item.name}</div>
//                     </div>
//                 ))}
//             </div>
//         </section>
//     )
// }

'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useState, useRef } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function Kundenmeinungen() {
    const reviews = [
        {
            name: 'Anna M.',
            review: 'Top Qualität und sehr professionelle Abwicklung. Wir bestellen sicher wieder!',
        },
        {
            name: 'Jonas T.',
            review: 'Unsere Kunden sind begeistert vom neuen Branding!',
        },
        {
            name: 'Laura S.',
            review: 'Sehr zuverlässig und schnell geliefert. Absolut empfehlenswert.',
        },
        {
            name: 'Max R.',
            review: 'Hochwertige Gravuren und freundlicher Service – besser geht’s nicht.',
        },
        {
            name: 'Sophie B.',
            review: 'Das Team hat unsere Idee perfekt umgesetzt. Vielen Dank!',
        },
        {
            name: 'Lukas H.',
            review: 'Individuell, hochwertig und sehr professionell. Jederzeit wieder.',
        },
    ]

    const [sliderRef, slider] = useKeenSlider({
        loop: true,
        slides: {
            perView: 1,
            spacing: 16,
        },
        breakpoints: {
            '(min-width: 640px)': {
                slides: { perView: 2, spacing: 20 },
            },
            '(min-width: 1024px)': {
                slides: { perView: 3, spacing: 24 },
            },
        },
    })

    return (
        <section className="bg-black text-white py-24 px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-red-500">Kundenmeinungen</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Was unsere Kunden über unsere Arbeit sagen – echte Eindrücke, echte Ergebnisse.
                </p>
            </div>

            <div className="relative max-w-6xl mx-auto">
                {/* Arrows outside the content area */}
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={() => slider.current?.prev()}
                        className="bg-zinc-800 hover:bg-red-600 text-white p-3 rounded-full shadow transition"
                        aria-label="Zurück"
                    >
                        <FaChevronLeft />
                    </button>

                    <button
                        onClick={() => slider.current?.next()}
                        className="bg-zinc-800 hover:bg-red-600 text-white p-3 rounded-full shadow transition"
                        aria-label="Weiter"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Carousel */}
                <div ref={sliderRef} className="keen-slider">
                    {reviews.map((item, i) => (
                        <div
                            key={i}
                            className="keen-slider__slide bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 hover:shadow-lg transition-all duration-300 group"
                        >
                            <p className="text-gray-300 mb-4 text-sm leading-relaxed group-hover:text-white transition">
                                “{item.review}”
                            </p>
                            <div className="text-red-500 font-semibold text-sm">– {item.name}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
