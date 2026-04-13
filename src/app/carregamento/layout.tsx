import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'A carregar | Edênicos Academy',
  description: 'Preparando a sua experiência na Edênicos Academy.',
}

export default function CarregamentoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return children
}
