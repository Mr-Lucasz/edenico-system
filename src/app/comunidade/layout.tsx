import type { ReactNode } from 'react'
import { AcademyGameShell } from '@src/components/game/AcademyGameShell'

export default function ComunidadeLayout({ children }: { children: ReactNode }) {
  return <AcademyGameShell>{children}</AcademyGameShell>
}
