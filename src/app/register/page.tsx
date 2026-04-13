import type { Metadata } from 'next'
import { AuthRouteShell, RegisterForm } from '@src/components/auth'

export const metadata: Metadata = {
  title: 'Cadastrar-se | Edênicos Academy',
  description: 'Crie sua conta na Edênicos Academy.',
}

export default function RegisterPage() {
  return (
    <AuthRouteShell>
      <RegisterForm />
    </AuthRouteShell>
  )
}
