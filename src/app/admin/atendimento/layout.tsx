import { AtendimentoRouteShell } from '@src/components/admin/atendimento/AtendimentoRouteShell'

export default function AtendimentoLayout({ children }: { children: React.ReactNode }) {
  return <AtendimentoRouteShell>{children}</AtendimentoRouteShell>
}
