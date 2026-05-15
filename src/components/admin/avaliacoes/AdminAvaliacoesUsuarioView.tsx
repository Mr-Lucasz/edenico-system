'use client'

import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import {
  FiArrowLeft,
  FiBell,
  FiBook,
  FiEdit2,
  FiMail,
  FiPlus,
  FiShield,
  FiTarget,
  FiUser,
} from 'react-icons/fi'
import { DETALHE_ANA_CLARA, DIMENSOES_META, getUsuarioCard } from './avaliacoesMock'
import styles from './AdminAvaliacoesUsuarioView.module.scss'

type TabKey = 'auto' | 'adm' | 'final'

function Stars({ value }: { value: number }) {
  const v = Math.round(value)
  return (
    <span className={styles.starsRow} aria-label={`Nota ${value}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`${styles.star} ${i <= v ? styles.starOn : ''}`} aria-hidden>
          ★
        </span>
      ))}
    </span>
  )
}

function radarPoints(values: number[], cx: number, cy: number, maxR: number): string {
  const n = values.length
  return values
    .map((raw, i) => {
      const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
      const r = (Math.min(5, Math.max(0, raw)) / 5) * maxR
      const x = cx + r * Math.cos(angle)
      const y = cy + r * Math.sin(angle)
      return `${x},${y}`
    })
    .join(' ')
}

function axisLabelPos(i: number, n: number, cx: number, cy: number, r: number) {
  const angle = -Math.PI / 2 + (2 * Math.PI * i) / n
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
}

function RadarComparativo({
  labels,
  auto,
  adm,
}: {
  labels: string[]
  auto: number[]
  adm: number[]
}) {
  const cx = 140
  const cy = 110
  const maxR = 72
  const n = labels.length
  const ptsAuto = radarPoints(auto, cx, cy, maxR)
  const ptsAdm = radarPoints(adm, cx, cy, maxR)

  const ring = (scale: number) => radarPoints(Array.from({ length: n }, () => 5 * scale), cx, cy, maxR)

  return (
    <svg viewBox="0 0 280 240" width="280" height="240" aria-label="Gráfico radar comparativo">
      <polygon points={ring(0.33)} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <polygon points={ring(0.66)} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      <polygon points={ring(1)} fill="none" stroke="#e5e7eb" strokeWidth="1" />
      {labels.map((_, i) => {
        const p = axisLabelPos(i, n, cx, cy, maxR)
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#e5e7eb" strokeWidth="1" />
      })}
      <polygon points={ptsAuto} fill="rgb(37 99 235 / 0.22)" stroke="#2563eb" strokeWidth="2" />
      <polygon points={ptsAdm} fill="rgb(147 51 234 / 0.2)" stroke="#9333ea" strokeWidth="2" />
      {labels.map((label, i) => {
        const p = axisLabelPos(i, n, cx, cy, maxR + 22)
        return (
          <text
            key={label}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fill="#6b7280"
          >
            {label.length > 18 ? `${label.slice(0, 16)}…` : label}
          </text>
        )
      })}
    </svg>
  )
}

export function AdminAvaliacoesUsuarioView() {
  const params = useParams()
  const searchParams = useSearchParams()
  const dimensaoId = typeof params.dimensaoId === 'string' ? params.dimensaoId : ''
  const usuarioId = typeof params.usuarioId === 'string' ? params.usuarioId : ''

  const meta = DIMENSOES_META[dimensaoId]
  const usuario = useMemo(() => getUsuarioCard(dimensaoId, usuarioId), [dimensaoId, usuarioId])

  const [tab, setTab] = useState<TabKey>('auto')
  const [obs, setObs] = useState('')

  useEffect(() => {
    const a = searchParams.get('aba')
    if (a === 'adm') {
      setTab('adm')
    } else if (a === 'final') {
      setTab('final')
    } else {
      setTab('auto')
    }
  }, [searchParams])

  const temDetalhe = usuarioId === 'ana-clara-silva' && dimensaoId === 'fisica'
  const d = DETALHE_ANA_CLARA

  if (!meta || !usuario) {
    return (
      <div className={styles.root}>
        <p className={styles.notFound}>Usuário ou dimensão não encontrados.</p>
        <Link href="/admin/avaliacoes" className={styles.backLink}>
          <FiArrowLeft aria-hidden />
          Voltar
        </Link>
      </div>
    )
  }

  const finalPct = temDetalhe ? Math.min(100, (d.final / 5) * 100) : 70

  return (
    <div className={styles.root}>
      <div className={styles.topBar}>
        <Link href={`/admin/avaliacoes/${dimensaoId}`} className={styles.backLink}>
          <FiArrowLeft aria-hidden />
          Voltar
        </Link>
        <button type="button" className={styles.bellBtn} aria-label="Notificações">
          <FiBell aria-hidden />
          <span className={styles.bellDot} aria-hidden />
        </button>
      </div>

      <div className={styles.profileRow}>
        <div className={styles.profileLeft}>
          <div className={styles.avatarLg} aria-hidden>
            {usuario.iniciais}
          </div>
          <div>
            <h1 className={styles.profileName}>{usuario.nome}</h1>
            <p className={styles.profileEmail}>{usuario.email}</p>
            <div className={styles.tagRow}>
              {usuario.papel === 'estudante' ? (
                <span className={styles.tagEstudante}>
                  <FiUser aria-hidden />
                  Estudante
                </span>
              ) : (
                <span className={styles.tagEstudante} style={{ background: '#f3f4f6', color: '#4b5563' }}>
                  <FiBook aria-hidden />
                  Docente
                </span>
              )}
              <span className={styles.tagDim}>
                <FiTarget aria-hidden />
                {meta.titulo}
              </span>
              <span className={styles.tagSem}>{temDetalhe ? d.semestre : 'Semestre 2/2025'}</span>
            </div>
          </div>
        </div>

        <div className={styles.summaryCard}>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Autoavaliação</span>
            <span className={styles.summaryVal}>
              <span className={styles.starGold} aria-hidden>
                ★
              </span>
              {temDetalhe ? d.auto.toFixed(1).replace('.', ',') : '—'}
            </span>
          </div>
          <div className={styles.summaryRow}>
            <span className={styles.summaryLabel}>Avaliação ADM</span>
            <span className={styles.summaryVal}>
              <span className={styles.starGold} aria-hidden>
                ★
              </span>
              {temDetalhe ? d.adm.toFixed(1).replace('.', ',') : '—'}
            </span>
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryRow}>
            <span className={styles.summaryFinalLabel}>Nota Final</span>
            <span className={styles.summaryFinalVal}>
              <span className={styles.starGreen} aria-hidden>
                ★
              </span>
              {temDetalhe ? d.final.toFixed(1).replace('.', ',') : '—'}
            </span>
          </div>
          <div className={styles.progressBar} aria-hidden>
            <div className={styles.progressFill} style={{ width: `${finalPct}%` }} />
          </div>
        </div>
      </div>

      <div className={styles.tabRail} role="tablist" aria-label="Tipo de avaliação">
        {(
          [
            { id: 'auto' as const, label: 'Autoavaliação' },
            { id: 'adm' as const, label: 'Avaliação ADM' },
            { id: 'final' as const, label: 'Nota Final' },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ''}`}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {!temDetalhe ? (
        <p className={styles.notFound}>
          Conteúdo detalhado das abas está disponível na demo para <strong>Ana Clara Silva</strong> na dimensão{' '}
          <strong>Física</strong>.
        </p>
      ) : tab === 'auto' ? (
        <>
          <div className={styles.panelHead}>
            <div>
              <h2 className={styles.panelTitle}>Autoavaliação</h2>
              <p className={styles.panelSub}>Avaliação realizada pelo próprio usuário</p>
            </div>
            <button type="button" className={styles.btnGhostSm}>
              <FiPlus aria-hidden />
              Criar Nova Seção
            </button>
          </div>
          {d.secoesAuto.map((sec) => (
            <section key={sec.id} className={styles.secaoCard}>
              <div className={styles.secaoHead}>
                <h3 className={styles.secaoTitle}>{sec.titulo}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className={styles.secaoScore}>
                    <span className={styles.starGold} aria-hidden>
                      ★
                    </span>
                    Nota da Seção: {sec.notaSecao.toFixed(1).replace('.', ',')}
                  </span>
                  <button type="button" className={styles.iconBtn} aria-label="Editar seção">
                    <FiEdit2 aria-hidden />
                  </button>
                </div>
              </div>
              {sec.indicadores.map((ind) => (
                <div key={ind.id} className={styles.indRow}>
                  <span className={styles.indText}>{ind.texto}</span>
                  <Stars value={ind.nota} />
                  <span className={styles.indNum}>{ind.nota.toFixed(1).replace('.', ',')}</span>
                </div>
              ))}
              <button type="button" className={styles.addInd}>
                <FiPlus aria-hidden />
                Adicionar Indicador
              </button>
            </section>
          ))}
        </>
      ) : tab === 'adm' ? (
        <>
          <div className={styles.panelHead}>
            <div>
              <h2 className={styles.panelTitle}>Avaliação Administrativa</h2>
              <p className={styles.panelSub}>Avaliação realizada pelos administradores</p>
            </div>
            <button type="button" className={styles.btnGhostSm}>
              <FiPlus aria-hidden />
              Criar Nova Seção
            </button>
          </div>
          {d.secoesAdm.map((sec) => (
            <section key={sec.id} className={styles.secaoCard}>
              <div className={styles.secaoHead}>
                <h3 className={styles.secaoTitle}>{sec.titulo}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span className={styles.secaoScore}>
                    <span className={styles.starGold} aria-hidden>
                      ★
                    </span>
                    Nota da Seção: {sec.notaSecao.toFixed(1).replace('.', ',')}
                  </span>
                  <button type="button" className={styles.iconBtn} aria-label="Editar seção">
                    <FiEdit2 aria-hidden />
                  </button>
                </div>
              </div>
              {sec.indicadores.map((ind) => (
                <div key={ind.id} className={styles.indRow}>
                  <span className={styles.indText}>{ind.texto}</span>
                  <Stars value={ind.nota} />
                  <span className={styles.indNum}>{ind.nota.toFixed(1).replace('.', ',')}</span>
                </div>
              ))}
              <button type="button" className={styles.addInd}>
                <FiPlus aria-hidden />
                Adicionar Indicador
              </button>
            </section>
          ))}
        </>
      ) : (
        <>
          <div className={styles.heroFinal}>
            <div className={styles.heroEmoji} aria-hidden>
              💪
            </div>
            <h2 className={styles.heroTitle}>Nota Final - Dimensão {meta.titulo}</h2>
            <div className={styles.heroScore}>
              <span className={styles.starGold} aria-hidden>
                ★
              </span>
              {d.final.toFixed(1).replace('.', ',')}
            </div>
            <div className={styles.heroBar}>
              <div className={styles.heroBarFill} style={{ width: `${finalPct}%` }} />
            </div>
            <span className={styles.badgeBom}>Bom</span>
          </div>

          <div className={styles.row2}>
            <div className={styles.miniCard}>
              <div className={styles.miniCardTop}>
                <span className={styles.miniIcon} style={{ background: '#dbeafe', color: '#1d4ed8' }}>
                  <FiUser aria-hidden />
                </span>
                <span className={styles.miniTitle}>Autoavaliação</span>
              </div>
              <p className={styles.miniPeso}>Peso: 50%</p>
              <div className={styles.summaryVal} style={{ marginBottom: '0.35rem' }}>
                <span className={styles.starGold} aria-hidden>
                  ★
                </span>
                {d.auto.toFixed(1).replace('.', ',')}
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(d.auto / 5) * 100}%` }} />
              </div>
            </div>
            <div className={styles.miniCard}>
              <div className={styles.miniCardTop}>
                <span className={styles.miniIcon} style={{ background: '#fce7f3', color: '#be185d' }}>
                  <FiShield aria-hidden />
                </span>
                <span className={styles.miniTitle}>Avaliação ADM</span>
              </div>
              <p className={styles.miniPeso}>Peso: 50%</p>
              <div className={styles.summaryVal} style={{ marginBottom: '0.35rem' }}>
                <span style={{ color: '#9333ea' }} aria-hidden>
                  ★
                </span>
                {d.adm.toFixed(1).replace('.', ',')}
              </div>
              <div className={styles.progressBar}>
                <div className={styles.progressFill} style={{ width: `${(d.adm / 5) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className={styles.formulaBlock}>
            <p className={styles.formulaLabel}>Fórmula de Cálculo:</p>
            <p className={styles.formulaEq}>
              ({d.auto.toFixed(1).replace('.', ',')} + {d.adm.toFixed(1).replace('.', ',')}) ÷ 2 ={' '}
              <span className={styles.formulaRes}>{d.final.toFixed(1).replace('.', ',')}</span>
            </p>
            <p className={styles.formulaHint}>
              A Nota Final é a média aritmética entre a Autoavaliação e a Avaliação ADM
            </p>
          </div>

          <div className={styles.tableCard}>
            <h3 className={styles.tableTitle}>Comparativo por Seções</h3>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th />
                  <th>Autoavaliação</th>
                  <th>Avaliação ADM</th>
                  <th>Diferença</th>
                </tr>
              </thead>
              <tbody>
                {d.comparativoSecoes.map((row) => {
                  const diff = row.adm - row.auto
                  const sign = diff >= 0 ? '+ ' : ''
                  return (
                    <tr key={row.secao}>
                      <td style={{ fontWeight: 600 }}>{row.secao}</td>
                      <td>
                        <span className={styles.starGold} aria-hidden>
                          ★
                        </span>{' '}
                        {row.auto.toFixed(1).replace('.', ',')}
                      </td>
                      <td>
                        <span style={{ color: '#9333ea' }} aria-hidden>
                          ★
                        </span>{' '}
                        {row.adm.toFixed(1).replace('.', ',')}
                      </td>
                      <td>
                        <span className={styles.badgeDiff}>
                          {sign}
                          {diff.toFixed(1).replace('.', ',')}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className={styles.alertGreen}>
              <span aria-hidden>
                🍓
              </span>
              Desempenho Excelente em todas as áreas
            </div>
          </div>

          <div className={styles.chartCard}>
            <h3 className={styles.chartTitle}>Gráfico Visual - Comparativo</h3>
            <p className={styles.chartSub}>Visualização das notas por seção</p>
            <div className={styles.radarWrap}>
              <RadarComparativo
                labels={d.comparativoSecoes.map((r) => r.secao)}
                auto={d.comparativoSecoes.map((r) => r.auto)}
                adm={d.comparativoSecoes.map((r) => r.adm)}
              />
              <div className={styles.legend}>
                <span className={styles.legendItem}>
                  <span className={styles.legendSq} style={{ background: '#2563eb' }} aria-hidden />
                  Autoavaliação
                </span>
                <span className={styles.legendItem}>
                  <span className={styles.legendSq} style={{ background: '#9333ea' }} aria-hidden />
                  Avaliação ADM
                </span>
              </div>
            </div>
          </div>

          <div className={styles.obsCard}>
            <h3 className={styles.obsTitle}>Observações do Administrador</h3>
            <textarea
              className={styles.textarea}
              placeholder="Adicione comentários sobre esta avaliação, pontos fortes observados, áreas de melhoria recomendadas..."
              maxLength={1000}
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              aria-label="Observações do administrador"
            />
            <div className={styles.obsFooter}>
              <span className={styles.charCount}>{obs.length}/1000 caracteres</span>
              <button type="button" className={styles.btnSaveObs}>
                Salvar Observação
              </button>
            </div>
          </div>

          <div className={styles.footerActions}>
            <button type="button" className={styles.btnFooter}>
              Exportar Avaliação Completa (PDF)
            </button>
            <button type="button" className={styles.btnFooter}>
              <FiMail aria-hidden />
              Enviar Resultado por Email
            </button>
          </div>
        </>
      )}
    </div>
  )
}
