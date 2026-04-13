import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        fontFamily: 'var(--font-inter, system-ui, sans-serif)',
      }}
    >
      <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Página não encontrada</h1>
      <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>O endereço pode estar incorreto ou a página foi movida.</p>
      <Link href="/" style={{ color: '#2563eb', fontWeight: 600 }}>
        Voltar ao início
      </Link>
    </main>
  )
}
