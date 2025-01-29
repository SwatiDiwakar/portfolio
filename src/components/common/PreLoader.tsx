'use client'

import { useEffect, useState } from 'react'

export default function PreLoader() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Hide preloader after a short delay
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [])

    if (!isLoading) return null

    return (
        <div
            className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 
                 ${isLoading ? 'opacity-100' : 'opacity-0'}`}
        >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    )
}