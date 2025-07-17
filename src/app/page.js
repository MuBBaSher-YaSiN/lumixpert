import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import Kundenmeinungen from '@/components/Kundenmeinungen'
import ProductsSection from '@/components/ProductsSection'
import VideoSection from '@/components/VideoSection'
import React from 'react'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <VideoSection />
      <AboutSection />
      <ProductsSection />
      <Kundenmeinungen />
      <ContactSection />
      <Footer />
    </div>
  )
}
