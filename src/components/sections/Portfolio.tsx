"use client"

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Button from '@/components/common/Button'
import { getImagePath } from '@/utils/helpers'
import PDFViewer from '@/components/common/PDFViewer'

interface PortfolioItem {
    id: string
    title: string
    category: string
    imageUrl: string
    videoUrl?: string
    description: string
    link?: string
}

interface PDFFile {
    title: string
    url: string
    category: string
}

const portfolioItems: PortfolioItem[] = [
    {
        id: '1',
        title: 'Marketing Video for Peecee Compute Kit',
        category: 'video',
        imageUrl: '/images/video-1-thumb.jpg',
        videoUrl: 'https://www.youtube.com/embed/Hq72ZbaYmG0?autoplay=1&mute=1&loop=1&playlist=Hq72ZbaYmG0&origin=http://localhost:3000',
        description: 'See innovation in action! This dynamic marketing video captures the essence of Peecee Compute Kit, demonstrating how it empowers young creators to bring their ideas to life.'
    },
    {
        id: '2',
        title: 'Curriculum Video for Peecee',
        category: 'video',
        imageUrl: '/images/video-2-thumb.jpg',
        videoUrl: 'https://www.youtube.com/embed/LpGjhI43S8I?autoplay=1&mute=1&loop=1&playlist=LpGjhI43S8I&origin=http://localhost:3000',
        description: 'Transforming learning, one project at a time! This curriculum video showcases how Peecee bridges the gap between theory and hands-on learning.'
    },
    {
        id: '3',
        title: 'MakerSpace Introduction Video',
        category: 'video',
        imageUrl: '/images/video-3-thumb.jpg',
        videoUrl: 'https://www.youtube.com/embed/U6tWN4cubIE?autoplay=1&mute=1&loop=1&playlist=U6tWN4cubIE&origin=http://localhost:3000',
        description: 'Where creativity meets collaboration! This MakerSpace video is a glimpse into how we design spaces that foster innovation and teamwork.'
    }
]

const pdfFiles: PDFFile[] = [
    {
        title: 'Branding Ideation',
        url: '/assets/documents/Branding.pdf',
        category: 'design'
    },
    {
        title: 'Packaging Design',
        url: '/assets/documents/Packaging.pdf',
        category: 'design'
    },
    {
        title: 'Brochure Design',
        url: '/assets/documents/Brochure.pdf',
        category: 'design'
    },
    {
        title: 'Teacher Training',
        url: '/assets/documents/Teacher.pdf',
        category: 'curriculum'
    },
    {
        title: 'Activity Sheet',
        url: '/assets/documents/Activity_Sheet.pdf',
        category: 'curriculum'
    },
    {
        title: 'Activity Booklet',
        url: '/assets/documents/Activity_Booklet.pdf',
        category: 'curriculum'
    },
    {
        title: 'MakerFaire Runbook',
        url: '/assets/documents/Runbook_MakerFaire.pdf',
        category: 'operations'
    },
    {
        title: 'School Sales Training',
        url: '/assets/documents/School_Sales_Training.pdf',
        category: 'sales'
    }
]

const categories = ['all', 'video', 'design', 'curriculum', 'operations', 'sales']

