'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiCreditCard, FiEye, FiEyeOff, FiLock } from 'react-icons/fi'
import {
  AUTH_MOCK_ADMIN,
  AUTH_MOCK_HINT_ADMIN,
  AUTH_MOCK_HINT_STUDENT,
  AUTH_MOCK_USER,
  type AuthMockRole,
} from '@src/constants/authMockUser'
import { LOGIN_COPY } from '@src/constants/authCopy'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import styles from './AuthForms.module.scss'

function normalizeCpf(s: string) {
  return s.replace(/\D/g, '')
}

function resolveMockRole(cpf: string, password: string): AuthMockRole | null {
  const n = normalizeCpf(cpf)
  if (n === AUTH_MOCK_USER.cpfNormalized && password === AUTH_MOCK_USER.password) return 'student'
  if (n === AUTH_MOCK_ADMIN.cpfNormalized && password === AUTH_MOCK_ADMIN.password) return 'admin'
  return null
}

export function LoginForm() {
  const router = useRouter()
  const [cpf, setCpf] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const role = resolveMockRole(cpf, password)
    if (!role) {
      setError('CPF ou senha incorretos. Use um dos acessos demo indicados abaixo.')
      return
    }
    startNavigationProgress()
    router.push(role === 'admin' ? '/admin' : '/dashboard')
  }

  return (
    <div>
      <div className={styles.formHeader}>
        <div className={styles.iconBox} aria-hidden>
          <FiLock />
        </div>
        <h2 className={styles.title}>{LOGIN_COPY.title}</h2>
        <p className={styles.subtitle}>{LOGIN_COPY.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-cpf">
            {LOGIN_COPY.cpf}
          </label>
          <div className={styles.inputWrap}>
            <FiCreditCard className={styles.inputIcon} aria-hidden />
            <input
              id="login-cpf"
              className={styles.input}
              type="text"
              inputMode="numeric"
              autoComplete="username"
              placeholder={LOGIN_COPY.cpfPh}
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="login-pass">
            {LOGIN_COPY.password}
          </label>
          <div className={styles.inputWrap}>
            <FiLock className={styles.inputIcon} aria-hidden />
            <input
              id="login-pass"
              className={`${styles.input} ${styles.inputWithToggle}`}
              type={show ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder={LOGIN_COPY.passwordPh}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.toggleEye}
              onClick={() => setShow((v) => !v)}
              aria-label={show ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {show ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>
        <p className={styles.forgot}>
          <Link href="/recuperar-senha" className={styles.forgotLink}>
            {LOGIN_COPY.forgot}
          </Link>
        </p>
        <div className={styles.actions}>
          <Link href="/" className={`${styles.btn} ${styles.btnMuted}`}>
            {LOGIN_COPY.cancel}
          </Link>
          <button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
            {LOGIN_COPY.submit}
          </button>
        </div>
      </form>

      <p className={styles.footerLink}>
        {LOGIN_COPY.footer}{' '}
        <Link href="/register" className={styles.footerLinkA}>
          {LOGIN_COPY.footerLink}
        </Link>
      </p>
      <p className={styles.mockHint}>{AUTH_MOCK_HINT_STUDENT}</p>
      <p className={styles.mockHint}>{AUTH_MOCK_HINT_ADMIN}</p>
      {error ? <p className={styles.mockHint} role="alert">{error}</p> : null}
    </div>
  )
}
