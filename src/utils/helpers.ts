export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(date)
}

export function validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
}

export function getImagePath(path: string): string {
    // Check if we're in GitHub Pages environment
    const isGithubPages = typeof window !== 'undefined' 
        ? window.location.hostname.includes('github.io') 
        : process.env.GITHUB_PAGES === 'true'
    
    // Strip any leading slash for consistency
    const cleanPath = path.startsWith('/') ? path.substring(1) : path
    
    // For GitHub Pages, ensure the path starts with /portfolio/
    if (isGithubPages) {
        // If the path already includes portfolio, don't add it again
        if (cleanPath.startsWith('portfolio/')) {
            return `/${cleanPath}`
        } else {
            return `/portfolio/${cleanPath}`
        }
    } else {
        // For local development
        return `/${cleanPath}`
    }
}