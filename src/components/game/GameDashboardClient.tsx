'use client'

import Link from 'next/link'
import {
  FiClock,
  FiFolder,
  FiAward,
  FiTrendingUp,
  FiHexagon,
  FiZap,
  FiHeart,
  FiUser,
  FiGlobe,
  FiMessageCircle,
} from 'react-icons/fi'
import { GameLifePromoSection } from '@src/components/game/GameLifePromoSection'
import styles from './GameDashboardClient.module.scss'

export function GameDashboardClient() {
  return (
    <div className={styles.root}>
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Tempo Total</p>
              <p className={styles.statValue}>51d 23h</p>
            </div>
            <FiClock className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#3b82f6' }} aria-hidden />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Fases Completas</p>
              <p className={styles.statValue}>25/80</p>
            </div>
            <FiFolder className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#22c55e' }} aria-hidden />
          </div>
          <div className={styles.progressFoot}>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: '31%' }} />
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Conquistas: América</p>
              <p className={styles.statValue}>13/50</p>
            </div>
            <FiAward className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#eab308' }} aria-hidden />
          </div>
          <div className={styles.progressFoot}>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: '26%' }} />
            </div>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Ranking</p>
              <p className={styles.statValue}>#10</p>
              <p className={styles.statSub}>↑ 2 posições</p>
            </div>
            <FiTrendingUp className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#f97316' }} aria-hidden />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Moedas</p>
              <p className={styles.statValue}>12.450</p>
            </div>
            <FiHexagon className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#eab308' }} aria-hidden />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Raios</p>
              <p className={styles.statValue}>89</p>
            </div>
            <FiZap className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#eab308' }} aria-hidden />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Vidas</p>
              <p className={styles.statValue}>07</p>
            </div>
            <FiHeart className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#ef4444' }} aria-hidden />
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statTop}>
            <div>
              <p className={styles.statLabel}>Nivel</p>
              <p className={styles.statValue}>47</p>
              <p className={styles.statLabel} style={{ marginTop: '0.25rem' }}>
                8750/10000 XP
              </p>
            </div>
            <FiAward className={styles.statIcon} style={{ width: '1.5rem', height: '1.5rem', color: '#f97316' }} aria-hidden />
          </div>
          <div className={styles.progressFoot}>
            <div className={styles.track}>
              <div className={styles.fill} style={{ width: '87.5%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.bigCards}>
        <Link href="/comunidade/personagens" className={`${styles.bigCard} ${styles.bigPurple}`}>
          <FiUser className={styles.bigIcon} style={{ width: '2rem', height: '2rem', color: '#fff' }} aria-hidden />
          <h3 className={styles.bigTitle}>Personagens</h3>
          <p className={styles.bigDesc}>Veja e gerencie seus personagens</p>
        </Link>
        <Link href="/comunidade/niveis" className={`${styles.bigCard} ${styles.bigGreen}`}>
          <FiGlobe className={styles.bigIcon} style={{ width: '2rem', height: '2rem', color: '#fff' }} aria-hidden />
          <h3 className={styles.bigTitle}>Níveis</h3>
          <p className={styles.bigDesc}>Desbloqueie novos continentes</p>
        </Link>
        <Link href="/comunidade/social" className={`${styles.bigCard} ${styles.bigBlue}`}>
          <FiMessageCircle className={styles.bigIcon} style={{ width: '2rem', height: '2rem', color: '#fff' }} aria-hidden />
          <h3 className={styles.bigTitle}>Social</h3>
          <p className={styles.bigDesc}>Amigos, times e comunidade</p>
        </Link>
      </div>

      <GameLifePromoSection />
    </div>
  )
}
