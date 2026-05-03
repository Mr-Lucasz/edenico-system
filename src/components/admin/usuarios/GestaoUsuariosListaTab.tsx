'use client'

import { useEffect, useRef, useState } from 'react'
import { FiFilter, FiMoreVertical, FiPrinter, FiSearch, FiUpload } from 'react-icons/fi'
import { format, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRouter } from 'next/navigation'
import { downloadCsv } from '@src/lib/downloadFile'
import {
  USUARIOS_MOCK_ROWS,
  PERFIS_LABEL,
  iniciaisNome,
  type PerfilUsuario,
  type UsuarioAdminRow,
} from '@src/infrastructure/data/mockGestaoUsuarios'
import u from './gestaoUsuarios.module.scss'

const PAGE_SIZE = 8

const UNIDADES = Array.from(new Set(USUARIOS_MOCK_ROWS.map((r) => r.unidade))).sort()

function badgePerfilClass(perfil: PerfilUsuario) {
  if (perfil === 'estudante') return u.badgeEstudante
  if (perfil === 'docente') return u.badgeDocente
  if (perfil === 'responsavel') return u.badgeResp
  if (perfil === 'prestador') return u.badgePrest
  return u.badgeAdmin
}

function RowMenu({
  row,
  onToast,
}: {
  row: UsuarioAdminRow
  onToast: (msg: string) => void
}) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div className={u.menuWrap} ref={wrapRef}>
      <button
        type="button"
        className={u.kebab}
        aria-label={`Ações para ${row.nome}`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <FiMoreVertical />
      </button>
      {open ? (
        <ul className={u.menuDropdown} role="menu">
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={u.menuItemBtn}
              onClick={() => {
                onToast(`Abrir ficha de ${row.nome} (demo).`)
                setOpen(false)
              }}
            >
              Ver detalhes
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={u.menuItemBtn}
              onClick={() => {
                onToast(`Edição de ${row.nome} (demo).`)
                setOpen(false)
              }}
            >
              Editar
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={u.menuItemBtn}
              onClick={() => {
                onToast(`E-mail enviado para ${row.email} (demo).`)
                setOpen(false)
              }}
            >
              Enviar e-mail
            </button>
          </li>
          <li role="none">
            <button
              type="button"
              role="menuitem"
              className={`${u.menuItemBtn} ${u.menuItemDanger}`}
              onClick={() => {
                onToast(`Usuário ${row.id} marcado como inativo (demo).`)
                setOpen(false)
              }}
            >
              Desativar
            </button>
          </li>
        </ul>
      ) : null}
    </div>
  )
}

const TIPOS_MODAL: { slug: string; titulo: string; desc: string }[] = [
  {
    slug: 'estudante',
    titulo: 'Estudante',
    desc: 'Usuário que acessa cursos e conteúdos educacionais.',
  },
  {
    slug: 'docente',
    titulo: 'Docente',
    desc: 'Professor que ministra cursos e acompanha estudantes.',
  },
  {
    slug: 'responsavel',
    titulo: 'Responsável',
    desc: 'Pai, mãe ou tutor que acompanha estudantes.',
  },
  {
    slug: 'prestador',
    titulo: 'Prestador',
    desc: 'Parceiro com acesso a entregas e demandas contratadas.',
  },
  {
    slug: 'administrador',
    titulo: 'Administrador',
    desc: 'Acesso completo ao sistema e configurações.',
  },
]

function CreateUserModal({
  open,
  onClose,
  onPick,
}: {
  open: boolean
  onClose: () => void
  onPick: (slug: string) => void
}) {
  const titleId = 'modal-criar-usuario-titulo'

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className={u.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={u.modalCard}>
        <div className={u.modalHead}>
          <h2 id={titleId} className={u.modalTitle}>
            Criar novo usuário
          </h2>
          <button type="button" className={u.modalClose} aria-label="Fechar" onClick={onClose}>
            ×
          </button>
        </div>
        <div className={u.modalBody}>
          <p className={u.modalHint}>Selecione o tipo de usuário que deseja criar:</p>
          <div className={u.typeGrid}>
            {TIPOS_MODAL.map((t) => (
              <button
                key={t.slug}
                type="button"
                className={u.typeCard}
                onClick={() => {
                  onPick(t.slug)
                  onClose()
                }}
              >
                <div className={u.typeIcon} aria-hidden>
                  <FiUpload />
                </div>
                <div className={u.typeCardTitle}>{t.titulo}</div>
                <p className={u.typeCardDesc}>{t.desc}</p>
              </button>
            ))}
          </div>
        </div>
        <div className={u.modalFoot}>
          <button type="button" className={u.btnGhost} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  )
}

