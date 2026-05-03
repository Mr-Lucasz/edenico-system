'use client'

import { useEffect, useState } from 'react'
import {
  FiAlertTriangle,
  FiAward,
  FiBookOpen,
  FiCamera,
  FiChevronDown,
  FiClock,
  FiCreditCard,
  FiDownload,
  FiEdit2,
  FiFolder,
  FiGlobe,
  FiHelpCircle,
  FiMail,
  FiMessageCircle,
  FiPhone,
  FiPlus,
  FiRefreshCw,
  FiSettings,
  FiShield,
  FiStar,
  FiTrash2,
  FiUser,
  FiZap,
} from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa6'
import { IoHeadset, IoRocket, IoTicket } from 'react-icons/io5'
import { cn } from '@src/utils/cn'
import { PerfilModals, type PerfilModalId, type SupportTopicPreset } from '@src/components/profile/PerfilModals'
import styles from './MeuPerfilClient.module.scss'

const BILLING_ROWS = [
  { id: '1', title: 'Plano Premium — Setembro 2025', sub: '15 set. 2025 • Visa ****4532', amount: 'R$ 47,84' },
  { id: '2', title: 'Plano Premium — Agosto 2025', sub: '15 ago. 2025 • Visa ****4532', amount: 'R$ 47,84' },
  { id: '3', title: 'Plano Premium — Julho 2025', sub: '15 jul. 2025 • Visa ****4532', amount: 'R$ 47,84' },
]

const NOTIF_DEFAULT = {
  email: true,
  site: true,
  newsletter: false,
  comunidade: true,
  lembretes: true,
} as const

type NotifId = keyof typeof NOTIF_DEFAULT

const NOTIF_ROWS: readonly { id: NotifId; title: string; desc: string }[] = [
  {
    id: 'email',
    title: 'Notificações por E-mail',
    desc: 'Receba resumos e alertas importantes no seu email.',
  },
  {
    id: 'site',
    title: 'Notificações no site',
    desc: 'Avisos enquanto navega na plataforma.',
  },
  {
    id: 'newsletter',
    title: 'Newsletter Semanal',
    desc: 'Resumo das novidades e dicas de estudo.',
  },
  {
    id: 'comunidade',
    title: 'Atualizações da Comunidade',
    desc: 'Novidades do fórum, desafios e eventos.',
  },
  {
    id: 'lembretes',
    title: 'Lembretes de Estudo',
    desc: 'Lembretes para manter a rotina de aprendizagem.',
  },
]

