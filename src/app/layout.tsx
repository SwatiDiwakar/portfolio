import { Roboto_Flex, Playfair_Display, Josefin_Sans } from 'next/font/google'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PreLoader from '@/components/common/PreLoader'
import ScrollToTop from '@/components/common/ScrollToTop'
import { metadata } from './metadata'
import { viewport } from './viewport'
import '@/styles/globals.css'

const robotoFlex = Roboto_Flex({
  subsets: ['latin'],
  variable: '--font-roboto-flex',
  display: 'swap',
})

/* const grandstander = Grandstander({
  subsets: ['latin'],
  variable: '--font-grandstander',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
}) */

const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-grandstander',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
})

export { metadata, viewport }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${robotoFlex.variable} ${josefinSans.variable} ${playfairDisplay.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <PreLoader />
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  )
}