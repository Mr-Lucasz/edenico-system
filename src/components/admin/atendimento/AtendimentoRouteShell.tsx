'use client'

import type { ReactNode } from 'react'
import { AtendimentoMockProvider } from './AtendimentoMockContext'
import { AtendimentoToastHost } from './AtendimentoToastHost'

export function AtendimentoRouteShell({ children }: { children: ReactNode }) {
  return (
    <AtendimentoMockProvider>
      <AtendimentoToastHost />
      {children}
    </AtendimentoMockProvider>
  )
}
