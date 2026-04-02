import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Cycling Kit Designer',
  description: 'Design your custom cycling kit with colors and patterns',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
