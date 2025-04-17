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
    const prefix = process.env.NEXT_PUBLIC_BASE_PATH || '';
    return `${prefix}${path}`
}