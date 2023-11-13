import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './ag-grid/ag-grid.css'
import './ag-grid/ag-theme-alpine.css'
import AuthProvider from './auth/Provider'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Music Memories',
  description: 'Enter user details to get a list of songs curated to your interests.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <AuthProvider>
        <body className={inter.className}>
          {/* <NavBar /> */}
          {children}
        </body>
      </AuthProvider>
      
    </html>
  )
}
