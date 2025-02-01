"use client"

import { useRef } from 'react'
import { color, motion } from 'framer-motion'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import {
    TrophyIcon,
    AcademicCapIcon,
    LightBulbIcon,
    ChartBarIcon,
    ComputerDesktopIcon,
    UsersIcon
} from '@heroicons/react/24/outline'

const services = [
    {
        icon: <TrophyIcon className="w-12 h-12" />,
        title: "Award-Winning Solutions for STEAM and Robotics Education",
        description: "Specialized in designing impactful products, curricula, and instructional frameworks for K12 and engineering education, blending technology and hands-on learning.",
        items: [
            "Developing robotics and STEAM education modules",
            "Red Dot Design Award (Germany)",
            "Good Design Award (Japan)",
            "Indian Design Award"
        ]
    },
    {
        icon: <AcademicCapIcon className="w-12 h-12" />,
        title: "Mentors of Tomorrow, Trained Today",
        description: "Empowering educators and school leaders to drive meaningful change through innovative teaching methodologies.",
        items: [
            "Training teachers in innovative methodologies",
            "Designing leadership development programs",
            "Helping educators unlock their potential"
        ]
    },
    {
        icon: <LightBulbIcon className="w-12 h-12" />,
        title: "Hands-On Innovation Through Makerspaces",
        description: "Fostering creativity through hands-on learning environments and workshops.",
        items: [
            "Setting up makerspaces like MastiMakers",
            "Conducting workshops on robotics and coding",
            "Creating interactive learning opportunities"
        ]
    },
    {
        icon: <ChartBarIcon className="w-12 h-12" />,
        title: "Chaos to Clarity: Streamlining Success",
        description: "Designing and implementing processes that streamline operations and foster collaboration.",
        items: [
            "30% reduction in delivery timelines",
            "25% increase in task efficiency",
            "Data-driven strategy implementation"
        ]
    },
    {
        icon: <ComputerDesktopIcon className="w-12 h-12" />,
        title: "UI, UX, and Website Development",
        description: "Designing and maintaining intuitive digital platforms that enhance user engagement.",
        items: [
            "Developing interactive learning platforms",
            "Creating user-friendly UI/UX designs",
            "Ensuring seamless functionality",
        ],
        links: [
            { name: "Yudu Robotics", url: "https://yudurobotics.com" },
            { name: "TinkerBunker", url: "https://www.tinkerbunker.com" },
            { name: "HackberryKids", url: "https://www.hackberrykids.com" }
        ]
    },
    {
        icon: <UsersIcon className="w-12 h-12" />,
        title: "Shaping Brands and Crafting Narratives",
        description: "Driving visibility and engagement through strategic marketing and branding.",
        items: [
            "Leading video and social media strategies",
            "Creating compelling campaigns",
            "Elevating products through storytelling"
        ]
    }
]

export default function Services() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(sectionRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    return (
        <section
            id="services"
            ref={sectionRef}
            className="py-24 bg-white"
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
                        Check out my <span className="text-primary">Impactful solutions</span> that drive success
                        <motion.span
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: '100%' } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 -bottom-3 h-0.5 bg-primary"
                        />
                    </h2>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isVisible ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="bg-light p-8 group hover:shadow-lg transition-shadow duration-300 rounded-3xl"
                        >
                            {/* Icon */}
                            <div className="mb-6">
                                <div className="w-16 h-16 rounded-full border-2 border-primary text-primary 
                             flex items-center justify-center
                             group-hover:bg-primary group-hover:text-white
                             transition-all duration-300">
                                    {service.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold mb-4 text-dark">
                                {service.title}
                            </h3>
                            <p className="text-dark-lighter mb-6">
                                {service.description}
                            </p>
                            <ul className="space-y-2">
                                {service.items.map((item, i) => (
                                    <li key={i} className="text-dark-lighter flex items-center">
                                        <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            {service.links && (
                                <p className="mt-4 text-dark-lighter">
                                    Here are a few websites to showcase my work:{" "}
                                    {service.links.map((link, i) => (
                                        <span key={i}>
                                            <a
                                                href={link.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-primary"
                                            >
                                                {link.name}
                                            </a>
                                            {i !== service.links.length - 1 && ", "}
                                        </span>
                                    ))}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}