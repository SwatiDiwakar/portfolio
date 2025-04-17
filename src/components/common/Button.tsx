"use client"
import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import Link, { LinkProps } from 'next/link'
import { cn } from '@/utils/cn'

type ButtonVariant = 'primary' | 'accent1' | 'accent2' | 'outline';
type ButtonSize = 'sm' | 'md' | 'lg';
type ButtonType = 'button' | 'submit' | 'reset';

interface BaseButtonProps {
    variant?: ButtonVariant
    size?: ButtonSize
    fullWidth?: boolean
    icon?: ReactNode
    children: ReactNode
    className?: string
}

// Props for button element
interface ButtonProps extends
    BaseButtonProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps> {
    href?: undefined
    type?: ButtonType
}

// Props for anchor element
interface AnchorProps extends
    BaseButtonProps,
    Omit<LinkProps, keyof BaseButtonProps | 'className'>,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps | keyof BaseButtonProps> {
    href: string
}

const baseStyles = "inline-flex items-center justify-center font-display font-semibold tracking-wider transition-all duration-300"

const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg",
    accent1: "bg-accent1 text-white hover:bg-accent1-dark shadow-md hover:shadow-lg",
    accent2: "bg-accent2 text-dark hover:bg-accent2-dark shadow-md hover:shadow-lg",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-sm hover:shadow-md"
}

const sizeStyles: Record<ButtonSize, string> = {
    sm: "px-4 py-2 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg rounded-2xl"
}

const Button = ({
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    icon,
    children,
    className,
    ...props
}: ButtonProps | AnchorProps) => {
    const combinedClassName = cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        fullWidth && 'w-full',
        className
    )

    const iconElement = icon && (
        <span className="mr-2 flex items-center">{icon}</span>
    )

    if ('href' in props) {
        const { href, ...linkProps } = props as AnchorProps
        return (
            <Link
                href={href}
                className={combinedClassName}
                {...linkProps}
            >
                {iconElement}
                {children}
            </Link>
        )
    }

    const { type: buttonType = 'button' } = props as ButtonProps

    return (
        <button
            className={combinedClassName}
            type={buttonType as ButtonType}
            {...(props as ButtonProps)}
        >
            {iconElement}
            {children}
        </button>
    )
}

export default Button