export function MeuPerfilClient() {
  const [planOpen, setPlanOpen] = useState(true)
  const [billingOpen, setBillingOpen] = useState(true)
  const [supportOpen, setSupportOpen] = useState(true)
  const [modal, setModal] = useState<PerfilModalId | null>(null)
  const [supportPreset, setSupportPreset] = useState<SupportTopicPreset>(null)
  const [notif, setNotif] = useState<Record<NotifId, boolean>>({ ...NOTIF_DEFAULT })
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(t)
  }, [toast])

  const closeModal = () => {
    setModal(null)
    setSupportPreset(null)
  }

  const openSupport = (preset?: SupportTopicPreset) => {
    setSupportPreset(preset ?? null)
    setModal('support')
  }

  const toggleNotif = (id: NotifId) => {
    setNotif((s) => ({ ...s, [id]: !s[id] }))
  }

  return (
    <div className={styles.root}>
      <PerfilModals active={modal} supportTopicPreset={supportPreset} onClose={closeModal} />
      {toast ? <div className={styles.toast}>{toast}</div> : null}

      <header className={styles.pageHeader}>
        <div className={styles.titles}>
          <h1 className={styles.pageTitle}>Meu Perfil</h1>
          <p className={styles.pageSubtitle}>Veja suas informações e conquistas!</p>
        </div>
        <div className={styles.actions}>
          <button type="button" className={styles.btnPurple} onClick={() => setModal('plans')}>
            <IoTicket style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Meus Planos
          </button>
          <button type="button" className={styles.btnBlue} onClick={() => openSupport()}>
            <IoHeadset style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Suporte
          </button>
          <button type="button" className={styles.btnOutlineBlue} onClick={() => setModal('editProfile')}>
            <FiEdit2 style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Editar Perfil
          </button>
          <button type="button" className={styles.btnBlue} onClick={() => setModal('settings')}>
            <FiSettings style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Configurações
          </button>
        </div>
      </header>

      <div className={styles.layout}>
        <aside className={styles.sidebarCard}>
          <div className={styles.avatarZone}>
            <button type="button" className={styles.gearBtn} onClick={() => setModal('settings')} aria-label="Definições">
              <FiSettings style={{ width: '1rem', height: '1rem' }} />
            </button>
            <div className={styles.avatarWrap}>
              <div className={styles.avatarLarge} aria-hidden>
                SM
              </div>
              <span className={styles.cameraBadge} aria-hidden>
                <FiCamera style={{ width: '0.875rem', height: '0.875rem' }} />
              </span>
            </div>
            <h2 className={styles.profileName}>Sofia Mendes</h2>
            <p className={styles.profileAge}>12 anos</p>
            <span className={styles.rankBadge}>🏆 Explorador Ouro</span>
            <button type="button" className={styles.btnPublic} onClick={() => setModal('publicProfile')}>
              Ver Perfil Público
            </button>
            <p className={styles.joined}>Cadastrada desde 14 de jan. de 2024</p>
          </div>

          <div className={styles.xpDarkCard}>
            <div className={styles.xpDarkHead}>
              <span className={styles.xpDarkLevel}>Experiência 28</span>
              <span className={styles.xpDarkValues}>4850 / 5000 XP</span>
            </div>
            <div className={styles.progressTrackLight}>
              <div className={styles.progressFillLight} />
            </div>
            <div className={styles.xpHintBox}>
              <FiZap style={{ width: '1rem', height: '1rem', flexShrink: 0 }} aria-hidden />
              <span>Faltam apenas 150 XP para o próximo nível!</span>
            </div>
          </div>

          <p className={styles.badgesTitle}>Minhas Badges</p>
          <div className={styles.badgesRow}>
            <span className={cn(styles.badgeCircle, styles.badgeCircleMuted)} aria-hidden>
              <FaCrown style={{ width: '1rem', height: '1rem' }} />
            </span>
            <span className={styles.badgeCircle} aria-hidden>
              <FiStar style={{ width: '1rem', height: '1rem' }} />
            </span>
            <span className={cn(styles.badgeCircle, styles.badgeCircleMuted)} aria-hidden>
              <FiAward style={{ width: '1rem', height: '1rem' }} />
            </span>
            <span className={cn(styles.badgeCircle, styles.badgeCircleMuted)} aria-hidden>
              <FiStar style={{ width: '1rem', height: '1rem' }} />
            </span>
          </div>

          <div className={styles.quickStats}>
            <div className={styles.statPillGreen}>
              <span className={styles.statPillValue}>12</span>
              <span className={styles.statPillLabel}>Níveis</span>
            </div>
            <div className={styles.statPillPurple}>
              <span className={styles.statPillValue}>25</span>
              <span className={styles.statPillLabel}>Conquistas</span>
            </div>
          </div>

          <div className={styles.darkCards}>
            <div className={styles.darkCard}>
              <div className={styles.darkCardIcon}>
                <FiClock style={{ width: '1.125rem', height: '1.125rem', color: '#60a5fa' }} aria-hidden />
              </div>
              <div className={styles.darkCardBody}>
                <span className={styles.darkCardLabel}>Tempo Total</span>
                <span className={styles.darkCardValue}>51d 23h</span>
              </div>
            </div>
            <div className={styles.darkCard}>
              <div className={styles.darkCardIcon}>
                <FiFolder style={{ width: '1.125rem', height: '1.125rem', color: '#34d399' }} aria-hidden />
              </div>
              <div className={styles.darkCardBody}>
                <span className={styles.darkCardLabel}>Níveis Completos</span>
                <span className={styles.darkCardValue}>25 / 80</span>
                <div className={styles.miniBar}>
                  <div className={styles.miniBarFill} />
                </div>
              </div>
            </div>
            <div className={styles.darkCard}>
              <div className={styles.darkCardIcon}>
                <FiAward style={{ width: '1.125rem', height: '1.125rem', color: '#fb923c' }} aria-hidden />
              </div>
              <div className={styles.darkCardBody}>
                <span className={styles.darkCardLabel}>Ranking</span>
                <span className={styles.darkCardValue}>#10</span>
                <span className={styles.badgeEvol}>Evoluindo</span>
              </div>
            </div>
          </div>
        </aside>

        <div className={styles.mainCol}>
          <article className={cn(styles.infoCard, styles.infoCardAccount)}>
            <div className={styles.cardHeaderYellow}>
              <FiUser style={{ width: '1.25rem', height: '1.25rem', color: '#a16207' }} aria-hidden />
              <div>
                <h2 className={cn(styles.cardHeaderTitle, styles.titleAccount)}>Informações da Conta</h2>
                <p className={styles.cardHeaderSub}>Preferências de notificação e comunicação.</p>
              </div>
            </div>
            <div className={styles.toggleList}>
              {NOTIF_ROWS.map((row) => (
                <div key={row.id} className={styles.toggleRow}>
                  <div className={styles.toggleTexts}>
                    <p className={styles.toggleTitle}>{row.title}</p>
                    <p className={styles.toggleDesc}>{row.desc}</p>
                  </div>
                  <button
                    type="button"
                    className={cn(styles.toggleSwitch, notif[row.id] && styles.toggleSwitchOn)}
                    role="switch"
                    aria-checked={notif[row.id]}
                    onClick={() => toggleNotif(row.id)}
                  >
                    <span className={styles.toggleKnob} />
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className={cn(styles.infoCard, styles.infoCardPrivacy)}>
            <div className={styles.cardHeaderPrivacy}>
              <FiShield style={{ width: '1.25rem', height: '1.25rem', color: '#b91c1c' }} aria-hidden />
              <div>
                <h2 className={cn(styles.cardHeaderTitle, styles.titlePrivacy)}>Privacidade e Segurança</h2>
                <p className={styles.cardHeaderSub}>Configurações sensíveis (pode ser necessário o responsável).</p>
              </div>
            </div>
            <div className={styles.privacyList}>
              <button type="button" className={styles.privacyRow} onClick={() => setModal('changePassword')}>
                <span className={styles.privacyRowIcon}>
                  <FiShield style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                </span>
                <span className={styles.privacyRowText}>Alterar Senha (Responsável / estudante)</span>
              </button>
              <button type="button" className={styles.privacyRow} onClick={() => setModal('verifyEmail')}>
                <span className={styles.privacyRowIcon}>
                  <FiMail style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                </span>
                <span className={styles.privacyRowText}>Verificar E-mail do Responsável</span>
              </button>
              <button type="button" className={styles.privacyRow} onClick={() => setModal('privacy')}>
                <span className={styles.privacyRowIcon}>
                  <FiGlobe style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                </span>
                <span className={styles.privacyRowText}>Configurações de Privacidade</span>
              </button>
            </div>
          </article>
        </div>
      </div>

      <section className={cn(styles.section, styles.sectionPlan)} aria-labelledby="sec-plano">
        <button type="button" className={styles.sectionHeader} onClick={() => setPlanOpen((v) => !v)} id="sec-plano">
          <div className={styles.sectionHeaderLeft}>
            <FiCreditCard style={{ width: '1.25rem', height: '1.25rem', color: '#7c3aed' }} aria-hidden />
            <div>
              <h2 className={styles.sectionTitle}>Meu Plano</h2>
              <p className={styles.sectionDesc}>Gerencie sua assinatura, métodos de pagamento e histórico</p>
            </div>
          </div>
          <FiChevronDown className={cn(styles.chevron, planOpen && styles.chevronOpen)} aria-hidden />
        </button>
        <div className={cn(styles.sectionBody, !planOpen && styles.sectionBodyHidden)}>
          <p className={styles.planoAtualLabel}>
            <FiCreditCard style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
            Plano Atual
          </p>
          <div className={styles.planoAtualCard}>
            <div className={styles.planoIconBox} aria-hidden>
              <FiStar style={{ width: '1.5rem', height: '1.5rem' }} />
            </div>
            <div className={styles.planoAtualMeta}>
              <p className={styles.planoName}>Plano Premium</p>
              <p className={styles.planoStatus}>
                Status: <span className={styles.statusOk}>Ativo</span>
              </p>
              <p className={styles.planoStatus}>Próxima cobrança: 15 de set. de 2025</p>
            </div>
            <div className={styles.planoPriceBlock}>
              <p className={styles.planoPrice}>R$ 47,84</p>
              <p className={styles.planoPriceUnit}>por mês</p>
            </div>
          </div>

          <div className={styles.alterarHead}>
            <h3 className={styles.alterarTitle}>
              <FiRefreshCw style={{ width: '1rem', height: '1rem' }} aria-hidden />
              Alterar Plano
            </h3>
            <button type="button" className={styles.btnVerPlanos} onClick={() => setModal('plans')}>
              <FaCrown style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              Ver Planos
            </button>
          </div>
          <div className={styles.planGrid}>
            <div className={styles.planTier}>
              <div className={styles.planTierIcon}>
                <FiShield style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <p className={styles.planTierName}>Básico</p>
              <p className={styles.planTierPrice}>Grátis</p>
              <p className={styles.planTierMeta}>4 recursos incluídos</p>
              <button type="button" className={styles.planBtnDisabled} disabled>
                Assinado
              </button>
            </div>
            <div className={cn(styles.planTier, styles.planTierCurrent)}>
              <p className={styles.planCurrentLabel}>Plano Atual</p>
              <div className={styles.planTierIcon} style={{ color: '#8b5cf6' }}>
                <FiStar style={{ width: '1.25rem', height: '1.25rem' }} />
              </div>
              <p className={styles.planTierName}>Premium</p>
              <p className={styles.planTierPrice}>R$ 47,84</p>
              <p className={styles.planTierMeta}>8 recursos incluídos</p>
            </div>
            <div className={styles.planTier}>
              <div className={styles.planTierIcon} style={{ color: '#f59e0b' }}>
                <FaCrown style={{ width: '1.125rem', height: '1.125rem' }} />
              </div>
              <p className={styles.planTierName}>Premium Plus</p>
              <p className={styles.planTierPrice}>R$ 79,92</p>
              <p className={styles.planTierMeta}>7 recursos incluídos</p>
              <button type="button" className={styles.planBtnGhost} onClick={() => setModal('plans')}>
                <FiPlus style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                Upgrade
              </button>
            </div>
          </div>

          <div className={styles.payHeader}>
            <h3 className={styles.payTitle}>
              <FiCreditCard style={{ width: '1rem', height: '1rem' }} aria-hidden />
              Métodos de Pagamento
            </h3>
            <button type="button" className={styles.btnAdd} onClick={() => setModal('addCard')}>
              + Adicionar
            </button>
          </div>
          <div className={styles.payCard}>
            <div className={styles.payLeft}>
              <span className={styles.visaIcon} aria-hidden>
                VISA
              </span>
              <div className={styles.payLines}>
                <p className={styles.payLine1}>Visa ****4532</p>
                <p className={styles.payLine2}>Válido até 12/27</p>
              </div>
            </div>
            <span className={styles.badgePadrao}>✓ Padrão</span>
          </div>
        </div>

        <button
          type="button"
          className={cn(styles.sectionHeader, styles.billingToggle)}
          onClick={() => setBillingOpen((v) => !v)}
          aria-expanded={billingOpen}
        >
          <div className={styles.sectionHeaderLeft}>
            <FiClock style={{ width: '1.25rem', height: '1.25rem', color: '#7c3aed' }} aria-hidden />
            <div>
              <h2 className={styles.sectionTitle}>Histórico de Facturação</h2>
              <p className={styles.sectionDesc}>Faturas e comprovativos dos últimos meses</p>
            </div>
          </div>
          <FiChevronDown className={cn(styles.chevron, billingOpen && styles.chevronOpen)} aria-hidden />
        </button>
        <div className={cn(styles.sectionBody, styles.sectionBodyFlush, !billingOpen && styles.sectionBodyHidden)}>
          {BILLING_ROWS.map((row) => (
            <div key={row.id} className={styles.billRow}>
              <FiCreditCard className={styles.billIcon} style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
              <div className={styles.billMid}>
                <p className={styles.billTitle}>{row.title}</p>
                <p className={styles.billSub}>{row.sub}</p>
              </div>
              <div className={styles.billRight}>
                <p className={styles.billAmt}>{row.amount}</p>
                <p className={styles.billPaid}>Pago</p>
              </div>
              <button
                type="button"
                className={styles.iconDownload}
                aria-label={`Descarregar fatura ${row.id}`}
                onClick={() => setToast(`Download da fatura ${row.id} (simulação).`)}
              >
                <FiDownload style={{ width: '1rem', height: '1rem' }} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.dangerZone}>
          <h3 className={styles.dangerTitle}>
            <FiAlertTriangle style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
            Zona de Perigo
          </h3>
          <button type="button" className={styles.btnDanger} onClick={() => setModal('cancelSub')}>
            <FiTrash2 style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Cancelar Assinatura
          </button>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="sec-suporte">
        <button type="button" className={styles.sectionHeaderBlue} onClick={() => setSupportOpen((v) => !v)} id="sec-suporte">
          <div className={styles.sectionHeaderLeft}>
            <FiPhone style={{ width: '1.25rem', height: '1.25rem', color: '#2563eb' }} aria-hidden />
            <div>
              <h2 className={styles.sectionTitleBlue}>Atendimento ao Cliente</h2>
              <p className={styles.sectionDesc}>Resolva suas dúvidas</p>
            </div>
          </div>
          <FiChevronDown className={cn(styles.chevron, supportOpen && styles.chevronOpen)} style={{ color: '#2563eb' }} aria-hidden />
        </button>
        <div className={cn(styles.sectionBody, !supportOpen && styles.sectionBodyHidden)}>
          <div className={styles.supportInner}>
            <div className={styles.supportBanner}>
              <div className={styles.supportIconSq} aria-hidden>
                <IoHeadset style={{ width: '1.75rem', height: '1.75rem' }} />
              </div>
              <div className={styles.supportText}>
                <p className={styles.supportBannerTitle}>Precisa de ajuda?</p>
                <p className={styles.supportBannerDesc}>
                  Nossa equipe está pronta para ajudar você com qualquer dúvida!
                </p>
                <p className={styles.slaRow}>
                  <FiClock style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  Respondemos em até 24 horas
                </p>
              </div>
              <button type="button" className={styles.btnSupport} onClick={() => openSupport()}>
                <FiMessageCircle style={{ width: '1rem', height: '1rem' }} aria-hidden />
                Falar Conosco
              </button>
            </div>
            <div className={styles.supportDivider} />
            <div className={styles.quickHelp}>
              <p className={styles.quickHelpLabel}>
                <IoRocket style={{ width: '1rem', height: '1rem' }} aria-hidden />
                Ajuda Rápida:
              </p>
              <div className={styles.quickGrid}>
                <button type="button" className={styles.quickCard} onClick={() => openSupport('tech')}>
                  <FiHelpCircle className={styles.quickCardIcon} style={{ width: '1.5rem', height: '1.5rem' }} aria-hidden />
                  <span className={styles.quickCardText}>Problemas Técnicos</span>
                </button>
                <button type="button" className={styles.quickCard} onClick={() => openSupport('billing')}>
                  <FiCreditCard className={styles.quickCardIcon} style={{ width: '1.5rem', height: '1.5rem' }} aria-hidden />
                  <span className={styles.quickCardText}>Cobrança</span>
                </button>
                <button type="button" className={styles.quickCard} onClick={() => openSupport('courses')}>
                  <FiBookOpen className={styles.quickCardIcon} style={{ width: '1.5rem', height: '1.5rem' }} aria-hidden />
                  <span className={styles.quickCardText}>Acesso Cursos</span>
                </button>
                <button type="button" className={styles.quickCard} onClick={() => openSupport('other')}>
                  <FiMessageCircle className={styles.quickCardIcon} style={{ width: '1.5rem', height: '1.5rem' }} aria-hidden />
                  <span className={styles.quickCardText}>Outros Assuntos</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