function matchesSearch(row: UsuarioAdminRow, q: string) {
  const s = q.trim().toLowerCase()
  if (!s) return true
  return (
    row.nome.toLowerCase().includes(s) ||
    row.email.toLowerCase().includes(s) ||
    row.cpf.replace(/\D/g, '').includes(s.replace(/\D/g, '')) ||
    row.id.toLowerCase().includes(s)
  )
}

export type GestaoUsuariosListaTabProps = {
  perfilLock?: PerfilUsuario | null
}

export function GestaoUsuariosListaTab({ perfilLock = null }: GestaoUsuariosListaTabProps) {
  const router = useRouter()
  const [q, setQ] = useState('')
  const [status, setStatus] = useState<'todos' | 'ativo' | 'inativo'>('todos')
  const [tipo, setTipo] = useState<PerfilUsuario | 'todos'>('todos')
  const [unidade, setUnidade] = useState<string>('todas')
  const [advOpen, setAdvOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [createOpen, setCreateOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 2800)
    return () => window.clearTimeout(t)
  }, [toast])

  const tipoEfetivo: PerfilUsuario | 'todos' = perfilLock ?? tipo

  const filtered = USUARIOS_MOCK_ROWS.filter((row) => {
    if (!matchesSearch(row, q)) return false
    if (status !== 'todos' && row.status !== status) return false
    if (tipoEfetivo !== 'todos' && row.perfil !== tipoEfetivo) return false
    if (unidade !== 'todas' && row.unidade !== unidade) return false
    return true
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageSafe = Math.min(page, totalPages)
  const slice = filtered.slice((pageSafe - 1) * PAGE_SIZE, pageSafe * PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [q, status, tipo, unidade, perfilLock])

  const idsOnPage = slice.map((r) => r.id)
  const allOnPageSelected = idsOnPage.length > 0 && idsOnPage.every((id) => selected[id])

  function toggleAllOnPage() {
    const next = !allOnPageSelected
    setSelected((prev) => {
      const copy = { ...prev }
      for (const id of idsOnPage) {
        if (next) copy[id] = true
        else delete copy[id]
      }
      return copy
    })
  }

  function exportFiltered() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-usuarios-filtrados-${stamp}.csv`,
      [
        { key: 'id', header: 'ID' },
        { key: 'nome', header: 'Nome' },
        { key: 'email', header: 'E-mail' },
        { key: 'perfil', header: 'Perfil' },
        { key: 'cpf', header: 'CPF' },
        { key: 'telefone', header: 'Telefone' },
        { key: 'status', header: 'Status' },
        { key: 'ultimoAcesso', header: 'Último acesso' },
        { key: 'cadastro', header: 'Cadastro' },
        { key: 'unidade', header: 'Unidade' },
        { key: 'atribuicao', header: 'Atribuições' },
      ],
      filtered.map((r) => ({
        id: r.id,
        nome: r.nome,
        email: r.email,
        perfil: PERFIS_LABEL[r.perfil],
        cpf: r.cpf,
        telefone: r.telefone,
        status: r.status,
        ultimoAcesso: r.ultimoAcesso,
        cadastro: format(parseISO(r.cadastroISO), 'dd/MM/yyyy', { locale: ptBR }),
        unidade: r.unidade,
        atribuicao: r.atribuicao,
      })),
    )
    setToast('Exportação CSV gerada com os filtros atuais.')
  }

  function printList() {
    window.print()
    setToast('Diálogo de impressão aberto.')
  }

  function onImportClick() {
    fileRef.current?.click()
  }

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".csv,text/csv"
        hidden
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) setToast(`Arquivo “${f.name}” recebido (importação demo).`)
          e.target.value = ''
        }}
      />

      <CreateUserModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onPick={(slug) => {
          router.push(`/admin/usuarios/novo/${slug}`)
        }}
      />

      <div className={u.toolbar}>
        <div className={u.toolbarGrid}>
          <div className={u.searchWrap}>
            <FiSearch className={u.searchIcon} aria-hidden />
            <input
              className={u.textInput}
              placeholder="Buscar por nome, e-mail, CPF ou ID"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Buscar usuários"
            />
          </div>
          <select className={u.select} value={status} onChange={(e) => setStatus(e.target.value as typeof status)} aria-label="Status">
            <option value="todos">Todos</option>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
          </select>
          {!perfilLock ? (
            <select className={u.select} value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)} aria-label="Tipo">
              <option value="todos">Todos os tipos</option>
              {(Object.keys(PERFIS_LABEL) as PerfilUsuario[]).map((p) => (
                <option key={p} value={p}>
                  {PERFIS_LABEL[p]}
                </option>
              ))}
            </select>
          ) : (
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', alignSelf: 'center' }}>
              Perfil: {PERFIS_LABEL[perfilLock]}
            </div>
          )}
          <button type="button" className={u.btnOutlineSm} onClick={() => setAdvOpen((v) => !v)}>
            <FiFilter aria-hidden />
            Filtros avançados
          </button>
          <button type="button" className={u.btnPrimaryGreen} onClick={() => setCreateOpen(true)}>
            + Criar novo usuário
          </button>
          <button type="button" className={u.btnOutlineSm} onClick={printList}>
            <FiPrinter aria-hidden />
            Imprimir
          </button>
          <button type="button" className={u.btnOutlineSm} onClick={exportFiltered}>
            Exportar
          </button>
        </div>
        {advOpen ? (
          <div className={u.advancedPanel}>
            <div>
              <span className={u.fieldLabel}>Unidade</span>
              <select className={u.select} value={unidade} onChange={(e) => setUnidade(e.target.value)}>
                <option value="todas">Todas</option>
                {UNIDADES.map((un) => (
                  <option key={un} value={un}>
                    {un}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end' }}>
              <button type="button" className={u.btnGhost} onClick={() => setUnidade('todas')}>
                Limpar unidade
              </button>
            </div>
          </div>
        ) : null}
        <div className={u.counter}>
          Exibindo {slice.length} de {filtered.length} usuário{filtered.length === 1 ? '' : 's'}
        </div>
      </div>

      <div className={u.tableScroll}>
        <table className={u.table}>
          <thead>
            <tr>
              <th className={u.th} style={{ width: 40 }}>
                <input
                  type="checkbox"
                  checked={allOnPageSelected}
                  onChange={toggleAllOnPage}
                  aria-label="Selecionar todos nesta página"
                />
              </th>
              <th className={u.th}>Usuário</th>
              <th className={u.th}>Perfil</th>
              <th className={u.th}>CPF</th>
              <th className={u.th}>Telefone</th>
              <th className={u.th}>Status</th>
              <th className={u.th}>Último acesso</th>
              <th className={u.th}>Data de cadastro</th>
              <th className={u.th}>Unidade</th>
              <th className={u.th}>Atribuições</th>
              <th className={u.th} style={{ width: 56 }}>
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {slice.map((row) => (
              <tr key={row.id} className={u.tr}>
                <td className={u.td}>
                  <input
                    type="checkbox"
                    checked={Boolean(selected[row.id])}
                    onChange={() =>
                      setSelected((prev) => {
                        const copy = { ...prev }
                        if (copy[row.id]) delete copy[row.id]
                        else copy[row.id] = true
                        return copy
                      })
                    }
                    aria-label={`Selecionar ${row.nome}`}
                  />
                </td>
                <td className={u.td}>
                  <div className={u.userCell}>
                    <div className={u.avatarSm}>{iniciaisNome(row.nome)}</div>
                    <div>
                      <div className={u.userName}>{row.nome}</div>
                      <div className={u.userEmail}>{row.email}</div>
                    </div>
                  </div>
                </td>
                <td className={u.td}>
                  <span className={`${u.badge} ${badgePerfilClass(row.perfil)}`}>{PERFIS_LABEL[row.perfil]}</span>
                </td>
                <td className={u.td}>{row.cpf}</td>
                <td className={u.td}>{row.telefone}</td>
                <td className={u.td}>
                  <span className={`${u.badge} ${row.status === 'ativo' ? u.badgeAtivo : u.badgeInativo}`}>
                    {row.status === 'ativo' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className={u.td}>{row.ultimoAcesso}</td>
                <td className={u.td}>{format(parseISO(row.cadastroISO), 'dd/MM/yyyy', { locale: ptBR })}</td>
                <td className={u.td}>{row.unidade}</td>
                <td className={u.td}>{row.atribuicao}</td>
                <td className={u.td}>
                  <RowMenu row={row} onToast={setToast} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={u.pagination}>
        <button type="button" className={u.pageBtn} disabled={pageSafe <= 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
          <button
            key={n}
            type="button"
            className={`${u.pageBtn} ${n === pageSafe ? u.pageBtnActive : ''}`}
            onClick={() => setPage(n)}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          className={u.pageBtn}
          disabled={pageSafe >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Próximo
        </button>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button type="button" className={u.btnOutlineSm} onClick={onImportClick}>
          <FiUpload aria-hidden />
          Importar
        </button>
        <button
          type="button"
          className={u.btnOutlineSm}
          onClick={() => {
            const n = Object.keys(selected).filter((k) => selected[k]).length
            if (!n) {
              setToast('Selecione ao menos um usuário.')
              return
            }
            setToast(`${n} usuário(s) incluídos em ação em massa (demo).`)
          }}
        >
          Ações em massa
        </button>
      </div>

      {toast ? (
        <div role="status" aria-live="polite" className={u.liveToast}>
          {toast}
        </div>
      ) : null}
    </>
  )
}
