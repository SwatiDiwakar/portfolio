'use client'

import { useEffect, useState } from 'react'

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener('scroll', toggleVisibility)

        return () => {
            window.removeEventListener('scroll', toggleVisibility)
        }
    }, [])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    if (!isVisible) return null

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="fixed bottom-8 right-8 z-40 h-12 w-12 rounded-full 
               bg-primary text-white shadow-lg transition-all hover:bg-primary-dark
               focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
               flex items-center justify-center"
        >
            <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        </button>
    )
}