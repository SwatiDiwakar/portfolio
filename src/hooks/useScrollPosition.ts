"use client"

import { useState, useEffect } from 'react'

export function useScrollPosition() {
    const [scrollPosition, setScrollPosition] = useState(0)
    const [direction, setDirection] = useState<'up' | 'down'>('up')
    const [lastScroll, setLastScroll] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const position = window.scrollY
            setScrollPosition(position)

            // Determine scroll direction
            if (position > lastScroll) {
                setDirection('down')
            } else {
                setDirection('up')
            }
            setLastScroll(position)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScroll])

    return { scrollPosition, direction }
}
