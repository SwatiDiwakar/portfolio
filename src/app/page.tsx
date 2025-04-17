"use client"
import { Suspense } from 'react'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Testimonials from '@/components/sections/Testimonials'
import Contact from '@/components/sections/Contact'
import Newsletter from '@/components/sections/Newsletter'
import Loading from '@/app/loading';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Suspense fallback={<Loading />}>
        <Hero />
      </Suspense>

      {/* About Section */}
      <Suspense fallback={<Loading />}>
        <About />
      </Suspense>

      {/* Services Section */}
      <Suspense fallback={<Loading />}>
        <Services />
      </Suspense>

      {/* Portfolio Section */}
      <Suspense fallback={<Loading />}>
        <Portfolio />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<Loading />}>
        <Testimonials />
      </Suspense>

      {/* Newsletter Section */}
      <Suspense fallback={<Loading />}>
        <Newsletter />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<Loading />}>
        <Contact />
      </Suspense>
    </>
  )
}