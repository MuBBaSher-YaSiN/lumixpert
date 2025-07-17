// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import Head from "next/head";
// import WhatsAppButton from "@/components/WhatsAppButton";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata = {
//   title: "LumiXpert - Premium Lasergravur",
//   description: "Präzise Lasergravuren auf Metall, Holz, Leder und Acryl für außergewöhnliche Markenerlebnisse.",
//   icons: {
//     icon: '/favicon.ico'
//   }
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <style>{`
//           body {
//             font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
//           }
//             `}
//         </style>
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//         <WhatsAppButton />
//       </body>
//     </html>
//   );
// }

import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import WhatsAppButton from "@/components/WhatsAppButton"
import CookieBanner from "@/components/CookieBanner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata = {
  title: "LumiXpert - Premium Lasergravur",
  description:
    "Präzise Lasergravuren auf Metall, Holz, Leder und Acryl für außergewöhnliche Markenerlebnisse.",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <style>{`
          body {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          }
        `}</style>

        {/* reCAPTCHA script */}
        <script
          src="https://www.google.com/recaptcha/api.js"
          async
          defer
        ></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <WhatsAppButton />
        <CookieBanner />
      </body>
    </html>
  )
}
