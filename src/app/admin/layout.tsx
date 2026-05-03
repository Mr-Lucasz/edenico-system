import { AdminLayoutShell } from '@src/components/admin/AdminLayoutShell'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>
}
