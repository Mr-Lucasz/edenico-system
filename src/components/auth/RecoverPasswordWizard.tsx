'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import {
  FiArrowLeft,
  FiCheck,
  FiEye,
  FiEyeOff,
  FiLock,
  FiLogIn,
  FiMail,
  FiRefreshCw,
  FiX,
} from 'react-icons/fi'
import { AUTH_MOCK_USER } from '@src/constants/authMockUser'
import { RECOVER_COPY } from '@src/constants/authCopy'
import formStyles from './AuthForms.module.scss'
import styles from './RecoverPassword.module.scss'

const OTP_LEN = 7
const TIMER_START = 119

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())
}

function strengthScore(p: string): 0 | 1 | 2 | 3 {
  if (p.length === 0) return 0
  if (p.length < 6) return 1
  let n = 0
  if (p.length >= 8) n++
  if (/[a-z]/.test(p) && /[A-Z]/.test(p)) n++
  if (/\d/.test(p) && /[^A-Za-z0-9]/.test(p)) n++
  return Math.min(3, Math.max(1, n)) as 0 | 1 | 2 | 3
}

export function RecoverPasswordWizard() {
  const router = useRouter()
  const baseId = useId()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState<string[]>(() => Array(OTP_LEN).fill(''))
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])
  const [timer, setTimer] = useState(TIMER_START)
  const [newPass, setNewPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')
  const [show1, setShow1] = useState(false)
  const [show2, setShow2] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const emailOk = isValidEmail(email)
  const score = strengthScore(newPass)
  const match = newPass.length > 0 && newPass === confirmPass
  const step3Valid = match && score >= 2 && newPass.length >= 8
  const otpFilled = otp.every((c) => c.length === 1 && /\d/.test(c))

  useEffect(() => {
    if (step !== 2) return
    setTimer(TIMER_START)
  }, [step])

  useEffect(() => {
    if (step !== 2 || timer <= 0) return
    const t = window.setInterval(() => setTimer((s) => s - 1), 1000)
    return () => window.clearInterval(t)
  }, [step, timer])

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, '0')}`
  }, [])

  const setOtpDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[i] = d
    setOtp(next)
    if (d && i < OTP_LEN - 1) otpRefs.current[i + 1]?.focus()
  }

  const onOtpKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus()
  }

  useEffect(() => {
    if (showSuccess) {
      const t = window.setTimeout(() => router.push('/login'), 8000)
      return () => window.clearTimeout(t)
    }
  }, [showSuccess, router])

  return (
    <div>
      {step === 1 ? (
        <>
          <div className={formStyles.formHeader}>
            <div className={formStyles.iconBox} aria-hidden>
              <FiLock />
            </div>
            <h2 className={formStyles.title}>{RECOVER_COPY.step1.title}</h2>
            <p className={formStyles.subtitle}>{RECOVER_COPY.step1.subtitle}</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!emailOk) return
              setStep(2)
            }}
          >
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`${baseId}-email`}>
                E-mail
              </label>
              <div className={formStyles.inputWrap}>
                <FiMail className={formStyles.inputIcon} aria-hidden />
                <input
                  id={`${baseId}-email`}
                  className={formStyles.input}
                  type="email"
                  placeholder={RECOVER_COPY.step1.emailPh}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>
            <div className={formStyles.actions}>
              <Link href="/login" className={`${formStyles.btn} ${formStyles.btnMuted}`}>
                {RECOVER_COPY.step1.cancel}
              </Link>
              <button
                type="submit"
                className={`${formStyles.btn} ${formStyles.btnPrimary}`}
                disabled={!emailOk}
              >
                {RECOVER_COPY.step1.send}
              </button>
            </div>
          </form>
          <p className={formStyles.mockHint}>
            Use o email demo: {AUTH_MOCK_USER.email}
          </p>
        </>
      ) : null}

      {step === 2 ? (
        <>
          <div className={formStyles.formHeader}>
            <div className={formStyles.iconBox} aria-hidden>
              <FiLock />
            </div>
            <h2 className={formStyles.title}>{RECOVER_COPY.step2.title}</h2>
            <p className={formStyles.subtitle}>{RECOVER_COPY.step2.subtitle}</p>
          </div>
          <p className={formStyles.subtitle} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            {RECOVER_COPY.step2.sentPrefix}{' '}
            <strong>{email || AUTH_MOCK_USER.email}</strong>
          </p>
          <div className={styles.otpRow}>
            {otp.map((d, i) => (
              <input
                key={`otp-${baseId}-${i}`}
                ref={(el) => {
                  otpRefs.current[i] = el
                }}
                className={styles.otpBox}
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => setOtpDigit(i, e.target.value)}
                onKeyDown={(e) => onOtpKeyDown(i, e)}
                aria-label={`Dígito ${i + 1} do código`}
              />
            ))}
          </div>
          <p className={styles.timer}>
            {RECOVER_COPY.step2.timer}{' '}
            <span className={styles.timerStrong}>{formatTime(Math.max(0, timer))}</span>
          </p>
          <div style={{ textAlign: 'center' }}>
            <button type="button" className={styles.resend} disabled>
              <FiRefreshCw aria-hidden />
              {RECOVER_COPY.step2.resend}
            </button>
          </div>
          <div className={formStyles.actions}>
            <button
              type="button"
              className={`${formStyles.btn} ${formStyles.btnMuted}`}
              onClick={() => setStep(1)}
            >
              <FiArrowLeft aria-hidden style={{ marginRight: '0.25rem' }} />
              {RECOVER_COPY.step2.back}
            </button>
            <button
              type="button"
              className={`${formStyles.btn} ${formStyles.btnPrimary}`}
              disabled={!otpFilled}
              onClick={() => setStep(3)}
            >
              {RECOVER_COPY.step2.verify}
            </button>
          </div>
        </>
      ) : null}

      {step === 3 && !showSuccess ? (
        <>
          <div className={formStyles.formHeader}>
            <div className={formStyles.iconBox} aria-hidden>
              <FiLock />
            </div>
            <h2 className={formStyles.title}>{RECOVER_COPY.step3.pageTitle}</h2>
            <p className={formStyles.subtitle}>{RECOVER_COPY.step3.pageSubtitle}</p>
          </div>
          <div className={styles.cardInner}>
            <h3 className={styles.cardHeading}>{RECOVER_COPY.step3.cardTitle}</h3>
            <p className={styles.cardHint}>{RECOVER_COPY.step3.cardHint}</p>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`${baseId}-np`}>
                {RECOVER_COPY.step3.newPass}
              </label>
              <div className={formStyles.inputWrap}>
                <FiLock className={formStyles.inputIcon} aria-hidden />
                <input
                  id={`${baseId}-np`}
                  className={`${formStyles.input} ${formStyles.inputWithToggle}`}
                  type={show1 ? 'text' : 'password'}
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                />
                <button
                  type="button"
                  className={formStyles.toggleEye}
                  onClick={() => setShow1((v) => !v)}
                  aria-label="Mostrar senha"
                >
                  {show1 ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <div className={formStyles.field}>
              <label className={formStyles.label} htmlFor={`${baseId}-cp`}>
                {RECOVER_COPY.step3.confirmPass}
              </label>
              <div className={formStyles.inputWrap}>
                <FiLock className={formStyles.inputIcon} aria-hidden />
                <input
                  id={`${baseId}-cp`}
                  className={`${formStyles.input} ${formStyles.inputWithToggle} ${match ? styles.inputMatch : ''}`}
                  type={show2 ? 'text' : 'password'}
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
                <button
                  type="button"
                  className={formStyles.toggleEye}
                  onClick={() => setShow2((v) => !v)}
                  aria-label="Mostrar confirmação"
                >
                  {show2 ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            <p className={formStyles.label}>{RECOVER_COPY.step3.strength}</p>
            <div className={styles.strengthRow}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className={`${styles.strengthBar} ${score > i ? styles.strengthOn : ''}`}
                />
              ))}
            </div>
            <button
              type="button"
              className={styles.btnGreen}
              style={{ marginTop: '1.25rem' }}
              disabled={!step3Valid}
              onClick={() => setShowSuccess(true)}
            >
              {RECOVER_COPY.step3.save}
            </button>
          </div>
        </>
      ) : null}

      {showSuccess ? (
        <div className={styles.overlay} role="dialog" aria-modal aria-labelledby={`${baseId}-succ-title`}>
          <div className={styles.modal}>
            <button
              type="button"
              className={styles.modalClose}
              onClick={() => {
                setShowSuccess(false)
                router.push('/login')
              }}
              aria-label="Fechar"
            >
              <FiX />
            </button>
            <div className={styles.modalIcon} aria-hidden>
              <FiCheck strokeWidth={2.5} />
            </div>
            <h2 id={`${baseId}-succ-title`} className={styles.modalTitle}>
              {RECOVER_COPY.step4.title}
            </h2>
            <p className={styles.modalText}>{RECOVER_COPY.step4.text}</p>
            <div className={styles.pills}>
              <div className={`${styles.pill} ${styles.pillGreen}`}>
                <FiCheck aria-hidden />
                {RECOVER_COPY.step4.pill1}
              </div>
              <div className={`${styles.pill} ${styles.pillBlue}`}>
                <FiLogIn aria-hidden />
                {RECOVER_COPY.step4.pill2}
              </div>
            </div>
            <button
              type="button"
              className={styles.btnGreen}
              onClick={() => router.push('/login')}
            >
              <FiLogIn aria-hidden />
              {RECOVER_COPY.step4.cta}
            </button>
            <p className={styles.modalHint}>{RECOVER_COPY.step4.redirectHint}</p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
