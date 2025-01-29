'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import styles from '@/styles/PDFViewer.module.css'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'
import { getImagePath } from '@/utils/helpers'

// Set worker path to local file
pdfjs.GlobalWorkerOptions.workerSrc = getImagePath(`/scripts/pdf.worker.min.js`)

interface PDFViewerProps {
    pdfUrl: string
    title: string
    onClose: () => void
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
    const [numPages, setNumPages] = useState<number>(0)
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const [scale, setScale] = useState(1.0)

    // Calculate optimal scale based on window width
    useEffect(() => {
        const calculateScale = () => {
            const windowWidth = window.innerWidth
            if (windowWidth < 640) return 0.7 // mobile
            if (windowWidth < 1024) return 0.8 // tablet
            return 1.0 // desktop
        }
        setScale(calculateScale())

        const handleResize = () => setScale(calculateScale())
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
        setNumPages(numPages)
        setLoading(false)
    }

    function changePage(offset: number) {
        setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages))
    }

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                changePage(1)
            } else if (e.key === 'ArrowLeft') {
                changePage(-1)
            } else if (e.key === 'Escape') {
                onClose()
            }
        }

        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [onClose])

    return (
        <div className={styles.pdfContainer} onClick={(e) => {
            if (e.target === e.currentTarget) onClose()
        }}>
            <div className={styles.pdfContent}>
                {/* Header */}
                <div className={styles.header}>
                    <h3 className={styles.title}>{title}</h3>
                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Close"
                    >
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {/* PDF Viewer */}
                <div className={styles.pdfWrapper}>
                    {loading && (
                        <div className={styles.loadingSpinner}>
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
                        </div>
                    )}

                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={null}
                        error={
                            <div className="text-center p-4 text-red-600">
                                <p className="font-medium">Failed to load PDF</p>
                                <p className="text-sm mt-1">Please try again later</p>
                            </div>
                        }
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={scale}
                            loading={null}
                            error={
                                <div className="text-center p-4 text-red-600">
                                    Failed to load page
                                </div>
                            }
                            className="shadow-lg"
                        />
                    </Document>
                </div>

                {/* Navigation */}
                {numPages > 0 && (
                    <div className={styles.navigation}>
                        <div className={styles.navButtons}>
                            <button
                                onClick={() => changePage(-1)}
                                disabled={pageNumber <= 1}
                                className={styles.navButton}
                                aria-label="Previous page"
                            >
                                <ChevronLeftIcon className="w-5 h-5" />
                            </button>

                            <button
                                onClick={() => changePage(1)}
                                disabled={pageNumber >= numPages}
                                className={styles.navButton}
                                aria-label="Next page"
                            >
                                <ChevronRightIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <p className={styles.pageInfo}>
                            Page {pageNumber} of {numPages}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}