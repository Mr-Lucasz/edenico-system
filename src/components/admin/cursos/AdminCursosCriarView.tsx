'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FiArrowLeft,
  FiChevronLeft,
  FiChevronRight,
  FiSave,
  FiSearch,
} from 'react-icons/fi'
import {
  ADMIN_CURSOS_NIVEL_SELECT_OPTIONS,
  ADMIN_CURSOS_STARS_SELECT_OPTIONS,
  isCategoriaId,
  isNivelId,
  type CategoriaId,
  type NivelId,
} from '@src/infrastructure/data/mockAdminCursos'
import {
  ADMIN_CURSOS_DOCENTES_MOCK,
  ADMIN_CURSOS_DOCENTES_PAGE_SIZE,
} from '@src/infrastructure/data/mockAdminCursosDocentes'
import { AdminCursosCriarEstrutura, type UnitState } from './AdminCursosCriarEstrutura'
import s from './AdminCursosCriarView.module.scss'

function safeReturnTo(raw: string | undefined): string {
  if (!raw || typeof raw !== 'string') return '/admin/cursos'
  try {
    const u = decodeURIComponent(raw.trim())
    if (!u.startsWith('/') || u.startsWith('//')) return '/admin/cursos'
    if (!u.startsWith('/admin/cursos')) return '/admin/cursos'
    return u
  } catch {
    return '/admin/cursos'
  }
}

type Props = {
  returnTo?: string
  initialCategoria?: string
  initialNivel?: string
}

