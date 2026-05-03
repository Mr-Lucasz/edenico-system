import { MeuTimeClient } from '@src/components/game/meu-time/MeuTimeClient'

type PageProps = {
  searchParams: Promise<{ tab?: string }>
}

export default async function ComunidadeSocialPage({ searchParams }: PageProps) {
  const { tab } = await searchParams
  const initialTab = tab === 'equipes' ? 'equipes' : 'amigos'
  return <MeuTimeClient initialTab={initialTab} />
}
