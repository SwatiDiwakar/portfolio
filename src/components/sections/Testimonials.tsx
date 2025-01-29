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
                        Testimonials
                        <motion.span
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: '100%' } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 -bottom-3 h-0.5 bg-primary"
                        />
                    </h2>
                </motion.div>

                {/* Testimonials Slider */}
                <div className="max-w-4xl mx-auto relative">
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
                                    <a
                                        href={testimonials[currentIndex].linkedinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary-dark transition-colors mt-2 inline-block"
                                    >
                                        View on LinkedIn
                                    </a>
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