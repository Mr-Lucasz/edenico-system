'use client'

import { useState, useCallback, useEffect, useRef } from 'react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_MESSAGE_LENGTH = 10

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type Errors = Partial<Record<keyof FormState, string>>

export function ContactForm({ defaultSubject }: { defaultSubject?: string } = {}) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: defaultSubject ?? '',
    message: '',
  })
  const sectionRef = useRef<HTMLDivElement>(null)
  const hasAppliedUrlSubject = useRef(false)

  useEffect(() => {
    if (defaultSubject) setForm((prev) => (prev.subject ? prev : { ...prev, subject: defaultSubject }))
  }, [defaultSubject])

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAppliedUrlSubject.current) return
        const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')
        if (params.get('assunto') === 'parceria') {
          hasAppliedUrlSubject.current = true
          setForm((prev) => (prev.subject ? prev : { ...prev, subject: 'parceria' }))
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  const [errors, setErrors] = useState<Errors>({})
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) setErrors((prev) => ({ ...prev, [name]: undefined }))
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

  const isValid = form.name.trim() && EMAIL_REGEX.test(form.email) && form.subject.trim() && form.message.trim().length >= MIN_MESSAGE_LENGTH

  return (
    <div ref={sectionRef} className="rounded-2xl border border-white/10 bg-edenicos-navy-light p-6 shadow-xl sm:p-8">
      <h2 id="contato" className="text-xl font-bold text-green-400 sm:text-2xl">
        Precisa de Ajuda?
      </h2>
      <p className="mt-2 text-white/90">
        Envie sua mensagem para nós e retornaremos em breve!
      </p>
      <p className="mt-1 text-sm text-white/60">
        Tempo médio de resposta: 24h
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-6" noValidate>
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-white/90">
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
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-edenicos-yellow focus:outline-none focus:ring-1 focus:ring-edenicos-yellow"
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-white/90">
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
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-edenicos-yellow focus:outline-none focus:ring-1 focus:ring-edenicos-yellow"
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-subject" className="block text-sm font-medium text-white/90">
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
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white focus:border-edenicos-yellow focus:outline-none focus:ring-1 focus:ring-edenicos-yellow [&>option]:text-gray-900"
          >
            <option value="">Selecione o assunto</option>
            <option value="dúvida">Dúvida sobre cursos</option>
            <option value="suporte">Suporte técnico</option>
            <option value="parceria">Parceria Institucional</option>
            <option value="outro">Outro</option>
          </select>
          {errors.subject && (
            <p id="contact-subject-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.subject}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="contact-message" className="block text-sm font-medium text-white/90">
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
            className="mt-1 w-full rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/50 focus:border-edenicos-yellow focus:outline-none focus:ring-1 focus:ring-edenicos-yellow"
          />
          {errors.message && (
            <p id="contact-message-error" className="mt-1 text-sm text-red-400" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={status === 'loading' || !isValid}
            className="rounded-lg bg-edenicos-purple px-6 py-3 font-medium text-white transition-colors hover:bg-edenicos-purple-light disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-edenicos-navy"
          >
            {status === 'loading' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </div>

        {status === 'success' && (
          <p className="sm:col-span-2 text-sm text-green-400" role="status">
            Mensagem enviada com sucesso! Retornaremos em breve.
          </p>
        )}
        {status === 'error' && (
          <p className="sm:col-span-2 text-sm text-red-400" role="alert">
            Não foi possível enviar. Tente novamente em alguns instantes.
          </p>
        )}
      </form>
    </div>
  )
}
