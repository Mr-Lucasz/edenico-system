import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@src/styles/globals.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Edênicos Academy - Educação gamificada e integral',
  description: 'Transforme seu aprendizado com a metodologia Edênicos. Educação gamificada nos 5 pilares: físico, mental, espiritual, social e profissional.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>{children}</body>
    </html>
  )
}
