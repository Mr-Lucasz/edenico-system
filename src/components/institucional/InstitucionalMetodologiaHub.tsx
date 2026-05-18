'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from 'react'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { cn } from '@src/utils/cn'
import { IdentityAcademySection } from './IdentityAcademySection'
import { MetodologiaHubContext, type MetodologiaChapter } from './metodologiaHubContext'
import { Philosophy50Section } from './Philosophy50Section'
import { StarsMethodologySection } from './StarsMethodologySection'
import styles from './InstitucionalMetodologiaHub.module.scss'

function chapterFromHash(hash: string): MetodologiaChapter {
  const id = hash.replace(/^#/, '')
  if (id === 'filosofia-5' || id.startsWith('filosofia-dim-')) return 'philosophy'
  if (id === 'identidade-edenicos' || id.startsWith('identidade-')) return 'identity'
  return 'stars'
}

const CHAPTER_ROOT_ID: Record<MetodologiaChapter, string> = {
  stars: 'metodologia-stars',
  philosophy: 'filosofia-5',
  identity: 'identidade-edenicos',
}

function subscribeDesktopMql(callback: () => void) {
  const mq = globalThis.matchMedia('(min-width: 1024px)')
  mq.addEventListener('change', callback)
  return () => mq.removeEventListener('change', callback)
}

function getDesktopMqlSnapshot() {
  return globalThis.matchMedia('(min-width: 1024px)').matches
}

function getDesktopMqlServerSnapshot() {
  return false
}

export function InstitucionalMetodologiaHub() {
  const { stars: copy } = institutionalCopy
  const reduceMotion = useReducedMotion()
  const isDesktopHub = useSyncExternalStore(
    subscribeDesktopMql,
    getDesktopMqlSnapshot,
    getDesktopMqlServerSnapshot
  )
  const [activeChapter, setActiveChapter] = useState<MetodologiaChapter>('stars')
  const pendingPhilRef = useRef<string | undefined>(undefined)

  useLayoutEffect(() => {
    if (!isDesktopHub) return
    setActiveChapter(chapterFromHash(globalThis.window?.location?.hash ?? ''))
  }, [isDesktopHub])

  const scrollRootIntoView = useCallback((chapter: MetodologiaChapter) => {
    const id = CHAPTER_ROOT_ID[chapter]
    queueMicrotask(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [])

  const setActive = useCallback(
    (chapter: MetodologiaChapter, opts?: { philosophyDim?: string }) => {
      if (opts?.philosophyDim) pendingPhilRef.current = opts.philosophyDim
      setActiveChapter(chapter)
      const root = CHAPTER_ROOT_ID[chapter]
      if (typeof globalThis !== 'undefined' && 'history' in globalThis) {
        globalThis.history.replaceState(null, '', `#${root}`)
      }
      if (opts?.philosophyDim) {
        queueMicrotask(() => {
          document.getElementById('filosofia-5')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
      } else {
        scrollRootIntoView(chapter)
      }
    },
    [scrollRootIntoView]
  )

  const peekPendingPhilosophyDim = useCallback(() => {
    const v = pendingPhilRef.current
    pendingPhilRef.current = undefined
    return v
  }, [])

  useEffect(() => {
    if (!isDesktopHub) return
    const onHash = () =>
      setActiveChapter(chapterFromHash(globalThis.window?.location?.hash ?? ''))
    globalThis.addEventListener('hashchange', onHash)
    return () => globalThis.removeEventListener('hashchange', onHash)
  }, [isDesktopHub])

  const ctx = useMemo(
    () => ({ inHub: true as const, active: activeChapter, setActive, peekPendingPhilosophyDim }),
    [activeChapter, setActive, peekPendingPhilosophyDim]
  )

  const dur = reduceMotion ? 0.12 : 0.32
  const ease = [0.22, 1, 0.36, 1] as const

  if (!isDesktopHub) {
    return (
      <div className={styles.mobileFlow}>
        <StarsMethodologySection />
        <Philosophy50Section />
        <IdentityAcademySection />
      </div>
    )
  }

  return (
    <MetodologiaHubContext.Provider value={ctx}>
      <div className={styles.hub}>
        <nav className={styles.hubTabs} aria-label={copy.mobileChapterNavAriaLabel}>
          <button
            type="button"
            className={cn(styles.hubTab, activeChapter === 'stars' && styles.hubTabActive)}
            aria-current={activeChapter === 'stars' ? 'true' : undefined}
            onClick={() => setActive('stars')}
          >
            {copy.mobileChapterJumpStars}
          </button>
          <button
            type="button"
            className={cn(styles.hubTab, activeChapter === 'philosophy' && styles.hubTabActive)}
            aria-current={activeChapter === 'philosophy' ? 'true' : undefined}
            onClick={() => setActive('philosophy')}
          >
            {copy.mobileChapterJumpPhilosophy}
          </button>
          <button
            type="button"
            className={cn(styles.hubTab, activeChapter === 'identity' && styles.hubTabActive)}
            aria-current={activeChapter === 'identity' ? 'true' : undefined}
            onClick={() => setActive('identity')}
          >
            {copy.mobileChapterJumpIdentity}
          </button>
        </nav>

        <div className={styles.panels}>
          <AnimatePresence mode="wait" initial={false}>
            {activeChapter === 'stars' && (
              <motion.div
                key="stars"
                className={styles.panel}
                role="tabpanel"
                aria-label={copy.navGroupStars}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: dur, ease }}
              >
                <StarsMethodologySection />
              </motion.div>
            )}
            {activeChapter === 'philosophy' && (
              <motion.div
                key="philosophy"
                className={styles.panel}
                role="tabpanel"
                aria-labelledby="philosophy50-heading"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: dur, ease }}
              >
                <Philosophy50Section />
              </motion.div>
            )}
            {activeChapter === 'identity' && (
              <motion.div
                key="identity"
                className={styles.panel}
                role="tabpanel"
                aria-labelledby="identity-academy-heading"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -10 }}
                transition={{ duration: dur, ease }}
              >
                <IdentityAcademySection />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MetodologiaHubContext.Provider>
  )
}
