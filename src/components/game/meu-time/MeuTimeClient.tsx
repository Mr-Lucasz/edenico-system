'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FiArrowLeft,
  FiAward,
  FiMessageCircle,
  FiSearch,
  FiShield,
  FiUser,
  FiUserMinus,
  FiUserPlus,
  FiLogOut,
} from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa6'
import { cn } from '@src/utils/cn'
import { BuscarTimeModal } from './BuscarTimeModal'
import {
  friendChatMessages,
  SocialChatModal,
  TEAM_CHAT_MESSAGES,
  type SocialChatMessage,
} from './SocialChatModal'
import styles from './MeuTimeClient.module.scss'

const TEAM_NAME = 'Guardiões do Éden'

export type TabId = 'amigos' | 'equipes'

export type MeuTimeClientProps = {
  readonly initialTab: TabId
}

type FriendRow = {
  id: string
  name: string
  level: number
  trophies: number
  online: boolean
  lastSeen?: string
}

const FRIENDS: FriendRow[] = [
  { id: '1', name: 'Pedro L.', level: 51, trophies: 1489, online: true },
  { id: '2', name: 'Ana C.', level: 49, trophies: 1420, online: false, lastSeen: 'Visto 2h atrás' },
  { id: '3', name: 'Miguel S.', level: 46, trophies: 1320, online: true },
  { id: '4', name: 'Carla T.', level: 44, trophies: 1250, online: false, lastSeen: 'Visto 1d atrás' },
  { id: '5', name: 'João R.', level: 42, trophies: 1180, online: true },
]

type TeamMember = FriendRow & { leader?: boolean }

const TEAM_MEMBERS: TeamMember[] = [
  { id: 's1', name: 'Sofia M.', level: 52, trophies: 1520, online: true, leader: true },
  { id: 's2', name: 'Pedro L.', level: 51, trophies: 1489, online: true },
  { id: 's3', name: 'Ana C.', level: 49, trophies: 1420, online: false, lastSeen: 'Visto 2h atrás' },
  { id: 's4', name: 'Miguel S.', level: 46, trophies: 1320, online: true },
  { id: 's5', name: 'João R.', level: 42, trophies: 1180, online: false, lastSeen: 'Visto 30 min atrás' },
]

const TEAM_DESC =
  'Unidos pela natureza e pelo propósito de proteger o Éden digital. Cada missão fortalece o nosso vínculo e acelera o impacto positivo na comunidade.'

