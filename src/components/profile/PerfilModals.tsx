'use client'

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import {
  FiAlertCircle,
  FiAward,
  FiBarChart2,
  FiBell,
  FiCheck,
  FiChevronDown,
  FiCopy,
  FiCreditCard,
  FiEdit2,
  FiEye,
  FiEyeOff,
  FiGlobe,
  FiInfo,
  FiMail,
  FiMessageCircle,
  FiMinus,
  FiRefreshCw,
  FiSave,
  FiSend,
  FiShield,
  FiUser,
  FiX,
} from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa6'
import { MdOutlineHeartBroken } from 'react-icons/md'
import { IoHeadset } from 'react-icons/io5'
import styles from './PerfilModals.module.scss'

export type PerfilModalId =
  | 'plans'
  | 'addCard'
  | 'cancelSub'
  | 'support'
  | 'editProfile'
  | 'settings'
  | 'changePassword'
  | 'verifyEmail'
  | 'privacy'
  | 'publicProfile'

export type SupportTopicPreset = 'tech' | 'billing' | 'courses' | 'other' | null

export interface PerfilModalsProps {
  readonly active: PerfilModalId | null
  readonly onClose: () => void
  readonly supportTopicPreset?: SupportTopicPreset
}

function useModalLock(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
}

function ModalShell({
  children,
  onClose,
  wide,
}: {
  children: ReactNode
  onClose: () => void
  wide?: boolean
}) {
  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={wide ? `${styles.panel} ${styles.panelWide}` : styles.panel} role="dialog" aria-modal="true">
        <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
          <FiX style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

function PlansModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.head}>
        <FaCrown className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} aria-hidden />
        <div>
          <h2 className={styles.title}>
            Escolher Novo Plano
          </h2>
        </div>
      </div>
      <p className={styles.desc}>Compare os planos e escolha o que melhor se adapta às suas necessidades.</p>

      <div className={styles.planScroll}>
        <div className={styles.planCard}>
          <div className={styles.planCardHead}>
            <FiCreditCard style={{ width: '1.25rem', height: '1.25rem', color: '#9ca3af' }} aria-hidden />
            <div>
              <span className={styles.planBadge}>Básico</span>
              <p className={styles.planPrice}>Grátis</p>
            </div>
          </div>
          <ul className={styles.list}>
            {['3 cursos básicos', 'Quizzes simples', 'Suporte por email', '1 certificado por mês'].map((t) => (
              <li key={t} className={styles.listItem}>
                <FiMinus className={styles.listIconGrey} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.planCard}>
          <div className={styles.planCardHead}>
            <FaCrown style={{ width: '1.25rem', height: '1.25rem', color: '#8b5cf6' }} aria-hidden />
            <div>
              <span className={styles.planBadgePremium}>Premium</span>
              <p className={styles.planPrice}>R$ 47,84 / mês</p>
            </div>
          </div>
          <ul className={styles.list}>
            {[
              'Todos os cursos (STEM)',
              'Quizzes avançados',
              'Chat com docentes',
              'Certificados ilimitados',
              'Placa de notas',
              'Progresso detalhado',
            ].map((t) => (
              <li key={t} className={styles.listItem}>
                <FiCheck className={styles.listIconGreen} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.planCard}>
          <div className={styles.planCardHead}>
            <FaCrown style={{ width: '1.25rem', height: '1.25rem', color: '#eab308' }} aria-hidden />
            <div>
              <span className={styles.planBadgePlus}>Premium Plus</span>
              <p className={styles.planPrice}>R$ 79,92 / mês</p>
            </div>
          </div>
          <ul className={styles.list}>
            {['Todos os cursos + mentorias', 'Conteúdo exclusivo', 'Suporte prioritário 24/7'].map((t) => (
              <li key={t} className={styles.listItem}>
                <FiCheck className={styles.listIconGreen} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
          <button type="button" className={styles.btnSelectPlus} onClick={onClose}>
            Selecionar
          </button>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Fechar
        </button>
      </div>
    </>
  )
}

function AddCardModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.head}>
        <FiCreditCard className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} aria-hidden />
        <div>
          <h2 className={styles.title}>Adicionar Método de Pagamento</h2>
        </div>
      </div>
      <p className={styles.desc}>Adicione um novo cartão de crédito ou débito.</p>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pm-card-type">
          Tipo de Cartão
        </label>
        <div className={styles.selectWrap}>
          <select id="pm-card-type" className={styles.select} defaultValue="credit">
            <option value="credit">Crédito</option>
            <option value="debit">Débito</option>
          </select>
          <FiChevronDown className={styles.chevron} aria-hidden />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pm-holder">
          Nome do Portador
        </label>
        <input id="pm-holder" className={styles.input} type="text" placeholder="Nome completo como no cartão" autoComplete="cc-name" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pm-number">
          Número do Cartão
        </label>
        <input id="pm-number" className={styles.input} type="text" inputMode="numeric" placeholder="0000 0000 0000 0000" autoComplete="cc-number" />
      </div>
      <div className={styles.row2}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="pm-exp">
            Validade
          </label>
          <input id="pm-exp" className={styles.input} type="text" placeholder="MM/AA" autoComplete="cc-exp" />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="pm-cvv">
            CVV
          </label>
          <input id="pm-cvv" className={styles.input} type="password" inputMode="numeric" placeholder="000" autoComplete="cc-csc" />
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className={styles.btnPurple} onClick={onClose}>
          Adicionar Cartão
        </button>
      </div>
    </>
  )
}

function CancelSubModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.head}>
        <MdOutlineHeartBroken className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#dc2626' }} aria-hidden />
        <div>
          <h2 className={styles.titleDanger}>Cancelar Assinatura</h2>
        </div>
      </div>
      <p className={styles.desc}>Para cancelar a assinatura, precisamos verificar o responsável.</p>

      <div className={styles.alertDanger}>
        <FiAlertCircle className={styles.alertDangerIcon} style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
        <p className={styles.alertDangerText}>
          <strong>Atenção:</strong> O cancelamento será efetuado imediatamente e você perderá acesso aos recursos premium.
        </p>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="pm-cancel-email">
          Email do Responsável
        </label>
        <input id="pm-cancel-email" className={styles.input} type="email" autoComplete="email" placeholder="email@exemplo.com" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pm-cancel-pass">
          Senha do Responsável
        </label>
        <input id="pm-cancel-pass" className={styles.input} type="password" autoComplete="current-password" placeholder="••••••••" />
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Manter Assinatura
        </button>
        <button type="button" className={styles.btnRed} onClick={onClose}>
          Confirmar Cancelamento
        </button>
      </div>
    </>
  )
}

