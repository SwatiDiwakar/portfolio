"use client"

import React, { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline'

// Import CSS files
import 'react-pdf/dist/esm/Page/TextLayer.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css'

// Use proper typing for the dynamically imported components
interface PDFViewerProps {
  pdfUrl: string
  title: string
  onClose: () => void
}

interface ReactPDFModule {
  Document: React.ComponentType<Record<string, unknown>>;
  Page: React.ComponentType<Record<string, unknown>>;
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: string;
    };
  };
}

export default function PDFViewer({ pdfUrl, title, onClose }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const [scale, setScale] = useState(1.0)
  const [maxScale] = useState(2.0)
  const [minScale] = useState(0.5)
  const [mounted, setMounted] = useState(false)
  const [pdfComponents, setPdfComponents] = useState<ReactPDFModule | null>(null)

  // Load PDF components and set up worker
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const loadPdfComponents = async () => {
      try {
        setLoading(true);
        
        // Dynamically import react-pdf
        const reactPdfModule = await import('react-pdf');
        
        // Get the base URL for the current environment
        const isGithubPages = window.location.hostname.includes('github.io');
        
        // Set the worker path with explicit handling for GitHub Pages
        const workerSrcPath = isGithubPages 
          ? '/portfolio/scripts/pdf.worker.min.js'
          : '/scripts/pdf.worker.min.js';
        
        // Set the worker path
        reactPdfModule.pdfjs.GlobalWorkerOptions.workerSrc = workerSrcPath;
        
        // Store the components for later use
        setPdfComponents(reactPdfModule as ReactPDFModule);
        
        console.log("PDF URL being loaded:", pdfUrl);
        console.log("Worker URL being used:", workerSrcPath);
      } catch (error) {
        console.error("Error loading PDF components:", error);
      }
    };
    
    loadPdfComponents();
  }, [pdfUrl]);

  // Handle window resize
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

  // Set mounted state
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle keyboard controls
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
            {(loading || !pdfComponents) && (
              <div className="flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}

            {mounted && pdfComponents && (
              <>
                {/* Using JSX element approach to avoid TypeScript errors */}
                {React.createElement(pdfComponents.Document, {
                  file: pdfUrl,
                  onLoadSuccess: onDocumentLoadSuccess,
                  loading: null,
                  error: (
                    <div className="text-center p-4 text-red-600">
                      <p className="font-medium">Failed to load PDF</p>
                      <p className="text-sm mt-1">Please try again later</p>
                    </div>
                  ),
                  children: (
                    <div className="flex justify-center">
                      <div className="flex items-center justify-center">
                        {React.createElement(pdfComponents.Page, {
                          pageNumber: pageNumber,
                          scale: scale,
                          loading: null,
                          error: (
                            <div className="text-center p-4 text-red-600">
                              Failed to load page
                            </div>
                          ),
                          className: "shadow-lg"
                        })}
                      </div>
                    </div>
                  )
                })}
              </>
            )}
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

            {/* Direct Link to PDF */}
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              aria-label="Open PDF in new tab"
              title="Open PDF in new tab"
            >
              Open PDF
            </a>
          </div>
        )}
      </div>
    </div>
  )
}