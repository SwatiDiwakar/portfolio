import { Montserrat, Fira_Sans } from 'next/font/google'
import Navbar from '@/components/layout/NavBar'
import Footer from '@/components/layout/Footer'
import PreLoader from '@/components/common/PreLoader'
import ScrollToTop from '@/components/common/ScrollToTop'
import { metadata } from './metadata'
import { viewport } from './viewport'
import '@/styles/globals.css'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

const firaSans = Fira_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fira-sans',
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
      className={`${montserrat.variable} ${firaSans.variable}`}
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