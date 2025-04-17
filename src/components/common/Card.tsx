"use client"
import { ReactNode } from 'react'
import { cn } from '@/utils/cn'

interface CardProps {
    className?: string
    children: ReactNode
    hoverable?: boolean
    padded?: boolean
}

export default function Card({
    className,
    children,
    hoverable = true,
    padded = true
}: CardProps) {
    return (
        <div className={cn(
            "bg-white shadow-soft",
            hoverable && "transition-shadow duration-300 hover:shadow-medium",
            padded && "p-6 md:p-8",
            className
        )}>
            {children}
        </div>
    )
}

interface CardHeaderProps {
    className?: string
    children: ReactNode
}

Card.Header = function CardHeader({ className, children }: CardHeaderProps) {
    return (
        <div className={cn("mb-6", className)}>
            {children}
        </div>
    )
}

Card.Body = function CardBody({ className, children }: CardHeaderProps) {
    return (
        <div className={cn("space-y-4", className)}>
            {children}
        </div>
    )
}

Card.Footer = function CardFooter({ className, children }: CardHeaderProps) {
    return (
        <div className={cn("mt-6", className)}>
            {children}
        </div>
    )
}