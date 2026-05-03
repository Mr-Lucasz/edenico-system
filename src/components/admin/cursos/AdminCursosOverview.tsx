'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { BsEmojiSmile } from 'react-icons/bs'
import { FaBaby, FaHeart } from 'react-icons/fa6'
import { FiAward, FiBookOpen, FiStar, FiUsers } from 'react-icons/fi'
import { LuGraduationCap } from 'react-icons/lu'
import {
  ADMIN_CURSOS_FAIXAS,
  ADMIN_CURSOS_RESUMO_GERAL,
  ADMIN_CURSOS_STARS_DISTRIBUICAO,
  getDefaultCategoriaId,
  type CategoriaId,
  type FaixaEtaria,
} from '@src/infrastructure/data/mockAdminCursos'
import styles from './AdminCursosOverview.module.scss'

function mapCategoriaLetter(_letter: string, nome: string): CategoriaId {
  const n = nome.toLowerCase()
  if (n.includes('science')) return 'science'
  if (n.includes('technology')) return 'technology'
  if (n.includes('arts')) return 'arts'
  if (n.includes('relations')) return 'relations'
  return 'service'
}

function FaixaIcon({ faixa }: { faixa: FaixaEtaria }) {
  if (faixa.icon === 'baby') return <FaBaby aria-hidden />
  if (faixa.icon === 'smile') return <BsEmojiSmile aria-hidden />
  if (faixa.icon === 'heart') return <FaHeart aria-hidden />
  return <FiStar aria-hidden />
}

function themeClasses(f: FaixaEtaria) {
  if (f.cardTheme === 'pink') return { top: styles.faixaTopPink, icon: styles.iPink, btn: styles.gPink }
  if (f.cardTheme === 'sky') return { top: styles.faixaTopSky, icon: styles.iSky, btn: styles.gSky }
  if (f.cardTheme === 'green') return { top: styles.faixaTopGreen, icon: styles.iGreen, btn: styles.gGreen }
  return { top: styles.faixaTopOrange, icon: styles.iOrange, btn: styles.gOrange }
}

const int = new Intl.NumberFormat('pt-BR')

export function AdminCursosOverview() {
  const [toast, setToast] = useState<string | null>(null)

  const starsLinks = useMemo(() => {
    return ADMIN_CURSOS_STARS_DISTRIBUICAO.map((s) => {
      const cat = mapCategoriaLetter(s.letter, s.nome)
      const faixaId = '8-10-anos' as const
      return { ...s, href: `/admin/cursos/${faixaId}/${cat}` as const }
    })
  }, [])

  function flash(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 3200)
  }

  return (
    <div className={styles.wrap}>
      {toast ? (
        <p role="status" aria-live="polite" style={{ margin: '0 0 1rem', fontSize: '0.875rem', color: '#374151' }}>
          {toast}
        </p>
      ) : null}

      <header className={styles.head}>
        <h1 className={styles.title}>Gestão de Cursos por Faixa Etária</h1>
        <p className={styles.sub}>Selecione uma faixa etária para gerenciar os cursos</p>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`} aria-hidden>
            <FiBookOpen />
          </div>
          <div>
            <div className={styles.statVal}>{int.format(ADMIN_CURSOS_RESUMO_GERAL.totalCursos)}</div>
            <div className={styles.statLabel}>Total de Cursos</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`} aria-hidden>
            <FiUsers />
          </div>
          <div>
            <div className={styles.statVal}>{int.format(ADMIN_CURSOS_RESUMO_GERAL.totalAlunos)}</div>
            <div className={styles.statLabel}>Total de Alunos</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconPurple}`} aria-hidden>
            <LuGraduationCap />
          </div>
          <div>
            <div className={styles.statVal}>{ADMIN_CURSOS_RESUMO_GERAL.faixasEtarias}</div>
            <div className={styles.statLabel}>Faixas Etárias</div>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIcon} ${styles.statIconAmber}`} aria-hidden>
            <FiAward />
          </div>
          <div>
            <div className={styles.statVal}>{ADMIN_CURSOS_RESUMO_GERAL.categoriasStars}</div>
            <div className={styles.statLabel}>Categorias STARS</div>
          </div>
        </div>
      </div>

      <div className={styles.faixasRow}>
        {ADMIN_CURSOS_FAIXAS.map((f) => {
          const t = themeClasses(f)
          const cat = getDefaultCategoriaId(f.id)
          const href = `/admin/cursos/${f.id}/${cat}`
          return (
            <article key={f.id} className={styles.faixaCard}>
              <div className={`${styles.faixaTop} ${t.top}`}>
                <div className={`${styles.faixaIconWrap} ${t.icon}`}>
                  <FaixaIcon faixa={f} />
                </div>
                <div className={styles.faixaRange}>{f.faixaLabel}</div>
                <div className={styles.faixaSeg}>{f.segmento}</div>
                <div className={styles.faixaMeta}>{f.cursosDisponiveis} Cursos disponíveis</div>
              </div>
              <div className={styles.faixaFoot}>
                <Link href={href} className={`${styles.btnGradient} ${t.btn}`}>
                  Gerenciar Cursos
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      <section className={styles.starsPanel} aria-labelledby="stars-dist-title">
        <div className={styles.starsHead}>
          <h2 id="stars-dist-title" className={styles.starsTitle}>
            Distribuição por Categoria STARS
          </h2>
          <p className={styles.starsSub}>Cursos organizados pelas metodologias STARS</p>
        </div>
        <div className={styles.starsRow}>
          {starsLinks.map((s) => (
            <Link
              key={`${s.letter}-${s.nome}`}
              href={s.href}
              className={styles.starsItem}
              title={`Abrir ${s.nome} (demo: faixa 8-10 anos)`}
              onClick={() => flash(`Abrindo ${s.nome} na faixa 8–10 anos (navegação demo).`)}
            >
              <div className={styles.starsCircle} style={{ background: s.color }}>
                {s.letter}
              </div>
              <div className={styles.starsCount}>{s.count}</div>
              <div className={styles.starsName}>{s.nome}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
