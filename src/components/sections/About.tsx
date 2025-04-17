"use client"

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Button from '@/components/common/Button'
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import { getImagePath } from '@/utils/helpers'

export default function About() {
    const aboutRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(aboutRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    return (
        <section
            id="about"
            ref={aboutRef}
            className="py-24 bg-light"
            suppressHydrationWarning
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold relative inline-block">
                        Get to <span className="text-primary">know</span> me
                        <motion.span
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: '100%' } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 -bottom-3 h-0.5 bg-primary"
                        />
                    </h2>
                </motion.div>

                {/* Content */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-center"
                    >
                        <p className="text-lg text-dark-lighter mb-8 leading-relaxed">
                            Fueled by a vision to drive innovation, I design transformative products and
                            curricula that redefine education and technology.
                            With strategic planning expertise and dynamic leadership, I empower teams to deliver impactful, scalable
                            solutions. My work bridges cutting-edge technology and practical implementation, ensuring meaningful
                            outcomes.
                        </p>

                        <p className="text-lg text-dark-lighter mb-12 leading-relaxed">
                            I thrive on fostering collaboration and building strategies that inspire growth and long-term success.
                        </p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isVisible ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="flex justify-center space-x-6"
                        >
                            <Button
                                href={getImagePath("/assets/documents/Swati_CV.pdf")}
                                variant="outline" className='text-xs lg:text-base rounded-2xl'
                                icon={<ArrowDownTrayIcon className="w-5 h-5 rounded" />}
                            >
                                Discover my experience
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Stats or Additional Info - Optional */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
                >
                    <div className="text-center p-6 bg-white shadow-soft hover:shadow-medium transition-shadow rounded-xl">
                        <h3 className="text-4xl font-bold text-primary mb-2">15+</h3>
                        <p className="text-dark-lighter">Years Experience</p>
                    </div>
                    <div className="text-center p-6 bg-white shadow-soft hover:shadow-medium transition-shadow rounded-xl">
                        <h3 className="text-4xl font-bold text-primary mb-2">100+</h3>
                        <p className="text-dark-lighter">Projects Completed</p>
                    </div>
                    <div className="text-center p-6 bg-white shadow-soft hover:shadow-medium transition-shadow rounded-xl">
                        <h3 className="text-4xl font-bold text-primary mb-2">3</h3>
                        <p className="text-dark-lighter">International Awards</p>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}