const PRESET_TO_TOPIC: Record<NonNullable<SupportTopicPreset>, string> = {
  tech: 'tech',
  billing: 'billing',
  courses: 'access',
  other: 'other',
}

function SupportModal({ onClose, topicPreset }: { onClose: () => void; topicPreset?: SupportTopicPreset }) {
  const initialTopic = topicPreset ? (PRESET_TO_TOPIC[topicPreset] ?? '') : ''
  const [topic, setTopic] = useState(initialTopic)

  useEffect(() => {
    setTopic(topicPreset ? (PRESET_TO_TOPIC[topicPreset] ?? '') : '')
  }, [topicPreset])

  return (
    <>
      <div className={styles.head}>
        <IoHeadset className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#2563eb' }} aria-hidden />
        <div>
          <h2 className={styles.title}>Contatar Atendimento</h2>
        </div>
      </div>
      <p className={styles.desc}>Descreva seu problema e nossa equipe entrará em contato o mais rápido possível.</p>

      <div className={styles.supportForm}>
        <div className={styles.row2}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pm-sup-name">
              Nome do Responsável
            </label>
            <input id="pm-sup-name" className={styles.input} type="text" placeholder="Nome completo" />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pm-sup-email">
              Email de Contato
            </label>
            <input id="pm-sup-email" className={styles.input} type="email" placeholder="email@exemplo.com" />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="pm-sup-topic">
            Tópico do Problema
          </label>
          <div className={styles.selectWrap}>
            <select id="pm-sup-topic" className={styles.select} value={topic} onChange={(e) => setTopic(e.target.value)}>
              <option value="">Selecione um tópico</option>
              <option value="tech">Problema técnico</option>
              <option value="billing">Cobrança / faturação</option>
              <option value="access">Acesso à conta ou cursos</option>
              <option value="other">Outro</option>
            </select>
            <FiChevronDown className={styles.chevron} aria-hidden />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="pm-sup-priority">
            Prioridade
          </label>
          <div className={styles.selectWrap}>
            <select id="pm-sup-priority" className={styles.select} defaultValue="medium">
              <option value="low">Baixa — Dúvida geral</option>
              <option value="medium">Média — Problema moderado</option>
              <option value="high">Alta — Bloqueio urgente</option>
            </select>
            <FiChevronDown className={styles.chevron} aria-hidden />
          </div>
          <p className={styles.priorityHint}>
            <span className={styles.prioritySquare} aria-hidden />
            Média — Problema moderado
          </p>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="pm-sup-desc">
            Descrição Detalhada
          </label>
          <textarea id="pm-sup-desc" className={styles.textarea} placeholder="Descreva o que aconteceu, passos para reproduzir e o que já tentou…" />
        </div>

        <div className={styles.infoBox}>
          <p className={styles.infoBoxTitle}>
            <FiInfo style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Informações
          </p>
          <ul className={styles.infoList}>
            <li>Resposta em até 12 horas úteis na maioria dos casos</li>
            <li>Atendimento de segunda a sexta, 8h às 18h</li>
            <li>Inclua prints ou links se ajudarem a esclarecer o pedido</li>
          </ul>
        </div>
      </div>

      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className={styles.btnBlue} onClick={onClose}>
          Enviar Solicitação
        </button>
      </div>
    </>
  )
}

function EditProfileModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.head}>
        <FiEdit2 className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} aria-hidden />
        <h2 className={styles.title}>Editar Perfil</h2>
      </div>
      <p className={styles.desc}>Atualize os dados que aparecem no seu perfil.</p>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pf-edit-name">
          Nome de exibição
        </label>
        <input id="pf-edit-name" className={styles.input} type="text" defaultValue="Sofia Mendes" />
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pf-edit-bio">
          Bio curta
        </label>
        <textarea id="pf-edit-bio" className={styles.textarea} defaultValue="Apaixonada por STEM e natureza." />
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Cancelar
        </button>
        <button type="button" className={styles.btnBlue} onClick={onClose}>
          Guardar alterações
        </button>
      </div>
    </>
  )
}

function SettingsModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className={styles.head}>
        <FiInfo className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#64748b' }} aria-hidden />
        <h2 className={styles.title}>Configurações</h2>
      </div>
      <p className={styles.desc}>Preferências gerais da conta e da aplicação.</p>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pf-set-lang">
          Idioma
        </label>
        <div className={styles.selectWrap}>
          <select id="pf-set-lang" className={styles.select} defaultValue="pt">
            <option value="pt">Português (Brasil)</option>
            <option value="en">English</option>
          </select>
          <FiChevronDown className={styles.chevron} aria-hidden />
        </div>
      </div>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pf-set-theme">
          Aparência
        </label>
        <div className={styles.selectWrap}>
          <select id="pf-set-theme" className={styles.select} defaultValue="light">
            <option value="light">Claro</option>
            <option value="dark">Escuro</option>
            <option value="system">Sistema</option>
          </select>
          <FiChevronDown className={styles.chevron} aria-hidden />
        </div>
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Fechar
        </button>
        <button type="button" className={styles.btnPurple} onClick={onClose}>
          Guardar
        </button>
      </div>
    </>
  )
}

