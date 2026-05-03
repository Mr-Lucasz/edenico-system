'use client'

import { useState } from 'react'
import {
  FiStar,
  FiLock,
  FiMonitor,
  FiInfo,
} from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa'
import styles from './ConquistasStarsSection.module.scss'

type StarCategory = 'science' | 'technology' | 'arts' | 'relations' | 'service'

const TABS: { id: StarCategory; label: string; className: string }[] = [
  { id: 'science', label: 'Science', className: styles.tabScience },
  { id: 'technology', label: 'Technology', className: styles.tabTechnology },
  { id: 'arts', label: 'Arts', className: styles.tabArts },
  { id: 'relations', label: 'Relations', className: styles.tabRelations },
  { id: 'service', label: 'Service', className: styles.tabService },
]

const HERO_COPY: Record<
  StarCategory,
  { title: string; desc: string; bannerClass: string }
> = {
  science: {
    title: 'Desafios De Ciências',
    desc: 'Complete desafios e ganhe XP na área de SCIENCE',
    bannerClass: styles.heroScience,
  },
  technology: {
    title: 'Desafios De Tecnologia',
    desc: 'Complete desafios e ganhe XP na área de TECHNOLOGY',
    bannerClass: styles.heroTech,
  },
  arts: {
    title: 'Desafios De Artes',
    desc: 'Complete desafios e ganhe XP na área de ARTS',
    bannerClass: styles.heroArts,
  },
  relations: {
    title: 'Desafios Em Relações',
    desc: 'Complete desafios e ganhe XP na área de RELATIONS',
    bannerClass: styles.heroRelations,
  },
  service: {
    title: 'Desafios De Serviço',
    desc: 'Complete desafios e ganhe XP na área de SERVICE',
    bannerClass: styles.heroService,
  },
}

