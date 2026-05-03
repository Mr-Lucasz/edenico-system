'use client'

import { usePathname } from 'next/navigation'
import { AdminUsuariosLayout } from '@src/components/admin/usuarios/AdminUsuariosLayout'

export function UsuariosSectionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname.startsWith('/admin/usuarios/novo')) return <>{children}</>
  return <AdminUsuariosLayout>{children}</AdminUsuariosLayout>
}