function ModalPasswordField({
  id,
  label,
  autoComplete,
  placeholder,
  visible,
  onToggle,
}: {
  id: string
  label: string
  autoComplete?: string
  placeholder?: string
  visible: boolean
  onToggle: () => void
}) {
  const icon = { width: '1.125rem', height: '1.125rem' } as const
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <div className={styles.inputPasswordWrap}>
        <input
          id={id}
          className={styles.inputPassword}
          type={visible ? 'text' : 'password'}
          autoComplete={autoComplete}
          placeholder={placeholder}
        />
        <button
          type="button"
          className={styles.inputPasswordEye}
          onClick={onToggle}
          aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        >
          {visible ? <FiEyeOff style={icon} aria-hidden /> : <FiEye style={icon} aria-hidden />}
        </button>
      </div>
    </div>
  )
}

function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [showVerifiedToast, setShowVerifiedToast] = useState(false)
  const [showParentPass, setShowParentPass] = useState(false)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleVerify = () => {
    setShowVerifiedToast(true)
    window.setTimeout(() => {
      setShowVerifiedToast(false)
      setStep(2)
    }, 2000)
  }

  const headIcon = { width: '1.5rem', height: '1.5rem', color: '#dc2626' } as const

  return (
    <>
      <div className={styles.head}>
        <FiShield className={styles.headIcon} style={headIcon} aria-hidden />
        <h2 className={styles.title}>Alterar Senha</h2>
      </div>
      {showVerifiedToast ? (
        <div className={styles.successToast} role="status">
          <span className={styles.successToastIcon} aria-hidden>
            <FiCheck style={{ width: '0.875rem', height: '0.875rem' }} />
          </span>
          Responsável verificado com sucesso!
        </div>
      ) : null}
      {step === 1 ? (
        <>
          <p className={styles.desc}>Primeiro, precisamos verificar o responsável:</p>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pf-pw-parent-email">
              Email do Responsável
            </label>
            <input
              id="pf-pw-parent-email"
              className={styles.input}
              type="email"
              autoComplete="email"
              placeholder="email@exemplo.com"
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pf-pw-parent-pass">
              Senha do Responsável
            </label>
            <div className={styles.inputPasswordWrap}>
              <input
                id="pf-pw-parent-pass"
                className={styles.inputPassword}
                type={showParentPass ? 'text' : 'password'}
                autoComplete="current-password"
              />
              <button
                type="button"
                className={styles.inputPasswordEye}
                onClick={() => setShowParentPass((v) => !v)}
                aria-label={showParentPass ? 'Ocultar senha' : 'Mostrar senha'}
              >
                {showParentPass ? (
                  <FiEyeOff style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                ) : (
                  <FiEye style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                )}
              </button>
            </div>
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={styles.btnBlue} onClick={handleVerify}>
              Verificar
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.desc}>Agora você pode alterar a senha:</p>
          <ModalPasswordField
            id="pf-pw-current"
            label="Senha Atual"
            autoComplete="current-password"
            visible={showCurrent}
            onToggle={() => setShowCurrent((v) => !v)}
          />
          <ModalPasswordField
            id="pf-pw-new"
            label="Nova Senha"
            autoComplete="new-password"
            visible={showNew}
            onToggle={() => setShowNew((v) => !v)}
          />
          <ModalPasswordField
            id="pf-pw-repeat"
            label="Confirmar Nova Senha"
            autoComplete="new-password"
            visible={showConfirm}
            onToggle={() => setShowConfirm((v) => !v)}
          />
          <div className={styles.footer}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={styles.btnGreen} onClick={onClose}>
              Confirmar
            </button>
          </div>
        </>
      )}
    </>
  )
}

const VERIFY_INITIAL_SECONDS = 118

