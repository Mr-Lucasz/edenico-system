import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-edenicos-navy px-4">
      <h1 className="text-2xl font-bold text-white">Entrar</h1>
      <p className="mt-2 text-white/70">Página de login (a implementar).</p>
      <Link
        href="/"
        className="mt-6 text-edenicos-yellow hover:underline"
      >
        Voltar à home
      </Link>
    </div>
  )
}
