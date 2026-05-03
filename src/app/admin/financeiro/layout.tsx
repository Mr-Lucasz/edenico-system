import { AdminFinanceiroLayout } from '@src/components/admin/financeiro/AdminFinanceiroLayout'

export default function AdminFinanceiroLayoutRoute({
  children,
}: {
  children: React.ReactNode
}) {
  return <AdminFinanceiroLayout>{children}</AdminFinanceiroLayout>
}
