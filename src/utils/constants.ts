import { NavItem, SocialLink } from "@/types"

export const SITE_CONFIG = {
    name: 'Swati Diwakar',
    title: 'Innovating Excellence: Design. Strategy. Leadership.',
    description: 'Portfolio showcasing innovative products, services, and growth strategies.',
    image: '/images/og-image.jpg',
    url: 'https://swatidiwakar.com'
}

export const NAV_ITEMS: NavItem[] = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
]

export const SOCIAL_LINKS: SocialLink[] = [
    {
        platform: 'LinkedIn',
        url: 'https://www.linkedin.com/in/swati-diwakar',
        icon: 'linkedin'
    },
    {
        platform: 'Instagram',
        url: 'https://www.instagram.com/swatidwalker',
        icon: 'instagram'
    }
]