import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'
import { AddressProvider } from './context/AddressContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Food Ordering App',
  description: 'Order your favorite food online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <OrderProvider>
          <AddressProvider>
            <CartProvider>
              <Navbar />
              <main className="min-h-screen bg-gray-50 pt-16">
                {children}
              </main>
            </CartProvider>
          </AddressProvider>
        </OrderProvider>
      </body>
    </html>
  )
} 