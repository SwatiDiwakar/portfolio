"use client"
import Button from '../common/Button'

export default function Header() {
    return (
        <header className="pt-24 pb-12 bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-dark">
                        <span className="block">S<span className="text-primary">wa</span>ti</span>
                        <span className="block">Di<span className="text-secondary">wa</span>kar</span>
                    </h1>
                    <p className="mt-4 text-lg sm:text-xl text-dark-lighter">
                        Vision to Reality: Innovating Products, Services, & Growth
                    </p>
                    <div className="mt-8">
                        <Button href="#contact">Let&apos;s Connect</Button>
                    </div>
                </div>
            </div>
        </header>
    )
}