export function MeuTimeClient({ initialTab }: MeuTimeClientProps) {
  const router = useRouter()
  const [tab, setTab] = useState<TabId>(initialTab)
  const [teamChatOpen, setTeamChatOpen] = useState(false)
  const [buscarOpen, setBuscarOpen] = useState(false)
  const [friendChat, setFriendChat] = useState<FriendRow | null>(null)

  const chatOpen = teamChatOpen || friendChat !== null
  const chatTitle = teamChatOpen
    ? `Chat do Time - ${TEAM_NAME}`
    : friendChat
      ? `Chat com ${friendChat.name}`
      : ''

  const chatMessages = useMemo(() => {
    if (teamChatOpen) return TEAM_CHAT_MESSAGES
    if (friendChat) return friendChatMessages(friendChat.name)
    return [] as readonly SocialChatMessage[]
  }, [teamChatOpen, friendChat])

  useEffect(() => {
    setTab(initialTab)
  }, [initialTab])

  const closeChat = () => {
    setTeamChatOpen(false)
    setFriendChat(null)
  }

  const openTeamChat = () => {
    setBuscarOpen(false)
    setFriendChat(null)
    setTeamChatOpen(true)
  }

  const openBuscar = () => {
    setTeamChatOpen(false)
    setFriendChat(null)
    setBuscarOpen(true)
  }

  const openFriendChat = (f: FriendRow) => {
    setTeamChatOpen(false)
    setBuscarOpen(false)
    setFriendChat(f)
  }

  const selectTab = (next: TabId) => {
    closeChat()
    setBuscarOpen(false)
    setTab(next)
    if (next === 'amigos') {
      router.push('/comunidade/social', { scroll: false })
    } else {
      router.push('/comunidade/social?tab=equipes', { scroll: false })
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link href="/comunidade" className={styles.backLink}>
          <FiArrowLeft aria-hidden />
          Voltar
        </Link>
      </div>

      <h1 className={styles.pageTitle}>Meu Time</h1>

      <div className={styles.tabList} role="tablist" aria-label="Meu Time">
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'amigos'}
          className={cn(styles.tabBtn, tab === 'amigos' && styles.tabBtnActive)}
          onClick={() => selectTab('amigos')}
        >
          {tab === 'amigos' ? (
            <FiUser style={{ width: '1rem', height: '1rem' }} aria-hidden />
          ) : (
            <FiUserPlus style={{ width: '1rem', height: '1rem' }} aria-hidden />
          )}
          Amigos
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === 'equipes'}
          className={cn(styles.tabBtn, tab === 'equipes' && styles.tabBtnActive)}
          onClick={() => selectTab('equipes')}
        >
          <FiShield style={{ width: '1rem', height: '1rem' }} aria-hidden />
          Equipes
        </button>
      </div>

      {tab === 'amigos' ? (
        <>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Amigos</h2>
            <div className={styles.sectionActions}>
              <span className={styles.countBadge}>{FRIENDS.length} amigos</span>
              <button type="button" className={styles.btnAdd}>
                + Adicionar
              </button>
            </div>
          </div>

          <div className={styles.grid}>
            {FRIENDS.map((f) => (
              <article key={f.id} className={styles.card}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatar}>
                    <FiUser style={{ width: '1.35rem', height: '1.35rem' }} aria-hidden />
                  </div>
                  <span
                    className={cn(styles.statusDot, f.online ? styles.statusOnline : styles.statusOffline)}
                    title={f.online ? 'Online' : 'Offline'}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{f.name}</h3>
                  <p className={styles.cardMeta}>Nível {f.level}</p>
                  <div className={styles.trophyRow}>
                    <FiAward className={styles.trophyIcon} style={{ width: '0.9375rem', height: '0.9375rem' }} aria-hidden />
                    {f.trophies.toLocaleString('pt-BR')}
                  </div>
                  {!f.online && f.lastSeen ? <p className={styles.lastSeen}>{f.lastSeen}</p> : null}
                </div>
                <div className={styles.cardActions}>
                  <button
                    type="button"
                    className={cn(styles.iconBtn, styles.iconBtnChat)}
                    aria-label={`Conversar com ${f.name}`}
                    onClick={() => openFriendChat(f)}
                  >
                    <FiMessageCircle style={{ width: '1rem', height: '1rem' }} aria-hidden />
                  </button>
                  <button type="button" className={cn(styles.iconBtn, styles.iconBtnRemove)} aria-label={`Remover ${f.name}`}>
                    <FiUserMinus style={{ width: '1rem', height: '1rem' }} aria-hidden />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className={styles.teamToolbar}>
            <button type="button" className={styles.btnOutline} onClick={openTeamChat}>
              <FiMessageCircle style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Chat do Time
            </button>
            <button type="button" className={styles.btnOutline} onClick={openBuscar}>
              <FiSearch style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Buscar Time
            </button>
          </div>

          <section className={styles.banner} aria-labelledby="equipe-nome">
            <span className={styles.rankBadge}>#3º Lugar</span>
            <div className={styles.bannerInner}>
              <div className={styles.bannerAvatar} role="img" aria-label="Emblema do time: floresta estilizada" />
              <div className={styles.bannerText}>
                <h2 id="equipe-nome" className={styles.bannerName}>
                  {TEAM_NAME}
                </h2>
                <p className={styles.bannerDesc}>{TEAM_DESC}</p>
                <div className={styles.statsRow}>
                  <div className={styles.statBox}>
                    <p className={styles.statBoxLabel}>Membros</p>
                    <p className={styles.statBoxValue}>5/20</p>
                  </div>
                  <div className={styles.statBox}>
                    <p className={styles.statBoxLabel}>Total de Copas</p>
                    <p className={styles.statBoxValue}>
                      <FiAward style={{ width: '0.875rem', height: '0.875rem', color: '#ffc107' }} aria-hidden />
                      5.816
                    </p>
                  </div>
                  <div className={styles.statBox}>
                    <p className={styles.statBoxLabel}>Status</p>
                    <p className={styles.statBoxValue}>Público</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.bannerFooter}>
              <button type="button" className={styles.btnLeave}>
                <FiLogOut style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                Sair do Time
              </button>
            </div>
          </section>

          <h2 className={styles.membersTitle}>Membros do Time</h2>
          <div className={styles.grid}>
            {TEAM_MEMBERS.map((m) => (
              <article key={m.id} className={cn(styles.card, styles.cardTeam)}>
                <div className={styles.avatarWrap}>
                  <div className={styles.avatar}>
                    <FiUser style={{ width: '1.35rem', height: '1.35rem' }} aria-hidden />
                  </div>
                  <span
                    className={cn(styles.statusDot, m.online ? styles.statusOnline : styles.statusOffline)}
                    title={m.online ? 'Online' : 'Offline'}
                  />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{m.name}</h3>
                  <p className={styles.cardMeta}>Nível {m.level}</p>
                  <div className={styles.trophyRow}>
                    <FiAward className={styles.trophyIcon} style={{ width: '0.9375rem', height: '0.9375rem' }} aria-hidden />
                    {m.trophies.toLocaleString('pt-BR')}
                  </div>
                  {m.leader ? (
                    <span className={styles.leaderBadge}>
                      <FaCrown style={{ width: '0.625rem', height: '0.625rem' }} aria-hidden />
                      Líder
                    </span>
                  ) : null}
                  {!m.online && m.lastSeen ? <p className={styles.lastSeen}>{m.lastSeen}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {chatOpen ? (
        <SocialChatModal
          key={teamChatOpen ? 'chat-team' : `chat-friend-${friendChat?.id ?? ''}`}
          open
          onClose={closeChat}
          title={chatTitle}
          messages={chatMessages}
        />
      ) : null}

      <BuscarTimeModal open={buscarOpen} onClose={() => setBuscarOpen(false)} />
    </div>
  )
}