function formatVerifyCountdown(totalSeconds: number) {
  const s = Math.max(0, totalSeconds)
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m}:${String(sec).padStart(2, '0')}`
}

function VerifyEmailModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [parentEmail, setParentEmail] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(VERIFY_INITIAL_SECONDS)

  useEffect(() => {
    if (step !== 2) return
    const id = window.setInterval(() => {
      setSecondsLeft((t) => (t <= 0 ? 0 : t - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [step])

  const sendCode = () => {
    setStep(2)
    setSecondsLeft(VERIFY_INITIAL_SECONDS)
  }

  const reenviar = () => {
    setSecondsLeft(VERIFY_INITIAL_SECONDS)
  }

  const mailIcon = { width: '1.5rem', height: '1.5rem', color: '#2563eb' } as const
  const displayEmail = parentEmail.trim() || 'testeroupa@gmail.com'

  return (
    <>
      <div className={styles.head}>
        <FiMail className={styles.headIcon} style={mailIcon} aria-hidden />
        <h2 className={styles.title}>Verificar E-mail do Responsável</h2>
      </div>
      {step === 1 ? (
        <>
          <p className={styles.desc}>Digite o email do responsável:</p>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pf-verify-email">
              Email do Responsável
            </label>
            <input
              id="pf-verify-email"
              className={styles.input}
              type="email"
              autoComplete="email"
              placeholder="email@exemplo.com"
              value={parentEmail}
              onChange={(e) => setParentEmail(e.target.value)}
            />
          </div>
          <div className={styles.footer}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={styles.btnBlue} onClick={sendCode}>
              <FiSend style={{ width: '1rem', height: '1rem' }} aria-hidden />
              Enviar Código
            </button>
          </div>
        </>
      ) : (
        <>
          <p className={styles.desc}>Digite o código de 7 dígitos enviado:</p>
          <div className={styles.verifySentBanner}>
            <p className={styles.verifySentLine}>
              <strong>Código enviado para:</strong> {displayEmail}
            </p>
            <p className={styles.verifySentLine}>
              <strong>Tempo restante:</strong> {formatVerifyCountdown(secondsLeft)}
            </p>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="pf-verify-code">
              Código de verificação
            </label>
            <input
              id="pf-verify-code"
              className={styles.input}
              type="text"
              inputMode="numeric"
              maxLength={7}
              placeholder="0000000"
              autoComplete="one-time-code"
            />
          </div>
          <button type="button" className={styles.verifyReenviar} onClick={reenviar}>
            <FiRefreshCw style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
            Reenviar Código
          </button>
          <div className={styles.footer}>
            <button type="button" className={styles.btnGhost} onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className={styles.btnGreen} onClick={onClose}>
              Verificar
            </button>
          </div>
        </>
      )}
    </>
  )
}

type PrivacyKey = 'profilePublic' | 'messages' | 'progress' | 'achievements' | 'parentNotif'

function PrivacyModal({ onClose }: { onClose: () => void }) {
  const [prefs, setPrefs] = useState<Record<PrivacyKey, boolean>>({
    profilePublic: true,
    messages: false,
    progress: true,
    achievements: true,
    parentNotif: true,
  })

  const toggle = (key: PrivacyKey) => {
    setPrefs((p) => ({ ...p, [key]: !p[key] }))
  }

  const rows: {
    key: PrivacyKey
    icon: ReactNode
    title: string
    desc: string
  }[] = [
    {
      key: 'profilePublic',
      icon: <FiUser style={{ width: '1rem', height: '1rem' }} aria-hidden />,
      title: 'Mostrar Perfil Público',
      desc: 'Permitir que outros vejam seu perfil',
    },
    {
      key: 'messages',
      icon: <FiMessageCircle style={{ width: '1rem', height: '1rem' }} aria-hidden />,
      title: 'Permitir Mensagens',
      desc: 'Outros podem enviar mensagens',
    },
    {
      key: 'progress',
      icon: <FiBarChart2 style={{ width: '1rem', height: '1rem' }} aria-hidden />,
      title: 'Compartilhar Progresso',
      desc: 'Mostra seu progresso para amigos',
    },
    {
      key: 'achievements',
      icon: <FiAward style={{ width: '1rem', height: '1rem' }} aria-hidden />,
      title: 'Mostrar Conquistas',
      desc: 'Exiba suas conquistas publicamente',
    },
    {
      key: 'parentNotif',
      icon: <FiBell style={{ width: '1rem', height: '1rem' }} aria-hidden />,
      title: 'Notificações para Pais',
      desc: 'Envia relatórios aos responsáveis',
    },
  ]

  const shieldIcon = { width: '1.5rem', height: '1.5rem', color: '#8b5cf6' } as const

  return (
    <>
      <div className={styles.head}>
        <FiShield className={styles.headIcon} style={shieldIcon} aria-hidden />
        <h2 className={styles.title}>Configurações de Privacidade</h2>
      </div>
      <p className={styles.desc}>Ajuste as configurações de privacidade da conta:</p>
      <div className={styles.privacyStack}>
        {rows.map((row) => {
          const on = prefs[row.key]
          return (
            <div key={row.key} className={styles.privacyItem}>
              <div className={styles.privacyItemLeft}>
                <span className={styles.privacyItemIcon}>{row.icon}</span>
                <div>
                  <p className={styles.privacyItemTitle}>{row.title}</p>
                  <p className={styles.privacyItemDesc}>{row.desc}</p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={on}
                className={`${styles.privacySwitch} ${on ? styles.privacySwitchOn : ''}`}
                onClick={() => toggle(row.key)}
              >
                <span className={styles.privacySwitchKnob} />
              </button>
            </div>
          )
        })}
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          <FiX style={{ width: '1rem', height: '1rem' }} aria-hidden />
          Cancelar
        </button>
        <button type="button" className={styles.btnPurple} onClick={onClose}>
          <FiSave style={{ width: '1rem', height: '1rem' }} aria-hidden />
          Salvar
        </button>
      </div>
    </>
  )
}

const PUBLIC_URL = 'https://academy.edenicos.com/u/sofia-mendes'

function PublicProfileModal({ onClose }: { onClose: () => void }) {
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(PUBLIC_URL)
    } catch {
      window.prompt('Copie o link:', PUBLIC_URL)
    }
  }

  return (
    <>
      <div className={styles.head}>
        <FiGlobe className={styles.headIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#8b5cf6' }} aria-hidden />
        <h2 className={styles.title}>Perfil público</h2>
      </div>
      <p className={styles.desc}>Partilhe este link para mostrar o seu perfil de estudante (conforme as regras de privacidade).</p>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="pf-public-url">
          Link
        </label>
        <input id="pf-public-url" className={styles.input} readOnly value={PUBLIC_URL} />
      </div>
      <div className={styles.footer}>
        <button type="button" className={styles.btnGhost} onClick={onClose}>
          Fechar
        </button>
        <button type="button" className={styles.btnPurple} onClick={copy}>
          <FiCopy style={{ width: '1rem', height: '1rem' }} aria-hidden />
          Copiar link
        </button>
      </div>
    </>
  )
}

export function PerfilModals({ active, onClose, supportTopicPreset = null }: PerfilModalsProps) {
  const open = active !== null
  useModalLock(open, onClose)

  if (!open || typeof document === 'undefined') return null

  const inner =
    active === 'plans' ? (
      <PlansModal onClose={onClose} />
    ) : active === 'addCard' ? (
      <AddCardModal onClose={onClose} />
    ) : active === 'cancelSub' ? (
      <CancelSubModal onClose={onClose} />
    ) : active === 'support' ? (
      <SupportModal onClose={onClose} topicPreset={supportTopicPreset} />
    ) : active === 'editProfile' ? (
      <EditProfileModal onClose={onClose} />
    ) : active === 'settings' ? (
      <SettingsModal onClose={onClose} />
    ) : active === 'changePassword' ? (
      <ChangePasswordModal onClose={onClose} />
    ) : active === 'verifyEmail' ? (
      <VerifyEmailModal onClose={onClose} />
    ) : active === 'privacy' ? (
      <PrivacyModal onClose={onClose} />
    ) : active === 'publicProfile' ? (
      <PublicProfileModal onClose={onClose} />
    ) : null

  return createPortal(
    <ModalShell onClose={onClose} wide={active === 'plans'}>
      {inner}
    </ModalShell>,
    document.body
  )
}
