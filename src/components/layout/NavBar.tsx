"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { getImagePath } from '@/utils/helpers'

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isOpen ? 'bg-white shadow-lg' : 'bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                        <Image
                            src={getImagePath("/assets/icons/favicon.ico")}
                            alt="Swati Diwakar"
                            width={32}
                            height={32}
                            className="w-8 h-8"
                        />
                        <span className="text-lg font-semibold text-primary hidden sm:inline">
                            Swati Diwakar
                        </span>
                        <span className="text-lg font-semibold text-primary sm:hidden">
                            SD
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-dark-light hover:text-primary transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-dark-light 
                       hover:text-primary focus:outline-none"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            <div className="relative w-6 h-6">
                                <span
                                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : '-translate-y-2'
                                        }`}
                                />
                                <span
                                    className={`absolute h-0.5 w-6 bg-current transform transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-0' : 'opacity-100'
                                        }`}
                                />
                                <span
                                    className={`absolute h-0.5 w-6 bg-current transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 translate-y-2' : 'translate-y-2'
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="block px-3 py-2 text-base font-medium text-dark-light 
                           hover:text-primary transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}