export default function Portfolio() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const isVisible = useIntersectionObserver(sectionRef, {
        threshold: 0.1,
        freezeOnceVisible: true
    })

    const [activeCategory, setActiveCategory] = useState('all')
    const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
    const [selectedPdf, setSelectedPdf] = useState<PDFFile | null>(null)

    const getFilteredItems = (category: string) => {
        if (category === 'all') {
            return {
                items: portfolioItems,
                pdfs: pdfFiles
            }
        }

        return {
            items: portfolioItems.filter(item => item.category === category),
            pdfs: pdfFiles.filter(pdf => pdf.category === category)
        }
    }

    useEffect(() => {
        console.log("Selected PDF:", selectedPdf);
    }, [selectedPdf]);

    const { items: filteredItems, pdfs: filteredPdfs } = getFilteredItems(activeCategory)

    return (
        <section
            id="portfolio"
            ref={sectionRef}
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
                        Sample <span className="text-primary">Projects</span>
                        <motion.span
                            initial={{ width: 0 }}
                            animate={isVisible ? { width: '100%' } : {}}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="absolute left-0 -bottom-3 h-0.5 bg-primary"
                        />
                    </h2>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 rounded-xl text-sm uppercase tracking-wider transition-all
                                    ${activeCategory === category
                                    ? 'bg-primary text-white'
                                    : 'bg-white text-dark hover:bg-primary hover:text-white'
                                }`}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </motion.div>

                {/* Portfolio Grid */}
                {filteredItems.length > 0 && (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                    >
                        {filteredItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-white shadow-soft hover:shadow-medium 
                                        transition-all duration-300 rounded-2xl"
                            >
                                {/* Portfolio Item Image */}
                                <div className="relative aspect-video overflow-hidden rounded-2xl">
                                    <Image
                                        src={getImagePath(item.imageUrl)}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-primary bg-opacity-0 group-hover:bg-opacity-90 
                                                transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                                                    text-white text-center p-4">
                                            <p className="mb-4 font-display text-xs lg:text-base">{item.description}</p>
                                            <Button
                                                variant="accent1"
                                                onClick={() => setSelectedItem(item)}
                                                className='font-sans text-xs lg:text-base rounded-xl'
                                            >
                                                View Details
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                {/* Portfolio Item Title (Moved Below the Image) */}
                                <h3 className="text-lg font-semibold text-center mt-4 mb-4">{item.title}</h3>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* PDF Downloads Grid */}
                {filteredPdfs.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center text-center">
                        {filteredPdfs.map((pdf) => (
                            <button
                                key={pdf.title}
                                onClick={() => {
                                    setTimeout(() => {
                                        console.log("Delayed selection of PDF:", pdf)
                                        setSelectedPdf(pdf)
                                    }, 200)
                                }}
                                className="bg-primary text-white font-sans hover:bg-primary-dark rounded-xl
                            transition-colors duration-300 py-3 px-6 text-center"
                            >
                                {pdf.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Show a message when no items are found */}
                {filteredItems.length === 0 && filteredPdfs.length === 0 && (
                    <div className="text-center text-dark-lighter py-8">
                        No items found for this category.
                    </div>
                )}

                {/* Video/Image Modal */}
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 overflow-y-auto"
                    >
                        <div className="bg-white max-w-4xl w-full p-6 relative my-8 rounded-lg">
                            <button
                                onClick={() => setSelectedItem(null)}
                                className="absolute -top-4 -right-4 bg-white w-10 h-10 rounded-full 
                                         flex items-center justify-center shadow-lg 
                                         text-dark hover:text-primary transition-colors
                                         border-2 border-gray-100"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>

                            <div className="space-y-6">
                                <div className="bg-gray-100 rounded-lg overflow-hidden">
                                    {selectedItem.videoUrl ? (
                                        <div className="relative pt-[56.25%]">
                                            <iframe
                                                src={selectedItem.videoUrl}
                                                className="absolute top-0 left-0 w-full h-full"
                                                allowFullScreen
                                            />
                                        </div>
                                    ) : (
                                        <Image
                                            src={getImagePath(selectedItem.imageUrl)}
                                            alt={selectedItem.title}
                                            width={800}
                                            height={450}
                                            className="w-full"
                                        />
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-dark">
                                        {selectedItem.title}
                                    </h3>
                                    <p className="text-dark-lighter">
                                        {selectedItem.description}
                                    </p>

                                    {selectedItem.link && (
                                        <a
                                            href={selectedItem.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block text-primary hover:text-primary-dark
                                                     transition-colors duration-300"
                                        >
                                            Visit Project →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* PDF Viewer Modal */}
                {selectedPdf !== null ? (
                    <PDFViewer
                        pdfUrl={getImagePath(selectedPdf.url)}
                        title={selectedPdf.title}
                        onClose={() => {
                            console.log('Closing PDF viewer')
                            setSelectedPdf(null)
                        }}
                    />
                ) : null}
            </div>
        </section>
    )
}