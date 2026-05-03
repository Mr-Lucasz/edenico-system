'use client'

import Link from 'next/link'
import { FiArrowLeft, FiLock } from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import styles from './ContinentesGameClient.module.scss'

const AMERICA_PROGRESS = { current: 13, total: 42 }

type Continent =
  | {
      id: string
      name: string
      desc: string
      theme: string
      unlocked: true
    }
  | {
      id: string
      name: string
      desc: string
      theme: string
      unlocked: false
      price: string
      missing: string
    }

const CONTINENTS: Continent[] = [
  {
    id: 'america',
    name: 'América',
    desc: 'Explore as terras do novo mundo',
    unlocked: true,
    theme: styles.america,
  },
  {
    id: 'europa',
    name: 'Europa',
    desc: 'História e cultura milenar',
    unlocked: false,
    price: '20.000',
    missing: 'Faltam 7.550 moedas',
    theme: styles.europa,
  },
  {
    id: 'africa',
    name: 'África',
    desc: 'Savanas e tesouros ancestrais',
    unlocked: false,
    price: '18.000',
    missing: 'Faltam 5.550 moedas',
    theme: styles.africa,
  },
  {
    id: 'asia',
    name: 'Ásia',
    desc: 'Oriente e grandes civilizações',
    unlocked: false,
    price: '22.000',
    missing: 'Faltam 9.550 moedas',
    theme: styles.asia,
  },
  {
    id: 'oceania',
    name: 'Oceania',
    desc: 'Ilhas e biodiversidade única',
    unlocked: false,
    price: '25.000',
    missing: 'Faltam 12.550 moedas',
    theme: styles.oceania,
  },
  {
    id: 'antartida',
    name: 'Antártida',
    desc: 'O continente gelado',
    unlocked: false,
    price: '30.000',
    missing: 'Faltam 17.550 moedas',
    theme: styles.antartida,
  },
]

export function ContinentesGameClient() {
  return (
    <>
      <div className={styles.topBar}>
        <Link href="/comunidade" className={styles.backLink}>
          <FiArrowLeft aria-hidden />
          Voltar
        </Link>
      </div>

      <h1 className={styles.pageTitle}>Desbloqueie Novos Continentes</h1>

      <div className={styles.hero}>
        <p className={styles.heroBubble}>Onboarding</p>
        <p className={styles.heroSub}>
          <span className={styles.heroSubPill}>Explore o mundo Edênicos</span>
        </p>
      </div>

      <div className={styles.grid}>
        {CONTINENTS.map((c) =>
          c.unlocked ? (
            <article key={c.id} className={`${styles.card} ${styles.cardUnlocked} ${c.theme}`}>
              <h2 className={styles.cardName}>{c.name}</h2>
              <p className={styles.cardDesc}>{c.desc}</p>
              <div className={styles.progressBlock}>
                <progress
                  className={styles.nativeProgress}
                  max={AMERICA_PROGRESS.total}
                  value={AMERICA_PROGRESS.current}
                  aria-label={`Progresso América: ${AMERICA_PROGRESS.current} de ${AMERICA_PROGRESS.total}`}
                />
                <span className={styles.progressCaption} aria-hidden="true">
                  {AMERICA_PROGRESS.current}/{AMERICA_PROGRESS.total}
                </span>
              </div>
            </article>
          ) : (
            <article key={c.id} className={`${styles.card} ${styles.cardLocked} ${c.theme}`}>
              <h2 className={styles.cardName}>{c.name}</h2>
              <p className={styles.cardDesc}>{c.desc}</p>
              <span className={styles.tagPrice}>
                <GiTwoCoins aria-hidden />
                {c.price}
              </span>
              <button type="button" className={styles.btnUnlock} disabled>
                <FiLock aria-hidden />
                Desbloquear
              </button>
              <p className={styles.footerNote}>{c.missing}</p>
            </article>
          ),
        )}
      </div>

      <section className={styles.secret} aria-label="Nível secreto">
        <div className={styles.secretInner}>
          <div className={styles.lockCircle}>
            <FiLock className={styles.lockCircleIcon} aria-hidden />
          </div>
          <h3 className={styles.secretTitle}>Nível Secreto</h3>
          <p className={styles.secretDesc}>Mistério inexplorado.</p>
          <span className={styles.badgeLocked}>
            <FiLock aria-hidden /> Bloqueado
          </span>
        </div>
      </section>
    </>
  )
}
