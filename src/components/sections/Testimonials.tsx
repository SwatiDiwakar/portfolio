"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { testimonials } from '@/data/testimonials'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(sectionRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    const [currentIndex, setCurrentIndex] = useState(0)

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
        )
    }

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
        )
    }

    return (
        <section
            id="testimonials"
            ref={sectionRef}
            className="py-24 bg-secondary"
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
                    <h2 className="text-3xl sm:text-4xl font-bold relative inline-block text-dark">
                        Voices of <span className="text-primary">Trust & Impact</span>
                        <motion.span
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: '100%' } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 -bottom-3 h-0.5 bg-primary"
                        />
                    </h2>
                </motion.div>

                {/* Testimonials Slider */}
                <div className="max-width mx-auto relative">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white p-8 md:p-12 shadow-lg"
                    >
                        <div className="mb-8">
                            <p className="text-dark-lighter text-lg italic leading-relaxed">
                                &quot;{testimonials[currentIndex].content}&quot;
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold text-dark">
                                    {testimonials[currentIndex].author}
                                </h3>
                                <p className="text-dark-lighter">
                                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                                </p>
                                {testimonials[currentIndex].linkedinUrl && (
                                    <div className="flex flex-wrap space-x-4">
                                        <a
                                            key={testimonials[currentIndex].author}
                                            href={testimonials[currentIndex].linkedinUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="p-3 bg-white shadow-soft hover:shadow-hard 
            text-dark-lighter hover:text-primary
            transition-all duration-300 rounded-lg"
                                            aria-label={testimonials[currentIndex].author}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#0077B5" className="bi bi-linkedin" viewBox="0 0 16 16">
                                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                            </svg>
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation Buttons */}
                    <div className="flex justify-center mt-8 space-x-4">
                        <button
                            onClick={handlePrevious}
                            className="p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white 
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-primary focus:ring-offset-2"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeftIcon className="w-6 h-6" />
                        </button>
                        <button
                            onClick={handleNext}
                            className="p-2 rounded-full bg-white shadow-md hover:bg-primary hover:text-white 
                       transition-colors duration-200 focus:outline-none focus:ring-2 
                       focus:ring-primary focus:ring-offset-2"
                            aria-label="Next testimonial"
                        >
                            <ChevronRightIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="flex justify-center mt-4 space-x-2">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 
                          ${index === currentIndex ? 'bg-primary' : 'bg-gray-300'}`}
                                aria-label={`Go to testimonial ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}