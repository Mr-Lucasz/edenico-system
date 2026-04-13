import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Inter, Montserrat } from 'next/font/google'
import { NavigationProgress } from '@src/components/navigation/NavigationProgress'
import '@src/styles/globals.scss'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
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
      <body className={`${inter.variable} ${montserrat.variable}`}>
        <Suspense fallback={null}>
          <NavigationProgress />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
