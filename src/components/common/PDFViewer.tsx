"use client"

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

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
  const [maxScale] = useState(2.0)
  const [minScale] = useState(0.5)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    //const basePath = process.env.GITHUB_PAGES === 'true' ? '/portfolio' : ''
    pdfjs.GlobalWorkerOptions.workerSrc =
      `/portfolio/scripts/pdf.worker.min.js`;
  }, []);

  useEffect(() => {
    const calculateScale = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 640) return 0.6
      if (windowWidth < 1024) return 0.7
      return 1.0
    }
    setScale(calculateScale())

    const handleResize = () => setScale(calculateScale())
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        changePage(1)
      } else if (e.key === 'ArrowLeft') {
        changePage(-1)
      } else if (e.key === 'Escape') {
        onClose()
      } else if (e.key === '+' || e.key === '=') {
        handleZoomIn()
      } else if (e.key === '-' || e.key === '_') {
        handleZoomOut()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [onClose, pageNumber, numPages])

  if (!mounted) {
    return null
  }

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages)
    setLoading(false)
  }

  function changePage(offset: number) {
    setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages))
  }

  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, maxScale))
  }

  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, minScale))
  }

  /* const handleDownload = async () => {
    try {
      const response = await fetch(pdfUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = title.replace(/\s+/g, '_') + '.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    }
  }
 */
  return (
    // Overlay with click outside to close
    <div
      className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 sm:p-6 md:p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-4 py-3 flex items-center justify-between border-b">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* PDF Content */}
        <div className="flex-1 overflow-auto py-4 bg-gray-100 custom-scrollbar">
          <style jsx>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 4px;
              height: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}</style>
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
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
              <div className="flex justify-center">
                <div className="flex items-center justify-center">
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
                </div>
              </div>
            </Document>
          </div>
        </div>

        {/* Navigation */}
        {numPages > 0 && (
          <div className="px-4 py-3 flex items-center justify-between border-t bg-white rounded-b-lg">
            <div className="flex items-center space-x-4">
              {/* Page Navigation */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => changePage(-1)}
                  disabled={pageNumber <= 1}
                  className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  aria-label="Previous page"
                  title="Previous page"
                >
                  <ChevronLeftIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => changePage(1)}
                  disabled={pageNumber >= numPages}
                  className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  aria-label="Next page"
                  title="Next page"
                >
                  <ChevronRightIcon className="w-5 h-5" />
                </button>
                <span className="text-sm text-gray-600">
                  Page {pageNumber} of {numPages}
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center space-x-2 border-l border-gray-200 pl-4">
                <button
                  onClick={handleZoomOut}
                  disabled={scale <= minScale}
                  className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  aria-label="Zoom out"
                  title="Zoom out"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="text-sm text-gray-600">
                  {Math.round(scale * 100)}%
                </span>
                <button
                  onClick={handleZoomIn}
                  disabled={scale >= maxScale}
                  className="p-1 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
                  aria-label="Zoom in"
                  title="Zoom in"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Download Button */}
            {/*<button
              onClick={handleDownload}
              className="flex items-center space-x-1 px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              aria-label="Download PDF"
              title="Download PDF"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span className="text-sm">Download</span>
            </button>*/}
          </div>
        )}
      </div>
    </div>
  )
}