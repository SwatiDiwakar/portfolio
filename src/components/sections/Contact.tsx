import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import {
    MapPinIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline'
import Button from '@/components/common/Button'

interface FormData {
    name: string
    email: string
    phone: string
    message: string
}

const socialLinks = [
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/swati-diwakar',
        icon: (
            <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        )
    },
    {
        name: 'Instagram',
        url: 'https://www.instagram.com/swatidwalker',
        icon: (
            <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
            >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z" />
            </svg>
        )
    }
]

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(sectionRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setStatus('idle')

        try {
            // Add your form submission logic here
            await new Promise(resolve => setTimeout(resolve, 1000)) // Simulated API call
            setStatus('success')
            setFormData({ name: '', email: '', phone: '', message: '' })
        } catch (error) {
            console.error('Error submitting form:', error)
            setStatus('error')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="py-24 bg-light"
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
                        Drop <span className="text-primary">me</span> a line
                        <motion.span
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: '100%' } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 -bottom-3 h-0.5 bg-primary"
                        />
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-white p-6 shadow-soft hover:shadow-medium transition-shadow">
                            <div className="flex items-start space-x-4">
                                <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                                    <p className="text-dark-lighter">Bengaluru, Karnataka, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 shadow-soft hover:shadow-medium transition-shadow">
                            <div className="flex items-start space-x-4">
                                <EnvelopeIcon className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Email</h3>
                                    <a
                                        href="mailto:swati.diwa@gmail.com"
                                        className="text-dark-lighter hover:text-primary transition-colors"
                                    >
                                        swati.diwa@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4 pt-4">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white shadow-soft hover:shadow-medium 
                           text-dark-lighter hover:text-primary 
                           transition-all duration-300"
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="bg-white p-8 shadow-soft"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 
                             focus:border-primary focus:ring-1 focus:ring-primary
                             text-dark placeholder-dark-lighter"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="sr-only">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200
                             focus:border-primary focus:ring-1 focus:ring-primary
                             text-dark placeholder-dark-lighter"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="phone" className="sr-only">Phone</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-3 border border-gray-200
                           focus:border-primary focus:ring-1 focus:ring-primary
                           text-dark placeholder-dark-lighter"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-200
                           focus:border-primary focus:ring-1 focus:ring-primary
                           text-dark placeholder-dark-lighter"
                                />
                            </div>

                            <div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </Button>
                            </div>

                            {/* Status Messages */}
                            {status === 'success' && (
                                <div className="text-green-600 text-center">
                                    Message sent successfully!
                                </div>
                            )}
                            {status === 'error' && (
                                <div className="text-red-600 text-center">
                                    There was an error sending your message. Please try again.
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}