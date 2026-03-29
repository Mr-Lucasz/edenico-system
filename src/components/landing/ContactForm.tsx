'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import {
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiSend,
} from 'react-icons/fi'
import { SiWhatsapp } from 'react-icons/si'
import styles from './ContactForm.module.scss'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

export type ContactFormVariant = 'full' | 'help'

type ContactFormProps = Readonly<{
  defaultSubject?: string
  variant?: ContactFormVariant
}>

export function ContactForm({
  defaultSubject,
  variant = 'full',
}: ContactFormProps = {}) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: defaultSubject ?? '',
    message: '',
  })
  const [helpEmail, setHelpEmail] = useState('')
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAppliedUrlSubject = useRef(false)

  useEffect(() => {
    if (defaultSubject)
      setForm((prev) => (prev.subject ? prev : { ...prev, subject: defaultSubject }))
  }, [defaultSubject])

  useEffect(() => {
    if (variant !== 'full') return
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAppliedUrlSubject.current) return
        const params = new URLSearchParams(
          typeof window !== 'undefined' ? window.location.search : ''
        )
        if (params.get('assunto') === 'parceria') {
          hasAppliedUrlSubject.current = true
          setForm((prev) => (prev.subject ? prev : { ...prev, subject: 'parceria' }))
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [variant])

  const [errors, setErrors] = useState<Errors>({})
  const [helpEmailError, setHelpEmailError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const validate = useCallback((values: FormState): Errors => {
    const next: Errors = {}
    if (!values.name.trim()) next.name = 'Nome é obrigatório.'
    if (!values.email.trim()) next.email = 'E-mail é obrigatório.'
    else if (!EMAIL_REGEX.test(values.email)) next.email = 'Informe um e-mail válido.'
    if (!values.subject.trim()) next.subject = 'Assunto é obrigatório.'
    if (!values.message.trim()) next.message = 'Mensagem é obrigatória.'
    else if (values.message.trim().length < MIN_MESSAGE_LENGTH)
      next.message = `Mensagem deve ter no mínimo ${MIN_MESSAGE_LENGTH} caracteres.`
    return next
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleHelpSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setHelpEmailError('')
    if (!helpEmail.trim()) {
      setHelpEmailError('E-mail é obrigatório.')
      return
    }
    if (!EMAIL_REGEX.test(helpEmail)) {
      setHelpEmailError('Informe um e-mail válido.')
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Visitante — formulário rápido',
          email: helpEmail.trim(),
          subject: 'Precisa de ajuda (landing)',
          message:
            'Solicitação enviada pelo bloco “Precisa de Ajuda?” na landing. Entrar em contacto com este e-mail.',
        }),
      })
      if (!res.ok) throw new Error('Falha no envio')
      setStatus('success')
      setHelpEmail('')
    } catch {
      setStatus('error')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Falha no envio')
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  const isValid =
    form.name.trim() &&
    EMAIL_REGEX.test(form.email) &&
    form.subject.trim() &&
    form.message.trim().length >= MIN_MESSAGE_LENGTH

  const helpEmailValid = EMAIL_REGEX.test(helpEmail.trim())

  if (variant === 'help') {
    return (
      <div ref={sectionRef} className={styles.helpRoot}>
        <header className={styles.helpHeader}>
          <span className={styles.helpBadge}>
            <span className={styles.helpBadgeDot} aria-hidden />
            {'\u00A0'}
            Suporte Online 24/7
          </span>
          <h2 id="contato" className={styles.helpTitle}>
            Precisa de Ajuda?
          </h2>
          <p className={styles.helpSubtitle}>
            Nossa equipe está pronta para te ajudar! Deixe seu email e entraremos em contato o mais
            rápido possível.
          </p>
        </header>

        <div className={styles.helpColumns}>
          <form className={styles.helpForm} onSubmit={handleHelpSubmit} noValidate>
            <div className={styles.helpField}>
              <label htmlFor="help-email" className={styles.helpLabel}>
                Seu email:
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="help-email"
                  type="email"
                  name="help-email"
                  value={helpEmail}
                  onChange={(e) => {
                    setHelpEmail(e.target.value)
                    if (helpEmailError) setHelpEmailError('')
                    if (status === 'success' || status === 'error') setStatus('idle')
                  }}
                  placeholder="seu.email@exemplo.com"
                  autoComplete="email"
                  className={styles.helpInput}
                  aria-invalid={!!helpEmailError}
                  aria-describedby={helpEmailError ? 'help-email-err' : undefined}
                />
                <FiMail className={styles.inputTrailingIcon} aria-hidden />
              </div>
              {helpEmailError && (
                <p id="help-email-err" className={styles.error} role="alert">
                  {helpEmailError}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading' || !helpEmailValid}
              className={styles.helpSubmit}
            >
              <FiSend className={styles.helpSubmitIcon} aria-hidden />
              {status === 'loading' ? 'Enviando...' : 'Enviar Solicitação'}
            </button>

            <div className={styles.helpInfo}>
              <FiClock className={styles.helpInfoIcon} aria-hidden />
              <span>Dias úteis: Resposta em 1-3 horas</span>
            </div>

            {status === 'success' && (
              <p className={styles.statusOk} role="status">
                Solicitação enviada! Entraremos em contacto em breve.
              </p>
            )}
            {status === 'error' && (
              <p className={styles.statusErr} role="alert">
                Não foi possível enviar. Tente novamente.
              </p>
            )}
          </form>

          <aside className={styles.helpAside} aria-labelledby="help-contact-alt">
            <h3 id="help-contact-alt" className={styles.asideTitle}>
              Outras Formas de Contato
            </h3>
            <ul className={styles.asideList}>
              <li>
                <a href="#contato" className={styles.asideCard}>
                  <span className={`${styles.asideIconWrap} ${styles.asideIconChat}`}>
                    <FiMessageCircle className={styles.asideIcon} aria-hidden />
                  </span>
                  <span className={styles.asideCardBody}>
                    <span className={styles.asideCardTitle}>Chat Online</span>
                    <span className={styles.asideCardSub}>Disponível 24/7</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.asideCard}
                >
                  <span className={`${styles.asideIconWrap} ${styles.asideIconWa}`}>
                    <SiWhatsapp className={styles.asideIcon} aria-hidden />
                  </span>
                  <span className={styles.asideCardBody}>
                    <span className={styles.asideCardTitle}>Whatsapp</span>
                    <span className={styles.asideCardSub}>Resposta rápida</span>
                  </span>
                </a>
              </li>
              <li>
                <div className={styles.asideCard}>
                  <span className={`${styles.asideIconWrap} ${styles.asideIconPin}`}>
                    <FiMapPin className={styles.asideIcon} aria-hidden />
                  </span>
                  <span className={styles.asideCardBody}>
                    <span className={styles.asideCardTitle}>Brasil</span>
                    <span className={styles.asideCardSub}>Horário de Brasília</span>
                  </span>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className={styles.root}>
      <h2 id="contato" className={styles.title}>
        Precisa de Ajuda?
      </h2>
      <p className={styles.lead}>Envie sua mensagem para nós e retornaremos em breve!</p>
      <p className={styles.hint}>Tempo médio de resposta: 24h</p>

      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.field}>
          <label htmlFor="contact-name" className={styles.label}>
            Nome completo
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Seu nome"
            autoComplete="name"
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'contact-name-error' : undefined}
            className={styles.input}
          />
          {errors.name && (
            <p id="contact-name-error" className={styles.error} role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email" className={styles.label}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="seu@email.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
            className={styles.input}
          />
          {errors.email && (
            <p id="contact-email-error" className={styles.error} role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor="contact-subject" className={styles.label}>
            Assunto
          </label>
          <select
            id="contact-subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
            className={styles.select}
          >
            <option value="">Selecione o assunto</option>
            <option value="dúvida">Dúvida sobre cursos</option>
            <option value="suporte">Suporte técnico</option>
            <option value="parceria">Parceria Institucional</option>
            <option value="outro">Outro</option>
          </select>
          {errors.subject && (
            <p id="contact-subject-error" className={styles.error} role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <label htmlFor="contact-message" className={styles.label}>
            Sua mensagem
          </label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Escreva sua mensagem..."
            rows={4}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'contact-message-error' : undefined}
            className={styles.input}
          />
          {errors.message && (
            <p id="contact-message-error" className={styles.error} role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className={`${styles.field} ${styles.fieldFull}`}>
          <button
            type="submit"
            disabled={status === 'loading' || !isValid}
            className={styles.submit}
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </div>

        {status === 'success' && (
          <p className={`${styles.fieldFull} ${styles.statusOk}`} role="status">
            Mensagem enviada com sucesso! Retornaremos em breve.
          </p>
        )}
        {status === 'error' && (
          <p className={`${styles.fieldFull} ${styles.statusErr}`} role="alert">
            Não foi possível enviar. Tente novamente em alguns instantes.
          </p>
        )}
      </form>
    </div>
  )
}
