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
  icons: {
    /* Vários `sizes` para o browser usar bitmap maior na aba / atalhos (mais nítido) */
    icon: [
      { url: '/arvore-logo-branco.png', sizes: '192x192', type: 'image/png' },
      { url: '/arvore-logo-branco.png', sizes: '96x96', type: 'image/png' },
      { url: '/arvore-logo-branco.png', sizes: '48x48', type: 'image/png' },
      { url: '/arvore-logo-branco.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/arvore-logo-branco.png', sizes: '180x180', type: 'image/png' }],
  },
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