export function ConquistasStarsSection() {
  const [active, setActive] = useState<StarCategory>('technology')
  const hero = HERO_COPY[active]

  return (
    <section className={styles.zone} aria-label="Conquistas por área STARS">
      <div className={styles.tabRail}>
        <span className={styles.tabIntro}>Minhas Conquistas</span>
        <div className={styles.tabList} role="tablist" aria-label="Categorias STARS">
          {TABS.map((tab) => {
            const isActive = active === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`${styles.tab} ${tab.className} ${isActive ? styles.tabActive : ''}`}
                onClick={() => setActive(tab.id)}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className={styles.layout}>
        <div className={styles.mainCol}>
          <div className={`${styles.hero} ${hero.bannerClass}`}>
            <div className={styles.heroIcon} aria-hidden>
              <FiMonitor style={{ width: '1.5rem', height: '1.5rem' }} />
            </div>
            <div className={styles.heroText}>
              <h2 className={styles.heroTitle}>{hero.title}</h2>
              <p className={styles.heroDesc}>{hero.desc}</p>
            </div>
          </div>

          <div className={styles.grid}>
            <article className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <FiStar className={styles.cardIconMuted} style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                  <h3 className={styles.cardTitle}>Mago da Tecnologia</h3>
                </div>
                <FiLock style={{ width: '1rem', height: '1rem' }} className={styles.cardIconMuted} aria-hidden />
              </div>
              <div className={styles.barWrap}>
                <div className={styles.barLabels}>
                  <span>Progresso</span>
                  <span>0/1</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: '0%' }} />
                </div>
              </div>
              <div className={styles.cardMeta}>
                <p className={styles.restLabel}>1 restantes</p>
                <span className={styles.xpPill}>+1000 XP</span>
              </div>
              <div className={styles.cardActions}>
                <button type="button" className={styles.btnPrimary}>
                  <span aria-hidden>🏆</span> Conquistar
                </button>
                <button type="button" className={styles.btnGhost}>
                  <FiInfo style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  Detalhes
                </button>
              </div>
            </article>

            <article className={`${styles.card} ${styles.cardLocked}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <FiStar className={styles.cardIconMuted} style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                  <h3 className={styles.cardTitle}>Desafio bloqueado</h3>
                </div>
                <FiLock style={{ width: '1rem', height: '1rem' }} className={styles.cardIconMuted} aria-hidden />
              </div>
              <div className={styles.barWrap}>
                <div className={styles.barLabels}>
                  <span>Progresso</span>
                  <span>0/1</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: '0%' }} />
                </div>
              </div>
              <div className={styles.cardMeta}>
                <p className={styles.restLabel}>—</p>
                <span className={styles.xpPill}>+XP</span>
              </div>
              <div className={styles.cardActions}>
                <button type="button" className={styles.btnPrimary} disabled>
                  <span aria-hidden>🏆</span> Conquistar
                </button>
                <button type="button" className={styles.btnGhost} disabled>
                  <FiInfo style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  Detalhes
                </button>
              </div>
            </article>

            <article className={`${styles.card} ${styles.cardLocked}`}>
              <div className={styles.cardHeader}>
                <div className={styles.cardHeaderLeft}>
                  <FiStar className={styles.cardIconMuted} style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                  <h3 className={styles.cardTitle}>Desafio bloqueado</h3>
                </div>
                <FiLock style={{ width: '1rem', height: '1rem' }} className={styles.cardIconMuted} aria-hidden />
              </div>
              <div className={styles.barWrap}>
                <div className={styles.barLabels}>
                  <span>Progresso</span>
                  <span>0/1</span>
                </div>
                <div className={styles.barTrack}>
                  <div className={styles.barFill} style={{ width: '0%' }} />
                </div>
              </div>
              <div className={styles.cardMeta}>
                <p className={styles.restLabel}>—</p>
                <span className={styles.xpPill}>+XP</span>
              </div>
              <div className={styles.cardActions}>
                <button type="button" className={styles.btnPrimary} disabled>
                  <span aria-hidden>🏆</span> Conquistar
                </button>
                <button type="button" className={styles.btnGhost} disabled>
                  <FiInfo style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  Detalhes
                </button>
              </div>
            </article>

            <article className={`${styles.card} ${styles.cardDone}`}>
              <div className={styles.cardDoneHeader}>
                <div className={styles.doneLeft}>
                  <div className={styles.doneIconBox}>
                    <FiMonitor style={{ width: '1.125rem', height: '1.125rem' }} aria-hidden />
                  </div>
                  <h3 className={styles.doneTitle}>Explorador Digital</h3>
                </div>
                <FaCrown style={{ width: '0.95rem', height: '0.95rem', color: '#22c55e' }} aria-hidden />
              </div>
              <div className={styles.doneBadgeRow}>
                <span className={styles.tagSuccess}>✨ Conquistado!</span>
                <span className={styles.tagXpOutline}>+150 XP</span>
              </div>
              <p className={styles.doneDate}>Conquistado em 19 de jan. de 2024</p>
            </article>
          </div>
        </div>

        <aside className={styles.sidebar} aria-label="Estado das conquistas">
          <div className={styles.sideSection}>
            <div className={styles.sideHead}>
              <h3 className={styles.sideTitle}>Em revisão (Professor)</h3>
              <span className={styles.sideCount}>03</span>
            </div>
            <div className={styles.sideList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${styles.sideItem} ${styles.sideItemProfessor}`}>
                  <FiStar className={styles.sideItemIcon} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  <div className={styles.sideItemText}>
                    <p className={styles.sideItemTitle}>Envio #{i}</p>
                    <p className={styles.sideItemDesc}>Aguardando correção do professor.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sideSection}>
            <div className={styles.sideHead}>
              <h3 className={styles.sideTitle}>Em revisão (Aluno)</h3>
              <span className={styles.sideCount}>03</span>
            </div>
            <div className={styles.sideList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${styles.sideItem} ${styles.sideItemAluno}`}>
                  <FiStar className={styles.sideItemIcon} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  <div className={styles.sideItemText}>
                    <p className={styles.sideItemTitle}>Revisão pendente #{i}</p>
                    <p className={styles.sideItemDesc}>Devolução aguardando sua ação.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.sideSection}>
            <div className={styles.sideHead}>
              <h3 className={styles.sideTitle}>Conquistado!</h3>
              <span className={styles.sideCount}>03</span>
            </div>
            <div className={styles.sideList}>
              {[1, 2, 3].map((i) => (
                <div key={i} className={`${styles.sideItem} ${styles.sideItemDone}`}>
                  <FiStar className={styles.sideItemIcon} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  <div className={styles.sideItemText}>
                    <p className={styles.sideItemTitle}>Medalha registrada #{i}</p>
                    <p className={styles.sideItemDesc}>XP creditado na conta.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}
