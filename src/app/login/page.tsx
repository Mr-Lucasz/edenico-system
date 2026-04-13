import type { Metadata } from 'next'
import { AuthRouteShell, LoginForm } from '@src/components/auth'

export const metadata: Metadata = {
  title: 'Entrar | Edênicos Academy',
  description: 'Acesse sua conta na Edênicos Academy.',
}

export default function LoginPage() {
  return (
    <AuthRouteShell>
      <LoginForm />
    </AuthRouteShell>
  )
}
