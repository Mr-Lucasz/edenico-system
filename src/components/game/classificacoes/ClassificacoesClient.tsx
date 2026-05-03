'use client'

import { useState } from 'react'
import { FiAward, FiGlobe, FiUser } from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa6'
import { cn } from '@src/utils/cn'
import styles from './ClassificacoesClient.module.scss'

type Scope = 'pais' | 'mundial'

type PodiumTriple = {
  readonly first: { name: string; score: number }
  readonly second: { name: string; score: number }
  readonly third: { name: string; score: number }
}

type LeaderRow = {
  readonly rank: number
  readonly name: string
  readonly level: number
  readonly score: number
  readonly isYou?: boolean
  readonly flag?: string
}

const BR_PODIUM: PodiumTriple = {
  first: { name: 'Pedro L.', score: 1489 },
  second: { name: 'Miguel S.', score: 1320 },
  third: { name: 'João R.', score: 1301 },
}

const BR_LIST: LeaderRow[] = [
  { rank: 1, name: 'Pedro L.', level: 51, score: 1489 },
  { rank: 2, name: 'Miguel S.', level: 46, score: 1320 },
  { rank: 3, name: 'João R.', level: 44, score: 1301 },
  { rank: 4, name: 'Você', level: 49, score: 1250, isYou: true },
  { rank: 5, name: 'Carla T.', level: 44, score: 1180 },
  { rank: 6, name: 'Ana C.', level: 43, score: 1120 },
]

const MUNDIAL_PODIUM: PodiumTriple = {
  first: { name: 'Pedro L.', score: 1489 },
  second: { name: 'Miguel S.', score: 1320 },
  third: { name: 'Francisco', score: 1301 },
}

const MUNDIAL_LIST: LeaderRow[] = [
  { rank: 1, name: 'Pedro L.', level: 51, score: 1489, flag: '🇺🇾' },
  { rank: 2, name: 'Miguel S.', level: 46, score: 1320, flag: '🇵🇪' },
  { rank: 3, name: 'Francisco', level: 42, score: 1301, flag: '🇦🇷' },
  { rank: 4, name: 'Você', level: 49, score: 1250, isYou: true, flag: '🇧🇷' },
  { rank: 5, name: 'Andrews T.', level: 44, score: 1180, flag: '🇺🇸' },
]

function rankCircleClass(rank: number) {
  if (rank === 1) return styles.rank1
  if (rank === 2) return styles.rank2
  if (rank === 3) return styles.rank3
  return styles.rankN
}

export function ClassificacoesClient() {
  const [scope, setScope] = useState<Scope>('pais')
  const podium = scope === 'pais' ? BR_PODIUM : MUNDIAL_PODIUM
  const list = scope === 'pais' ? BR_LIST : MUNDIAL_LIST
  const mundialActive = scope === 'mundial'

  return (
    <div className={styles.root}>
      <div className={styles.headRow}>
        <h1 className={styles.pageTitle}>Classificações</h1>
        <span className={styles.seasonPill}>Temporada Atual</span>
      </div>

      <div className={styles.toggleRow} role="tablist" aria-label="Âmbito do ranking">
        <button
          type="button"
          role="tab"
          aria-selected={!mundialActive}
          className={cn(styles.toggle, !mundialActive && styles.toggleActive)}
          onClick={() => setScope('pais')}
        >
          <span aria-hidden>🇧🇷</span>
          Meu País
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mundialActive}
          className={cn(styles.toggle, mundialActive && styles.toggleActive)}
          onClick={() => setScope('mundial')}
        >
          <FiGlobe style={{ width: '1rem', height: '1rem' }} aria-hidden />
          Mundial
        </button>
      </div>

      <p className={styles.scopeHint}>
        {mundialActive ? (
          <>
            <FiGlobe style={{ width: '1rem', height: '1rem', flexShrink: 0 }} aria-hidden />
            Ranking Mundial
          </>
        ) : (
          <>
            <span aria-hidden>🇧🇷</span>
            Ranking do Brasil BR
          </>
        )}
      </p>

      <section className={styles.card} aria-label="Pódio top 3">
        <div className={styles.podium}>
          <div className={styles.podiumCol}>
            <div className={styles.rankLabel}>#2</div>
            <div className={cn(styles.bar, styles.barSilver)} aria-hidden />
            <div className={styles.podiumAvatar}>
              <FiUser style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
            </div>
            <p className={styles.podiumName}>{podium.second.name}</p>
            <p className={styles.podiumScore}>{podium.second.score.toLocaleString('pt-BR')}</p>
          </div>

          <div className={styles.podiumCol}>
            <div className={styles.crownWrap} aria-hidden>
              <FaCrown style={{ width: '1.375rem', height: '1.375rem' }} />
            </div>
            <div className={styles.rankLabel} aria-hidden>
              &nbsp;
            </div>
            <div className={cn(styles.bar, styles.barGold)} aria-hidden />
            <div className={styles.podiumAvatar}>
              <FiUser style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
            </div>
            <p className={styles.podiumName}>{podium.first.name}</p>
            <p className={styles.podiumScore}>{podium.first.score.toLocaleString('pt-BR')}</p>
          </div>

          <div className={styles.podiumCol}>
            <div className={styles.rankLabel}>#3</div>
            <div className={cn(styles.bar, styles.barBronze)} aria-hidden />
            <div className={styles.podiumAvatar}>
              <FiUser style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
            </div>
            <p className={styles.podiumName}>{podium.third.name}</p>
            <p className={styles.podiumScore}>{podium.third.score.toLocaleString('pt-BR')}</p>
          </div>
        </div>
      </section>

      <section className={styles.card} aria-label="Lista de classificação">
        <h2 className={styles.listHeader}>
          {mundialActive ? (
            <>
              <FiGlobe style={{ width: '1rem', height: '1rem' }} aria-hidden />
              Ranking Mundial
            </>
          ) : (
            <>
              <span className={styles.listHeaderIcon} aria-hidden>
                🇧🇷
              </span>
              Ranking do Brasil
            </>
          )}
        </h2>

        <div className={styles.rows}>
          {list.map((row) => (
            <div
              key={`${scope}-${row.rank}`}
              className={cn(styles.row, row.flag && styles.rowWide, row.isYou && styles.rowYou)}
            >
              <div className={cn(styles.rankCircle, rankCircleClass(row.rank))}>{row.rank}</div>
              <div className={styles.rowAvatar}>
                <FiUser style={{ width: '1rem', height: '1rem' }} aria-hidden />
              </div>
              <div className={styles.rowText}>
                <p className={styles.rowName}>{row.name}</p>
                <p className={styles.rowLevel}>Nível {row.level}</p>
              </div>
              {row.flag ? <span className={styles.flagCell}>{row.flag}</span> : null}
              <div className={styles.scoreCell}>
                <FiAward className={styles.trophy} style={{ width: '0.9375rem', height: '0.9375rem' }} aria-hidden />
                {row.score.toLocaleString('pt-BR')}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