export function AdminCursosCriarView({ returnTo, initialCategoria, initialNivel }: Props) {
  const router = useRouter()
  const back = safeReturnTo(returnTo)

  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [categoria, setCategoria] = useState<CategoriaId | ''>(
    initialCategoria && isCategoriaId(initialCategoria) ? initialCategoria : '',
  )
  const [nivel, setNivel] = useState<NivelId | ''>(initialNivel && isNivelId(initialNivel) ? initialNivel : '')

  const [docQuery, setDocQuery] = useState('')
  const [docPage, setDocPage] = useState(1)
  const [selectedDoc, setSelectedDoc] = useState<Record<string, boolean>>({})

  const [units, setUnits] = useState<UnitState[]>([])
  const [toast, setToast] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  const filteredDocentes = useMemo(() => {
    const q = docQuery.trim().toLowerCase()
    if (!q) return ADMIN_CURSOS_DOCENTES_MOCK
    return ADMIN_CURSOS_DOCENTES_MOCK.filter(
      (d) =>
        d.nome.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.especialidade.toLowerCase().includes(q),
    )
  }, [docQuery])

  const docTotalPages = Math.max(1, Math.ceil(filteredDocentes.length / ADMIN_CURSOS_DOCENTES_PAGE_SIZE))
  const docPageClamped = Math.min(docPage, docTotalPages)
  const docSlice = useMemo(() => {
    const p = docPageClamped
    const start = (p - 1) * ADMIN_CURSOS_DOCENTES_PAGE_SIZE
    return filteredDocentes.slice(start, start + ADMIN_CURSOS_DOCENTES_PAGE_SIZE)
  }, [filteredDocentes, docPageClamped])

  const nSelected = useMemo(() => Object.values(selectedDoc).filter(Boolean).length, [selectedDoc])

  function toggleDoc(id: string) {
    setSelectedDoc((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function flashOk(msg: string) {
    setToast(msg)
    setErr(null)
    window.setTimeout(() => setToast(null), 2800)
  }

  function submit() {
    if (!titulo.trim()) {
      setErr('Informe o título do curso.')
      return
    }
    if (!descricao.trim()) {
      setErr('Informe a descrição do curso.')
      return
    }
    if (!categoria) {
      setErr('Selecione a categoria STARS.')
      return
    }
    if (!nivel) {
      setErr('Selecione o nível.')
      return
    }
    setErr(null)
    flashOk(`Curso “${titulo.trim()}” salvo com sucesso (demo). Redirecionando…`)
    window.setTimeout(() => router.push(back), 900)
  }

  return (
    <div className={s.page}>
      <div className={s.topBar}>
        <div>
          <button type="button" className={s.cancelLink} onClick={() => router.push(back)}>
            <FiArrowLeft aria-hidden />
            Cancelar
          </button>
          <p className={s.breadcrumb}>
            <Link href="/admin/cursos">Cursos</Link>
          </p>
          <h1 className={s.pageTitle}>Criar Novo Curso</h1>
          <p className={s.pageSub}>Preencha as informações e estruture seu curso</p>
        </div>
        <button type="button" className={s.btnGreen} onClick={submit}>
          <FiSave aria-hidden />
          Criar Curso
        </button>
      </div>

      {toast ? (
        <p className={s.toast} role="status" aria-live="polite">
          {toast}
        </p>
      ) : null}
      {err ? (
        <p className={s.err} role="alert">
          {err}
        </p>
      ) : null}

      <section className={s.card} aria-labelledby="basico-title">
        <div className={s.cardHead}>
          <h2 id="basico-title" className={s.cardTitle}>
            Informações Básicas
          </h2>
        </div>
        <div className={s.cardBody}>
          <div className={s.field}>
            <label className={s.label} htmlFor="curso-titulo">
              Título do Curso <span className={s.req}>*</span>
            </label>
            <input
              id="curso-titulo"
              className={s.input}
              placeholder="Ex: Aventuras no Mundo dos Animais"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className={`${s.field} ${s.smGap}`}>
            <label className={s.label} htmlFor="curso-desc">
              Descrição <span className={s.req}>*</span>
            </label>
            <textarea
              id="curso-desc"
              className={s.textarea}
              placeholder="Descreva o que os alunos aprenderão neste curso"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className={s.row2}>
            <div className={s.field}>
              <label className={s.label} htmlFor="curso-cat">
                Categoria STARS <span className={s.req}>*</span>
              </label>
              <select
                id="curso-cat"
                className={s.select}
                value={categoria}
                onChange={(e) => setCategoria((e.target.value as CategoriaId | '') || '')}
              >
                <option value="">Selecionar</option>
                {ADMIN_CURSOS_STARS_SELECT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
            <div className={s.field}>
              <label className={s.label} htmlFor="curso-nivel">
                Nível <span className={s.req}>*</span>
              </label>
              <select
                id="curso-nivel"
                className={s.select}
                value={nivel}
                onChange={(e) => setNivel((e.target.value as NivelId | '') || '')}
              >
                <option value="">Selecionar</option>
                {ADMIN_CURSOS_NIVEL_SELECT_OPTIONS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      <section className={s.card} aria-labelledby="docentes-title">
        <div className={s.cardHead}>
          <h2 id="docentes-title" className={s.cardTitle}>
            Atribuir Docentes
          </h2>
        </div>
        <div className={s.cardBody}>
          <div className={s.docSearchRow}>
            <div className={s.searchWrap}>
              <FiSearch className={s.searchIcon} aria-hidden />
              <input
                type="search"
                className={s.searchInput}
                placeholder="Buscar docente por nome, email ou especialidade"
                value={docQuery}
                onChange={(e) => {
                  setDocQuery(e.target.value)
                  setDocPage(1)
                }}
                aria-label="Buscar docentes"
              />
            </div>
            <span className={s.docCount}>{nSelected} selecionado(s)</span>
          </div>
          <div className={s.docList} role="list">
            {docSlice.length === 0 ? (
              <p style={{ padding: '1rem', margin: 0, color: '#6b7280', fontSize: '0.875rem' }}>
                Nenhum docente encontrado para esta busca.
              </p>
            ) : (
              docSlice.map((d) => {
              const on = Boolean(selectedDoc[d.id])
              return (
                <label
                  key={d.id}
                  className={`${s.docRow} ${on ? s.docRowOn : ''}`}
                  role="listitem"
                >
                  <input
                    type="checkbox"
                    className={s.docCheck}
                    checked={on}
                    onChange={() => toggleDoc(d.id)}
                  />
                  <span className={s.docAvatar} aria-hidden>
                    {d.iniciais}
                  </span>
                  <div className={s.docInfo}>
                    <div className={s.docName}>{d.nome}</div>
                    <div className={s.docEmail}>{d.email}</div>
                  </div>
                  <span className={s.docEsp}>{d.especialidade}</span>
                </label>
              )
            })
            )}
          </div>
          <div className={s.docPg}>
            <button
              type="button"
              className={s.pgBtn}
              disabled={docPageClamped <= 1}
              aria-label="Página anterior"
              onClick={() => setDocPage((p) => Math.max(1, p - 1))}
            >
              <FiChevronLeft aria-hidden />
            </button>
            <span className={s.pgInfo}>
              Página {docPageClamped} de {docTotalPages}
            </span>
            <button
              type="button"
              className={s.pgBtn}
              disabled={docPageClamped >= docTotalPages}
              aria-label="Próxima página"
              onClick={() => setDocPage((p) => Math.min(docTotalPages, p + 1))}
            >
              <FiChevronRight aria-hidden />
            </button>
          </div>
        </div>
      </section>

      <AdminCursosCriarEstrutura units={units} setUnits={setUnits} />

      <div className={s.footer} role="navigation" aria-label="Ações do formulário">
        <div className={s.footerInner}>
          <button type="button" className={s.btnGhost} onClick={() => router.push(back)}>
            Cancelar
          </button>
          <button type="button" className={s.btnGreen} onClick={submit}>
            <FiSave aria-hidden />
            Criar Curso
          </button>
        </div>
      </div>
    </div>
  )
}
