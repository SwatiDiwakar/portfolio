import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

interface SectionTitleProps {
    children: ReactNode
    subtitle?: string
    centered?: boolean
    light?: boolean
    className?: string
    underline?: boolean
}

export default function SectionTitle({
    children,
    subtitle,
    centered = true,
    light = false,
    className,
    underline = true
}: SectionTitleProps) {
    return (
        <div className={cn(
            "mb-12 md:mb-16",
            centered && "text-center",
            className
        )}>
            <h2 className={cn(
                "text-3xl md:text-4xl font-bold",
                light ? "text-white" : "text-dark",
                "relative inline-block"
            )}>
                {children}

                {underline && (
                    <motion.span
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className={cn(
                            "absolute left-0 -bottom-4 h-0.5",
                            light ? "bg-white" : "bg-primary"
                        )}
                    />
                )}
            </h2>

            {subtitle && (
                <p className={cn(
                    "mt-6 text-lg",
                    light ? "text-white/80" : "text-dark-lighter"
                )}>
                    {subtitle}
                </p>
            )}
        </div>
    )
}