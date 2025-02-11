"use client"

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Image from 'next/image'
import Button from '@/components/common/Button'
import { getImagePath } from '@/utils/helpers'

interface NewsletterFormData {
    email: string
}

export default function Newsletter() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(sectionRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    const [formData, setFormData] = useState<NewsletterFormData>({
        email: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus('idle')

        try {
            // Add newsletter subscription logic here
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
            setStatus('success')
            setFormData({ email: '' })
        } catch (error) {
            console.error('Error subscribing to newsletter:', error)
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section
            ref={sectionRef}
            className="bg-primary"
            suppressHydrationWarning
        >
            <div className="container-fluid">
                <div className="grid md:grid-cols-2">
                    {/* Newsletter Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="px-4 py-16 sm:px-6 lg:px-8 text-center md:text-left"
                    >
                        <div className="max-w-lg mx-auto md:mx-0">
                            <h2 className="font-serif text-3xl font-bold text-white">
                                <i className="fa fa-paper-plane mr-2"></i>
                                Subscribe to the Newsletter Waitlist
                            </h2>

                            <form onSubmit={handleSubmit} className="mt-8 flex flex-col md:flex-row gap-4">
                                <div className="flex-grow">
                                    <label htmlFor="email" className="sr-only">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 text-base text-dark rounded-lg 
                                                placeholder-dark-lighter bg-white border-2 
                                                border-transparent focus:border-accent2 
                                                focus:ring-2 focus:ring-accent2 transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-3 bg-accent2 text-dark font-display font-semibold 
                                             rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 
                                             hover:bg-accent2-dark disabled:opacity-50 disabled:cursor-not-allowed
                                             md:w-auto w-full"
                                >
                                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                </button>
                            </form>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-accent2 font-medium"
                                >
                                    Thank you for subscribing! You&apos;ll be notified when we launch.
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-4 text-red-300"
                                >
                                    There was an error subscribing. Please try again.
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Newsletter Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="relative h-48 md:h-auto"
                    >
                        <Image
                            src={getImagePath("/images/newsletter.png")}
                            alt="Newsletter illustration"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}