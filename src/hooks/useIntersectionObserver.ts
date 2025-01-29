import { useEffect, useState, RefObject } from 'react'

interface UseIntersectionObserverProps {
    root?: Element | null
    rootMargin?: string
    threshold?: number | number[]
    freezeOnceVisible?: boolean
}

export function useIntersectionObserver(
    elementRef: RefObject<Element | null>,
    {
        threshold = 0,
        root = null,
        rootMargin = '0%',
        freezeOnceVisible = false,
    }: UseIntersectionObserverProps
): boolean {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const element = elementRef?.current
        if (!element) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                const isElementVisible = entry.isIntersecting
                setIsVisible(isElementVisible)

                if (isElementVisible && freezeOnceVisible) {
                    observer.unobserve(element)
                }
            },
            { threshold, root, rootMargin }
        )

        observer.observe(element)
        return () => observer.disconnect()
    }, [elementRef, threshold, root, rootMargin, freezeOnceVisible])

    return isVisible
}