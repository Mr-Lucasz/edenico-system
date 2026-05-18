'use client'

import { useEffect, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import {
  LANDING_LANG_CHANGE_EVENT,
  LANDING_LANG_STORAGE_KEY,
  type LandingLang,
} from '@src/constants/landingPreferences'
import styles from './LandingFooter.module.scss'

function readLang(): LandingLang {
  if (typeof window === 'undefined') return 'pt'
  const v = window.localStorage.getItem(LANDING_LANG_STORAGE_KEY)
  return v === 'en' || v === 'es' || v === 'pt' ? v : 'pt'
}

export function LandingFooterLangSelect() {
  const [lang, setLang] = useState<LandingLang>('pt')

  useEffect(() => {
    setLang(readLang())
    const onChange = (e: Event) => {
      const d = (e as CustomEvent<LandingLang>).detail
      if (d === 'pt' || d === 'en' || d === 'es') setLang(d)
    }
    window.addEventListener(LANDING_LANG_CHANGE_EVENT, onChange as EventListener)
    return () => window.removeEventListener(LANDING_LANG_CHANGE_EVENT, onChange as EventListener)
  }, [])

  const onSelect = (value: LandingLang) => {
    setLang(value)
    window.localStorage.setItem(LANDING_LANG_STORAGE_KEY, value)
    window.dispatchEvent(new CustomEvent(LANDING_LANG_CHANGE_EVENT, { detail: value }))
  }

  return (
    <div className={styles.localeRow}>
      <label htmlFor="footer-lang" className={styles.localeLabel}>
        Idioma:
      </label>
      <div className={styles.selectWrap}>
        <select
          id="footer-lang"
          className={styles.select}
          value={lang}
          aria-label="Idioma do site"
          onChange={(e) => onSelect(e.target.value as LandingLang)}
        >
          <option value="pt">Português</option>
          <option value="en">English</option>
          <option value="es">Español</option>
        </select>
        <FiChevronDown className={styles.selectChevron} aria-hidden />
      </div>
    </div>
  )
}
