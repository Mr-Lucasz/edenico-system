'use client'

import { type ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { FiDollarSign, FiTrendingUp, FiUserCheck, FiUsers } from 'react-icons/fi'
import { LuGraduationCap } from 'react-icons/lu'
import styles from './AdminDashboardView.module.scss'

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const int = new Intl.NumberFormat('pt-BR')

const MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
const SERIES_STUDENTS = [820, 950, 1020, 1140, 1195, 1247]
const SERIES_REVENUE = [11800, 13100, 14100, 15600, 17100, 18420]

const STARS_SLICES = [
  { label: 'Technology', pct: 25, color: '#7b2cbf' },
  { label: 'Science', pct: 20, color: '#795548' },
  { label: 'Service', pct: 18, color: '#e53935' },
  { label: 'Relations', pct: 16, color: '#28a745' },
  { label: 'Arts', pct: 21, color: '#fb8c00' },
] as const

const PLANS = [
  { name: 'Básico', users: 428 },
  { name: 'Premium', users: 567 },
  { name: 'Premium Plus', users: 252 },
] as const

const COURSES = [
  { rank: 1, name: 'Introdução à Ciência', alunos: 342, pct: 87 },
  { rank: 2, name: 'Fundamentos de Tecnologia', alunos: 298, pct: 76 },
  { rank: 3, name: 'Artes e Criatividade', alunos: 256, pct: 65 },
  { rank: 4, name: 'Relações Humanas', alunos: 221, pct: 56 },
  { rank: 5, name: 'Serviço à Comunidade', alunos: 198, pct: 50 },
] as const

function pieSlicePath(cx: number, cy: number, r: number, startFrac: number, pct: number) {
  const start = -Math.PI / 2 + startFrac * 2 * Math.PI
  const end = -Math.PI / 2 + (startFrac + pct / 100) * 2 * Math.PI
  const x1 = cx + r * Math.cos(start)
  const y1 = cy + r * Math.sin(start)
  const x2 = cx + r * Math.cos(end)
  const y2 = cy + r * Math.sin(end)
  const large = end - start > Math.PI ? 1 : 0
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`
}

function LineGrowthChart() {
  const W = 520
  const H = 220
  const pl = 46
  const pr = 52
  const pt = 18
  const pb = 34
  const cw = W - pl - pr
  const ch = H - pt - pb
  const maxS = 1400
  const maxR = 20000
  const n = SERIES_STUDENTS.length

  const [activeIdx, setActiveIdx] = useState<number | null>(null)

  const xs = SERIES_STUDENTS.map((_, i) => pl + (i / (n - 1)) * cw)
  const ysS = SERIES_STUDENTS.map((v) => pt + ch - (v / maxS) * ch)
  const ysR = SERIES_REVENUE.map((v) => pt + ch - (v / maxR) * ch)

  const bandRects = useMemo(() => {
    const mids: number[] = []
    for (let i = 0; i < n - 1; i++) mids.push((xs[i] + xs[i + 1]) / 2)
    return xs.map((_, i) => {
      const x1 = i === 0 ? pl : mids[i - 1]
      const x2 = i === n - 1 ? W - pr : mids[i]
      return { x1, x2, w: x2 - x1 }
    })
  }, [xs, n, W, pl, pr])

  const pointsS = xs.map((x, i) => `${x},${ysS[i]}`).join(' ')
  const pointsR = xs.map((x, i) => `${x},${ysR[i]}`).join(' ')

  const yTicks = [0, 0.25, 0.5, 0.75, 1]
  const gridLines = yTicks.map((t) => {
    const y = pt + ch - t * ch
    return <line key={t} className={styles.gridLine} x1={pl} y1={y} x2={W - pr} y2={y} />
  })

  const leftLabels = yTicks.map((t) => {
    const v = Math.round(maxS * t)
    const y = pt + ch - t * ch + 4
    return (
      <text key={`ls-${t}`} className={styles.axisLabel} x={4} y={y}>
        {int.format(v)}
      </text>
    )
  })

  const rightLabels = yTicks.map((t) => {
    const v = Math.round(maxR * t)
    const y = pt + ch - t * ch + 4
    return (
      <text key={`lr-${t}`} className={styles.axisLabel} x={W - 6} y={y} textAnchor="end">
        {int.format(v)}
      </text>
    )
  })

  const monthLabels = MONTHS.map((m, i) => {
    const x = xs[i]
    return (
      <text key={m} className={styles.monthLabel} x={x} y={H - 8} textAnchor="middle">
        {m}
      </text>
    )
  })

  const clearActive = useCallback(() => setActiveIdx(null), [])

  return (
    <div className={styles.chartInteractiveWrap}>
      <svg
        className={styles.chartSvg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Gráfico de linhas"
        onMouseLeave={clearActive}
      >
        <title>Crescimento de estudantes e receita nos últimos 6 meses</title>
        {gridLines}
        <text className={styles.axisTitle} x={pl - 2} y={12}>
          Estudantes
        </text>
        <text className={styles.axisTitle} x={W - pr + 2} y={12} textAnchor="end">
          Receita (R$)
        </text>
        {leftLabels}
        {rightLabels}
        {activeIdx !== null && (
          <line
            className={styles.chartCrosshair}
            x1={xs[activeIdx]}
            y1={pt}
            x2={xs[activeIdx]}
            y2={pt + ch}
          />
        )}
        <polyline className={styles.lineStudents} points={pointsS} pointerEvents="none" />
        <polyline className={styles.lineRevenue} points={pointsR} pointerEvents="none" />
        {bandRects.map((b, i) => (
          <rect
            key={`band-${i}`}
            className={styles.chartHitBand}
            x={b.x1}
            y={pt}
            width={b.w}
            height={ch + pb}
            onMouseEnter={() => setActiveIdx(i)}
            onFocus={() => setActiveIdx(i)}
            onBlur={clearActive}
            tabIndex={0}
            aria-label={`${MONTHS[i]}: ${int.format(SERIES_STUDENTS[i])} estudantes, receita ${money.format(SERIES_REVENUE[i])}`}
          />
        ))}
        {xs.map((x, i) => (
          <circle
            key={`ds-${i}`}
            className={styles.dotStudents}
            cx={x}
            cy={ysS[i]}
            r={activeIdx === i ? 6 : 4}
            pointerEvents="none"
          />
        ))}
        {xs.map((x, i) => (
          <circle
            key={`dr-${i}`}
            className={styles.dotRevenue}
            cx={x}
            cy={ysR[i]}
            r={activeIdx === i ? 6 : 4}
            pointerEvents="none"
          />
        ))}
        {monthLabels}
      </svg>
      {activeIdx !== null && (
        <div
          className={styles.chartTooltip}
          style={{
            left: `${(xs[activeIdx] / W) * 100}%`,
            transform: 'translate(-50%, -10px)',
          }}
          role="status"
          aria-live="polite"
        >
          <p className={styles.chartTooltipTitle}>{MONTHS[activeIdx]}</p>
          <p className={styles.chartTooltipLine}>
            <span className={`${styles.chartTooltipSwatch} ${styles.chartTooltipSwatchDiamond}`} style={{ background: '#0056d2' }} />
            <span>
              Estudantes: <strong>{int.format(SERIES_STUDENTS[activeIdx])}</strong>
            </span>
          </p>
          <p className={styles.chartTooltipLine}>
            <span className={`${styles.chartTooltipSwatch} ${styles.chartTooltipSwatchDiamond}`} style={{ background: '#28a745' }} />
            <span>
              Receita: <strong>{money.format(SERIES_REVENUE[activeIdx])}</strong>
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

function sliceOutwardTransform(index: number, hovered: boolean) {
  if (!hovered) return undefined
  let startFrac = 0
  for (let j = 0; j < index; j++) startFrac += STARS_SLICES[j].pct / 100
  const midFrac = startFrac + STARS_SLICES[index].pct / 200
  const angle = -Math.PI / 2 + midFrac * 2 * Math.PI
  const push = 7
  const dx = Math.cos(angle) * push
  const dy = Math.sin(angle) * push
  return `translate(${dx},${dy})`
}

function PieStarsChart() {
  const cx = 100
  const cy = 100
  const r = 88
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)

  return (
    <div className={styles.pieChartInteractive}>
      <svg
        width={200}
        height={200}
        viewBox="0 0 200 200"
        role="img"
        aria-label="Gráfico pizza STARS"
        className={styles.pieSvg}
        onMouseLeave={() => setHoverIdx(null)}
      >
        <title>Distribuição de estudantes por dimensão STARS</title>
        {STARS_SLICES.map((s, i) => {
          let startFrac = 0
          for (let j = 0; j < i; j++) startFrac += STARS_SLICES[j].pct / 100
          const d = pieSlicePath(cx, cy, r, startFrac, s.pct)
          const t = sliceOutwardTransform(i, hoverIdx === i)
          return (
            <g key={s.label} transform={t} className={styles.pieSliceGroup}>
              <path
                d={d}
                fill={s.color}
                stroke="#fff"
                strokeWidth={hoverIdx === i ? 2 : 1}
                className={styles.pieSlice}
                onMouseEnter={() => setHoverIdx(i)}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx(null)}
                tabIndex={0}
                aria-label={`${s.label}, ${s.pct}%`}
              />
            </g>
          )
        })}
      </svg>
      {hoverIdx !== null && (
        <div className={styles.pieTooltip} role="status" aria-live="polite">
          <span className={styles.pieTooltipName}>{STARS_SLICES[hoverIdx].label}</span>
          <span className={styles.pieTooltipPct}>{STARS_SLICES[hoverIdx].pct}%</span>
        </div>
      )}
    </div>
  )
}

function TrendUp({ children }: { children: ReactNode }) {
  return (
    <p className={styles.cardStatTrend}>
      <FiTrendingUp className={styles.trendIcon} aria-hidden />
      {children}
    </p>
  )
}

export function AdminDashboardView() {
  const maxPlanUsers = Math.max(...PLANS.map((p) => p.users))
  const [barsReady, setBarsReady] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => setBarsReady(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div className={styles.dashboardRoot}>
      <h1 className={styles.pageTitle}>Dashboard</h1>
      <p className={styles.pageSubtitle}>Visão geral do sistema Edênicos Academy</p>

      <div className={`${styles.grid4} ${styles.rowTight}`}>
        <article className={`${styles.card} ${styles.cardStat}`}>
          <p className={styles.cardStatLabel}>Total de Estudantes</p>
          <p className={styles.cardStatValue}>{int.format(1247)}</p>
          <TrendUp>+12% esse mês</TrendUp>
          <div className={`${styles.statIcon} ${styles.statIconBlue}`} aria-hidden>
            <FiUsers />
          </div>
        </article>
        <article className={`${styles.card} ${styles.cardStat}`}>
          <p className={styles.cardStatLabel}>Pais Cadastrados</p>
          <p className={styles.cardStatValue}>{int.format(856)}</p>
          <TrendUp>+3% este mês</TrendUp>
          <div className={`${styles.statIcon} ${styles.statIconPurple}`} aria-hidden>
            <FiUserCheck />
          </div>
        </article>
        <article className={`${styles.card} ${styles.cardStat}`}>
          <p className={styles.cardStatLabel}>Professores</p>
          <p className={styles.cardStatValue}>{int.format(47)}</p>
          <TrendUp>+3 este mês</TrendUp>
          <div className={`${styles.statIcon} ${styles.statIconOrange}`} aria-hidden>
            <LuGraduationCap />
          </div>
        </article>
        <article className={`${styles.card} ${styles.cardStat}`}>
          <p className={styles.cardStatLabel}>Receita Mensal</p>
          <p className={styles.cardStatValue}>{money.format(18420)}</p>
          <TrendUp>+15% este mês</TrendUp>
          <div className={`${styles.statIcon} ${styles.statIconGreen}`} aria-hidden>
            <FiDollarSign />
          </div>
        </article>
      </div>

      <div className={`${styles.grid4} ${styles.rowLoose}`}>
        <article className={styles.card}>
          <p className={styles.cardSimpleTitle}>Total de Cursos</p>
          <p className={styles.cardSimpleValue}>{int.format(156)} cursos ativos</p>
        </article>
        <article className={styles.card}>
          <p className={styles.cardSimpleTitle}>Cursos Completados</p>
          <p className={styles.cardSimpleValue}>{int.format(3421)} totais</p>
        </article>
        <article className={styles.card}>
          <p className={styles.cardSimpleTitle}>Horas de Conteúdo</p>
          <p className={styles.cardSimpleValue}>{int.format(8940)}h disponíveis</p>
        </article>
        <article className={styles.card}>
          <p className={styles.cardSimpleTitle}>Horas Completadas</p>
          <p className={styles.cardSimpleValue}>{int.format(5678)}h pelos alunos</p>
        </article>
      </div>

      <div className={styles.chartsRow}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Crescimento de Estudantes e Receita</h2>
          <p className={styles.cardSubtitle}>Últimos 6 meses</p>
          <LineGrowthChart />
          <div className={styles.lineLegend}>
            <span className={styles.lineLegendItem}>
              <span className={`${styles.lineLegendSwatch} ${styles.lineLegendSwatchDiamond}`} style={{ background: '#0056d2' }} />
              Estudantes
            </span>
            <span className={styles.lineLegendItem}>
              <span className={`${styles.lineLegendSwatch} ${styles.lineLegendSwatchDiamond}`} style={{ background: '#28a745' }} />
              Receita (R$)
            </span>
          </div>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Estudantes por Dimensão STARS</h2>
          <p className={styles.cardSubtitle}>Distribuição atual</p>
          <div className={styles.pieRow}>
            <PieStarsChart />
            <ul className={styles.pieLegend}>
              {STARS_SLICES.map((s) => (
                <li key={s.label} className={styles.pieLegendItem}>
                  <span className={styles.pieDot} style={{ background: s.color }} />
                  {s.label}
                  <span className={styles.piePct}>{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </div>

      <div className={styles.bottomRow}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Distribuição de Planos</h2>
          <p className={styles.cardSubtitle}>Total de {int.format(1247)} assinantes ativos</p>
          {PLANS.map((p) => (
            <div key={p.name} className={styles.planRow}>
              <div className={styles.planHead}>
                <span className={styles.planName}>{p.name}</span>
                <span className={styles.planCount}>{int.format(p.users)} usuários</span>
              </div>
              <div className={styles.planTrack}>
                <div
                  className={styles.planFill}
                  style={{ width: barsReady ? `${(p.users / maxPlanUsers) * 100}%` : '0%' }}
                />
              </div>
            </div>
          ))}
          <div className={styles.planFooter}>
            <span className={styles.planFooterLabel}>Receita Total</span>
            <span className={styles.planFooterValue}>{money.format(124850.5)}</span>
          </div>
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Cursos Mais Populares</h2>
          <p className={styles.cardSubtitle}>Baseado em número de estudantes</p>
          {COURSES.map((c) => (
            <div key={c.rank} className={styles.courseRow}>
              <div className={styles.courseLeft}>
                <span className={styles.courseRank}>{c.rank}.</span>
                <span className={styles.courseName}>{c.name}</span>
                <span className={styles.courseAlunos}>{int.format(c.alunos)} alunos</span>
              </div>
              <div className={styles.courseRight}>
                <div className={styles.courseBarTrack}>
                  <div
                    className={styles.courseBarFill}
                    style={{ width: barsReady ? `${c.pct}%` : '0%' }}
                  />
                </div>
                <span className={styles.coursePct}>{c.pct}%</span>
              </div>
            </div>
          ))}
        </article>
      </div>
    </div>
  )
}
