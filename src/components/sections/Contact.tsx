import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import {
    MapPinIcon,
    EnvelopeIcon,
} from '@heroicons/react/24/outline'
import Button from '../common/Button';

interface FormData {
    "entry.1779819228": string; // Name
    "entry.1176124867": string; // Email
    "entry.1515023517": string; // Phone
    "entry.2065683546": string;  // Message
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
            >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
        )
    }
]

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const formRef = useRef<HTMLFormElement>(null)

    const isVisible = useIntersectionObserver(sectionRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    const [formData, setFormData] = useState<FormData>({
        "entry.1779819228": "", // Name
        "entry.1176124867": "", // Email
        "entry.1515023517": "", // Phone
        "entry.2065683546": "",  // Message
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

    const validateForm = () => {
        // Email validation
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!emailRegex.test(formData["entry.1176124867"])) {
            alert("Please enter a valid email address!");
            return false;
        }

        // Phone validation
        const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        if (!phoneRegex.test(formData["entry.1515023517"])) {
            alert("Please enter a valid phone number!");
            return false;
        }

        return true;
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setStatus('idle');

        try {
            // Open a small pop-up window to submit the form without redirecting the main page
            const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeypuPKRIHSTzqObfjIqB4xSl4I5yb2yJlAdyCOnCV7sgOzkA/formResponse";

            const formDataEncoded = new URLSearchParams();
            Object.entries(formData).forEach(([key, value]) => {
                formDataEncoded.append(key, value);
            });

            const submitWindow = window.open(
                `${formUrl}?${formDataEncoded.toString()}`,
                "_blank",
                "width=500,height=500"
            );

            // Close the window after 2 seconds
            setTimeout(() => {
                if (submitWindow) {
                    submitWindow.close();
                }
                setStatus('success');
                setFormData({
                    "entry.1779819228": "",
                    "entry.1176124867": "",
                    "entry.1515023517": "",
                    "entry.2065683546": "",
                });
            }, 2000);

        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        <div className="bg-white p-6 shadow-soft hover:shadow-medium transition-shadow rounded-lg">
                            <div className="flex items-start space-x-4">
                                <MapPinIcon className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Location</h3>
                                    <p className="text-dark-lighter">Bengaluru, Karnataka, India</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 shadow-soft hover:shadow-medium transition-shadow rounded-lg">
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
                        <div className="flex flex-wrap justify-center space-x-4 pt-4">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 bg-white shadow-soft hover:shadow-medium 
            text-dark-lighter hover:text-primary 
            transition-all duration-300 rounded-lg"
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
                        className="bg-white p-8 shadow-soft rounded-lg"
                    >
                        <form
                            ref={formRef}
                            action="https://docs.google.com/forms/d/e/1FAIpQLSeypuPKRIHSTzqObfjIqB4xSl4I5yb2yJlAdyCOnCV7sgOzkA/formResponse"
                            method="POST"
                            className="space-y-6"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="entry.1779819228" className="sr-only">Name</label>
                                    <input
                                        id="entry.1779819228"
                                        type="text"
                                        name="entry.1779819228"
                                        value={formData["entry.1779819228"]}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200 
                                        focus:border-primary focus:ring-1 focus:ring-primary
                                        text-dark placeholder-dark-lighter rounded-lg"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="entry.1176124867" className="sr-only">Email</label>
                                    <input
                                        id="entry.1176124867"
                                        type="email"
                                        name="entry.1176124867"
                                        value={formData["entry.1176124867"]}
                                        onChange={handleChange}
                                        placeholder="Email Address"
                                        required
                                        className="w-full px-4 py-3 border border-gray-200
                                        focus:border-primary focus:ring-1 focus:ring-primary
                                        text-dark placeholder-dark-lighter rounded-lg"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="entry.1515023517" className="sr-only">Phone</label>
                                <input
                                    id="entry.1515023517"
                                    type="tel"
                                    name="entry.1515023517"
                                    value={formData["entry.1515023517"]}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                    className="w-full px-4 py-3 border border-gray-200
                                    focus:border-primary focus:ring-1 focus:ring-primary
                                    text-dark placeholder-dark-lighter rounded-lg"
                                />
                            </div>

                            <div>
                                <label htmlFor="entry.2065683546" className="sr-only">Message</label>
                                <textarea
                                    id="entry.2065683546"
                                    name="entry.2065683546"
                                    value={formData["entry.2065683546"]}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-200
                                    focus:border-primary focus:ring-1 focus:ring-primary
                                    text-dark placeholder-dark-lighter rounded-lg"
                                />
                            </div>

                            <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="w-full rounded-xl">
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </Button>

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