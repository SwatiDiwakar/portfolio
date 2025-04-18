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
    const isGithubPages = typeof window !== 'undefined' 
        ? window.location.hostname.includes('github.io') 
        : process.env.GITHUB_PAGES === 'true'
    
    const prefix = isGithubPages ? '/portfolio' : ''
    
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    
    return `${prefix}${normalizedPath}`
}