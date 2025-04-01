"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useRef } from 'react'
import Button from '@/components/common/Button'
import { getImagePath } from '@/utils/helpers'

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(heroRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    return (
        <section
            id="home"
            ref={heroRef}
            className="relative min-h-screen flex items-center bg-light overflow-hidden"
            suppressHydrationWarning
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center lg:text-left"
                    >
                        <h1 className="font-sans text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-tight">
                            <span className="block">
                                S<span className="text-primary">wa</span>ti
                            </span>
                            <span className="block font-light">
                                Di<span className="text-primary">wa</span>kar
                            </span>
                        </h1>

                        <motion.h3
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="font-sans mt-6 text-xl sm:text-2xl text-dark-lighter leading-relaxed"
                        >
                            Vision to Reality:
                            <br />
                            Innovating Products, Services, & {" "}
                            <span className="font-sans text-primary font-semibold">Growth</span>
                        </motion.h3>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="mt-8 flex flex-col md:flex-row items-center justify-center lg:justify-start gap-4 w-full"
                        >
                            <Button href="#contact" variant="primary" className="font-sans rounded-xl w-full md:w-auto text-center">
                                Let&apos;s Collaborate
                            </Button>
                            <Button href="#portfolio" variant="outline" className="font-sans rounded-xl w-full md:w-auto text-center">
                                View Portfolio
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Background Image/Pattern */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden lg:block relative"
                    >
                        <div className="relative w-full aspect-square">
                            <Image
                                src={getImagePath('/images/logo.png')}
                                alt="Design Pattern"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                >
                    <a
                        href="#about"
                        className="text-primary hover:text-primary-dark transition-colors"
                        aria-label="Scroll to About section"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </a>
                </motion.div>
            </div>
        </section>
    )
}