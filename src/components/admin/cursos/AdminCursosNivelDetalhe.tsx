'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FiArrowLeft, FiBookOpen, FiSettings, FiUsers } from 'react-icons/fi'
import { LuAward } from 'react-icons/lu'
import {
  subtituloNivelLista,
  tituloNivelLista,
  type CategoriaId,
  type CursoAdminCard,
  type FaixaEtaria,
  type NivelDetalhe,
  type NivelId,
} from '@src/infrastructure/data/mockAdminCursos'
import styles from './AdminCursosNivelDetalhe.module.scss'

const TAB_LABELS: Record<CategoriaId, string> = {
  science: 'Science',
  technology: 'Technology',
  arts: 'Arts',
  relations: 'Relations',
  service: 'Service',
}

const int = new Intl.NumberFormat('pt-BR')

type Props = {
  faixa: FaixaEtaria
  categoriaId: CategoriaId
  nivelId: NivelId
  detalhe: NivelDetalhe
}

function CourseRow({
  curso,
  onAdmin,
}: {
  curso: CursoAdminCard
  onAdmin: (titulo: string) => void
}) {
  return (
    <article className={styles.courseCard}>
      <h2 className={styles.courseTitle}>{curso.titulo}</h2>
      <p className={styles.courseDesc}>{curso.descricao}</p>
      <div className={styles.progressWrap}>
        <div className={styles.progressTop}>
          <span>Progresso médio</span>
          <span>{curso.progressoPct}%</span>
        </div>
        <div className={styles.track} aria-hidden>
          <div className={styles.fill} style={{ width: `${curso.progressoPct}%` }} />
        </div>
      </div>
      <div className={styles.meta}>
        {curso.duracaoLabel} · {int.format(curso.alunos)} alunos
      </div>
      <button type="button" className={styles.adminBtn} onClick={() => onAdmin(curso.titulo)}>
        <FiSettings aria-hidden />
        Administrar
      </button>
    </article>
  )
}

export function AdminCursosNivelDetalhe({ faixa, categoriaId, nivelId, detalhe }: Props) {
  const [toast, setToast] = useState<string | null>(null)
  const catLabel = TAB_LABELS[categoriaId]
  const backHref = `/admin/cursos/${faixa.id}/${categoriaId}`

  const createHref = useMemo(() => {
    const q = new URLSearchParams({
      returnTo: `/admin/cursos/${faixa.id}/${categoriaId}/${nivelId}`,
      faixa: faixa.id,
      categoria: categoriaId,
      nivel: nivelId,
    })
    return `/admin/cursos/criar?${q.toString()}`
  }, [faixa.id, categoriaId, nivelId])

  function flash(msg: string) {
    setToast(msg)
    window.setTimeout(() => setToast(null), 3400)
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.topRow}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: '1 1 auto' }}>
          <Link href={backHref} className={styles.back}>
            <FiArrowLeft aria-hidden />
            Voltar aos Níveis
          </Link>
          <div className={styles.headBlock}>
            <h1 className={styles.title}>{tituloNivelLista(catLabel, nivelId)}</h1>
            <p className={styles.sub}>{subtituloNivelLista(faixa, detalhe.resumoCursosNivel)}</p>
          </div>
        </div>
        <Link href={createHref} className={styles.createBtn}>
          + Criar Novo Curso
        </Link>
      </div>

      {toast ? (
        <p className={styles.toast} role="status" aria-live="polite">
          {toast}
        </p>
      ) : null}

      <div className={styles.summaryRow}>
        <div className={styles.sumCard}>
          <div className={`${styles.sumIcon} ${styles.purple}`} aria-hidden>
            <FiBookOpen />
          </div>
          <div>
            <div className={styles.sumVal}>{detalhe.resumoCursosNivel}</div>
            <div className={styles.sumLab}>
              {nivelId === 'basico' && 'Cursos Nível Básico'}
              {nivelId === 'intermedio' && 'Cursos Nível Intermédio'}
              {nivelId === 'avancado' && 'Cursos Nível Avanzado'}
            </div>
          </div>
        </div>
        <div className={styles.sumCard}>
          <div className={`${styles.sumIcon} ${styles.blue}`} aria-hidden>
            <FiUsers />
          </div>
          <div>
            <div className={styles.sumVal}>{int.format(detalhe.resumoAlunosInscritos)}</div>
            <div className={styles.sumLab}>Alunos Inscritos</div>
          </div>
        </div>
        <div className={styles.sumCard}>
          <div className={`${styles.sumIcon} ${styles.green}`} aria-hidden>
            <LuAward />
          </div>
          <div>
            <div className={styles.sumVal}>{int.format(detalhe.resumoCursosCompletos)}</div>
            <div className={styles.sumLab}>Cursos Completos</div>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {detalhe.cursos.map((c) => (
          <CourseRow
            key={c.id}
            curso={c}
            onAdmin={(titulo) =>
              flash(`Administrar “${titulo}”: painel de edição e turmas (demo).`)
            }
          />
        ))}
      </div>
    </div>
  )
}
