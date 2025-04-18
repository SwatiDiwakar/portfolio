"use client"

import { useEffect, useState } from 'react'
import { getImagePath } from '@/utils/helpers'

// This component is just for debugging and should be added temporarily to a visible part of your app
export default function PathDebugger() {
  const [environment, setEnvironment] = useState('Checking...')
  const [examplePaths, setExamplePaths] = useState<{original: string, processed: string}[]>([])
  
  useEffect(() => {
    // Check environment
    const isGithubPages = typeof window !== 'undefined' 
      ? window.location.hostname.includes('github.io') 
      : false
    
    setEnvironment(isGithubPages ? 'GitHub Pages' : 'Local Development')
    
    // Test some paths
    const testPaths = [
      '/assets/documents/Branding.pdf',
      'assets/documents/Branding.pdf',
      '/scripts/pdf.worker.min.js',
      'scripts/pdf.worker.min.js'
    ]
    
    const processedPaths = testPaths.map(path => ({
      original: path,
      processed: getImagePath(path)
    }))
    
    setExamplePaths(processedPaths)
  }, [])
  
  return (
    <div className="bg-white p-4 border border-gray-300 rounded-md text-left text-sm">
      <h3 className="font-bold mb-2">Path Debugger</h3>
      <p><strong>Environment:</strong> {environment}</p>
      <p><strong>Hostname:</strong> {typeof window !== 'undefined' ? window.location.hostname : 'SSR'}</p>
      <p><strong>Path Examples:</strong></p>
      <ul className="mt-2 space-y-1">
        {examplePaths.map((path, index) => (
          <li key={index}>
            <code className="bg-gray-100 p-1 rounded">{path.original}</code> → 
            <code className="bg-gray-100 p-1 rounded ml-2">{path.processed}</code>
          </li>
        ))}
      </ul>
    </div>
  )
}