'use client'

import Link from 'next/link'
import { FiArrowLeft, FiAward, FiMoon, FiPlay, FiStar, FiSun } from 'react-icons/fi'
import {
  getCategoriasTabsParaFaixa,
  getNiveisCards,
  tituloMetodologiaStars,
  type CategoriaId,
  type FaixaEtaria,
  type NivelCard,
} from '@src/infrastructure/data/mockAdminCursos'
import styles from './AdminCursosFaixaCategoria.module.scss'

type Props = {
  faixa: FaixaEtaria
  categoriaAtiva: CategoriaId
}

function LevelIcon({ card }: { card: NivelCard }) {
  if (card.icon === 'moon') return <FiMoon aria-hidden />
  if (card.icon === 'sun') return <FiSun aria-hidden />
  return <FiStar aria-hidden />
}

export function AdminCursosFaixaCategoria({ faixa, categoriaAtiva }: Props) {
  const tabs = getCategoriasTabsParaFaixa(faixa.id)
  const niveis = getNiveisCards(faixa.id, categoriaAtiva)

  return (
    <div className={styles.wrap}>
      <div className={styles.backRow}>
        <Link href="/admin/cursos" className={styles.back}>
          <FiArrowLeft aria-hidden />
          Voltar às Faixas Etárias
        </Link>
      </div>

      <header className={styles.head}>
        <h1 className={styles.title}>{tituloMetodologiaStars(faixa)}</h1>
        <p className={styles.sub}>Selecione uma categoria para gerenciar os cursos</p>
      </header>

      <div className={styles.tabsWrap} role="tablist" aria-label="Categorias STARS">
        {tabs.map((t) => {
          const active = t.id === categoriaAtiva
          return (
            <Link
              key={t.id}
              href={`/admin/cursos/${faixa.id}/${t.id}`}
              role="tab"
              aria-selected={active}
              className={`${styles.tab} ${active ? styles.tabActive : ''}`}
            >
              {t.label} ({t.count})
            </Link>
          )
        })}
      </div>

      <div className={styles.levelsRow}>
        {niveis.map((card) => (
          <article key={card.nivelId} className={styles.levelCard}>
            <div className={styles.levelTop}>
              <span className={styles.badge}>
                <FiAward aria-hidden />
                Certificado
              </span>
              <div className={styles.levelIcon}>
                <LevelIcon card={card} />
              </div>
              <h2 className={styles.levelTitle}>{card.titulo}</h2>
              <p className={styles.levelDesc}>{card.descricao}</p>
            </div>
            <div className={styles.levelBottom}>
              <div className={styles.tags}>
                {card.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className={styles.statsRow}>
                <div className={styles.statBox}>
                  <div className={styles.statVal}>{card.alunos}</div>
                  <div className={styles.statLab}>Alunos</div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statVal}>{card.cursos}</div>
                  <div className={styles.statLab}>Cursos</div>
                </div>
              </div>
              <Link
                href={`/admin/cursos/${faixa.id}/${categoriaAtiva}/${card.nivelId}`}
                className={styles.cta}
              >
                <FiPlay aria-hidden />
                {card.ctaLabel}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
