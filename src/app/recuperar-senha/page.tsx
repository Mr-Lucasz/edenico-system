import type { Metadata } from 'next'
import { AuthRouteShell, RecoverPasswordWizard } from '@src/components/auth'

export const metadata: Metadata = {
  title: 'Recuperar senha | Edênicos Academy',
  description: 'Redefina sua senha com segurança.',
}

export default function RecuperarSenhaPage() {
  return (
    <AuthRouteShell>
      <RecoverPasswordWizard />
    </AuthRouteShell>
  )
}
