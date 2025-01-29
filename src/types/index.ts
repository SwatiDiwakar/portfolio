export interface NavItem {
    name: string
    href: string
}

export interface SocialLink {
    platform: string
    url: string
    icon: string
}

export interface ServiceItem {
    title: string
    description: string
    icon: string
}

export interface PortfolioItem {
    id: string
    title: string
    description: string
    image: string
    category: string
    link?: string
}

export interface TestimonialItem {
    id: string
    content: string
    author: string
    role: string
    company: string
    image?: string
}

export interface ContactForm {
    name: string
    email: string
    subject: string
    message: string
}