'use client'

import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { FiArrowLeft, FiCheck, FiMail, FiPhone, FiUpload } from 'react-icons/fi'
import {
  FAIXAS_ETARIAS_OPCOES,
  MOCK_CURSOS_DOCENTE,
  PERFIS_LABEL,
  type PerfilUsuario,
} from '@src/infrastructure/data/mockGestaoUsuarios'
import u from './gestaoUsuarios.module.scss'

const VALID: PerfilUsuario[] = ['estudante', 'docente', 'responsavel', 'prestador', 'administrador']

function isPerfil(s: string): s is PerfilUsuario {
  return (VALID as string[]).includes(s)
}

type Props = { tipoParam: string }

export function NovoUsuarioWizard({ tipoParam }: Props) {
  const router = useRouter()
  const tipo: PerfilUsuario = isPerfil(tipoParam) ? tipoParam : 'estudante'

  const [step, setStep] = useState(1)
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [cpf, setCpf] = useState('')
  const [nascimento, setNascimento] = useState('')
  const [endereco, setEndereco] = useState('')

  const [faixas, setFaixas] = useState<Set<string>>(new Set(['5-7 anos', '8-10 anos']))
  const [cursos, setCursos] = useState<Set<string>>(new Set(['c1', 'c2']))
  const [disponibilidade, setDisponibilidade] = useState('Disponível')
  const [observacoes, setObservacoes] = useState('')

  const [planoEstudante, setPlanoEstudante] = useState('mensal')
  const [notasResp, setNotasResp] = useState('')
  const [modsAdmin, setModsAdmin] = useState<Set<string>>(new Set(['usuarios', 'financeiro']))
  const [empresaPrest, setEmpresaPrest] = useState('')

  const titulo = useMemo(() => {
    const p = PERFIS_LABEL[tipo]
    return `Criar novo ${p.toLowerCase()}`
  }, [tipo])

  const stepLabels =
    tipo === 'docente'
      ? ['Dados básicos', 'Informações específicas', 'Revisão e confirmação']
      : ['Dados básicos', 'Planos e acessos', 'Revisar e confirmar']

  function validarPasso1() {
    if (!nome.trim() || !email.trim() || !cpf.trim()) {
      window.alert('Preencha nome, e-mail e CPF (campos obrigatórios).')
      return false
    }
    return true
  }

  function finalizar() {
    window.alert(`Usuário “${nome || 'Novo'}” criado com sucesso (demonstração).`)
    router.push('/admin/usuarios/lista')
    router.refresh()
  }

  function renderStep2() {
    if (tipo === 'docente') {
      return (
        <>
          <h2 className={u.formSectionTitle}>Informações específicas — docente</h2>
          <p className={u.formSectionSub}>Faixas etárias, cursos e disponibilidade.</p>

          <div className={u.inputLabel} style={{ marginBottom: '0.5rem' }}>
            Faixas etárias
          </div>
          <div className={u.chipGrid} style={{ marginBottom: '1.25rem' }}>
            {FAIXAS_ETARIAS_OPCOES.map((fx) => {
              const on = faixas.has(fx)
              return (
                <label key={fx} className={`${u.chip} ${on ? u.chipSelected : ''}`}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      setFaixas((prev) => {
                        const n = new Set(prev)
                        if (n.has(fx)) n.delete(fx)
                        else n.add(fx)
                        return n
                      })
                    }
                  />
                  {fx}
                </label>
              )
            })}
          </div>

          <div className={u.inputLabel} style={{ marginBottom: '0.5rem' }}>
            Cursos atribuídos
          </div>
          <div className={u.courseList}>
            {MOCK_CURSOS_DOCENTE.map((c) => {
              const on = cursos.has(c.id)
              return (
                <label key={c.id} className={`${u.courseRow} ${on ? u.courseRowSelected : ''}`}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      setCursos((prev) => {
                        const n = new Set(prev)
                        if (n.has(c.id)) n.delete(c.id)
                        else n.add(c.id)
                        return n
                      })
                    }
                  />
                  <div>
                    <div className={u.courseTitle}>{c.titulo}</div>
                    <div className={u.tagRow}>
                      <span className={u.tag} style={{ background: c.areaCor }}>
                        {c.area}
                      </span>
                      <span className={u.tag} style={{ background: '#64748b' }}>
                        {c.nivel}
                      </span>
                      <span className={u.tag} style={{ background: '#0ea5e9' }}>
                        {c.faixa}
                      </span>
                    </div>
                  </div>
                </label>
              )
            })}
          </div>
          <div className={u.infoBar}>{cursos.size} curso(s) selecionado(s)</div>

          <div className={u.formGrid2} style={{ marginTop: '1rem' }}>
            <div>
              <label className={u.inputLabel}>Disponibilidade</label>
              <select className={u.input} value={disponibilidade} onChange={(e) => setDisponibilidade(e.target.value)}>
                <option>Disponível</option>
                <option>Parcial</option>
                <option>Indisponível</option>
              </select>
            </div>
            <div />
          </div>
          <div style={{ marginTop: '1rem' }}>
            <label className={u.inputLabel}>Observações</label>
            <textarea
              className={u.textarea}
              placeholder="Informações adicionais sobre o docente..."
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
            />
          </div>
        </>
      )
    }

    if (tipo === 'estudante') {
      return (
        <>
          <h2 className={u.formSectionTitle}>Planos e acessos</h2>
          <p className={u.formSectionSub}>Defina o plano inicial do estudante.</p>
          <div className={u.chipGrid}>
            {[
              { id: 'mensal', label: 'Plano mensal' },
              { id: 'semestral', label: 'Plano semestral' },
              { id: 'anual', label: 'Plano anual' },
            ].map((p) => (
              <label key={p.id} className={`${u.chip} ${planoEstudante === p.id ? u.chipSelected : ''}`}>
                <input type="radio" name="plano" checked={planoEstudante === p.id} onChange={() => setPlanoEstudante(p.id)} />
                {p.label}
              </label>
            ))}
          </div>
        </>
      )
    }

    if (tipo === 'responsavel') {
      return (
        <>
          <h2 className={u.formSectionTitle}>Vínculos</h2>
          <p className={u.formSectionSub}>Notas sobre estudantes acompanhados (demo).</p>
          <textarea
            className={u.textarea}
            placeholder="Ex.: vincular a Maria Clara (USR-1001) e João Pedro (USR-1010)…"
            value={notasResp}
            onChange={(e) => setNotasResp(e.target.value)}
          />
        </>
      )
    }

    if (tipo === 'administrador') {
      const opcoes = [
        { id: 'usuarios', label: 'Gestão de usuários' },
        { id: 'financeiro', label: 'Financeiro' },
        { id: 'cursos', label: 'Cursos' },
        { id: 'config', label: 'Configurações' },
      ]
      return (
        <>
          <h2 className={u.formSectionTitle}>Permissões</h2>
          <p className={u.formSectionSub}>Escopos de acesso iniciais.</p>
          <div className={u.chipGrid}>
            {opcoes.map((o) => {
              const on = modsAdmin.has(o.id)
              return (
                <label key={o.id} className={`${u.chip} ${on ? u.chipSelected : ''}`}>
                  <input
                    type="checkbox"
                    checked={on}
                    onChange={() =>
                      setModsAdmin((prev) => {
                        const n = new Set(prev)
                        if (n.has(o.id)) n.delete(o.id)
                        else n.add(o.id)
                        return n
                      })
                    }
                  />
                  {o.label}
                </label>
              )
            })}
          </div>
        </>
      )
    }

    return (
      <>
        <h2 className={u.formSectionTitle}>Dados do prestador</h2>
        <p className={u.formSectionSub}>Empresa ou nome fantasia para contrato.</p>
        <label className={u.inputLabel}>Empresa / razão social</label>
        <input className={u.input} value={empresaPrest} onChange={(e) => setEmpresaPrest(e.target.value)} placeholder="Ex.: Serviços Tech LTDA" />
      </>
    )
  }

  function renderReview() {
    const cursosSel = MOCK_CURSOS_DOCENTE.filter((c) => cursos.has(c.id))
    const dimensoes = Array.from(new Set(cursosSel.map((c) => c.area)))

    return (
      <>
        <h2 className={u.formSectionTitle}>Revisão e confirmação</h2>
        <p className={u.formSectionSub}>Verifique os dados antes de criar o usuário.</p>

        <div className={u.summaryBanner}>
          <div className={u.wizardTitleRow} style={{ marginBottom: '0.5rem' }}>
            <div className={u.summaryName}>{nome || '—'}</div>
            <span className={u.perfilBadge}>{PERFIS_LABEL[tipo]}</span>
          </div>
          <div className={u.summaryLine}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FiMail aria-hidden />
              {email || '—'}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <FiPhone aria-hidden />
              {telefone || '—'}
            </span>
          </div>
        </div>

        <h3 className={u.formSectionTitle} style={{ fontSize: '0.9375rem' }}>
          Dados básicos
        </h3>
        <div className={u.reviewGrid}>
          <div>
            <div className={u.reviewLabel}>CPF</div>
            <div className={u.reviewValue}>{cpf || '—'}</div>
          </div>
          <div>
            <div className={u.reviewLabel}>Data de nascimento</div>
            <div className={u.reviewValue}>{nascimento || '—'}</div>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <div className={u.reviewLabel}>Endereço</div>
            <div className={u.reviewValue}>{endereco || '—'}</div>
          </div>
        </div>

        {tipo === 'docente' ? (
          <>
            <h3 className={u.formSectionTitle} style={{ fontSize: '0.9375rem', marginTop: '1rem' }}>
              Informações do docente
            </h3>
            <div className={u.reviewGrid}>
              <div style={{ gridColumn: '1 / -1' }}>
                <div className={u.reviewLabel}>Dimensões (áreas dos cursos)</div>
                <div className={u.tagRow}>
                  {dimensoes.length ? (
                    dimensoes.map((d) => (
                      <span key={d} className={u.tag} style={{ background: '#7c3aed' }}>
                        {d}
                      </span>
                    ))
                  ) : (
                    <span className={u.reviewValue}>—</span>
                  )}
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div className={u.reviewLabel}>Faixas etárias</div>
                <div className={u.reviewValue}>{Array.from(faixas).join(', ') || '—'}</div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <div className={u.reviewLabel}>Cursos atribuídos ({cursosSel.length})</div>
                <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.1rem' }}>
                  {cursosSel.map((c) => (
                    <li key={c.id} className={u.reviewValue}>
                      {c.titulo}{' '}
                      <span style={{ color: '#6b7280', fontWeight: 500 }}>
                        ({c.area} | {c.faixa})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={u.reviewLabel}>Disponibilidade</div>
                <div className={u.reviewValue}>{disponibilidade}</div>
              </div>
            </div>
          </>
        ) : null}

        {tipo === 'estudante' ? (
          <div className={u.reviewGrid} style={{ marginTop: '1rem' }}>
            <div>
              <div className={u.reviewLabel}>Plano</div>
              <div className={u.reviewValue}>{planoEstudante}</div>
            </div>
          </div>
        ) : null}

        {tipo === 'responsavel' && notasResp ? (
          <div style={{ marginTop: '1rem' }}>
            <div className={u.reviewLabel}>Notas de vínculo</div>
            <div className={u.reviewValue}>{notasResp}</div>
          </div>
        ) : null}

        {tipo === 'administrador' ? (
          <div style={{ marginTop: '1rem' }}>
            <div className={u.reviewLabel}>Módulos</div>
            <div className={u.reviewValue}>{Array.from(modsAdmin).join(', ') || '—'}</div>
          </div>
        ) : null}

        {tipo === 'prestador' && empresaPrest ? (
          <div style={{ marginTop: '1rem' }}>
            <div className={u.reviewLabel}>Empresa</div>
            <div className={u.reviewValue}>{empresaPrest}</div>
          </div>
        ) : null}
      </>
    )
  }

  return (
    <div className={u.wizardShell}>
      <div className={u.wizardTop}>
        <div>
          <button type="button" className={u.backLink} onClick={() => router.push('/admin/usuarios/lista')}>
            <FiArrowLeft aria-hidden />
            Voltar
          </button>
          <div className={u.wizardTitleRow} style={{ marginTop: '0.75rem' }}>
            <h1 className={u.pageTitle} style={{ margin: 0 }}>
              {titulo}
            </h1>
            <span className={u.perfilBadge}>{PERFIS_LABEL[tipo]}</span>
          </div>
          <p className={u.pageSubtitle} style={{ marginTop: '0.35rem' }}>
            Preencha os dados para criar um novo usuário do tipo {PERFIS_LABEL[tipo].toLowerCase()}.
          </p>
        </div>
      </div>

      <div className={u.stepper} aria-label="Etapas">
        {stepLabels.map((label, idx) => {
          const n = idx + 1
          const done = step > n
          const current = step === n
          return (
            <div key={n} style={{ display: 'flex', alignItems: 'center', flex: idx < 2 ? '0 0 auto' : '0 0 auto' }}>
              <div className={u.stepItem}>
                <div
                  className={`${u.stepCircle} ${done ? u.stepDone : ''} ${current ? u.stepCurrent : ''}`}
                  aria-current={current ? 'step' : undefined}
                >
                  {done ? <FiCheck aria-hidden /> : n}
                </div>
                <span style={{ color: step >= n ? '#111827' : '#9ca3af', maxWidth: '7.5rem' }}>{label}</span>
              </div>
              {idx < 2 ? <div className={u.stepLine} aria-hidden /> : null}
            </div>
          )
        })}
      </div>

      <div className={u.formCard}>
        {step === 1 ? (
          <>
            <h2 className={u.formSectionTitle}>Dados básicos</h2>
            <p className={u.formSectionSub}>Informações pessoais do usuário.</p>
            <div className={u.formGrid2}>
              <div>
                <div className={u.inputLabel}>Foto (opcional)</div>
                <button
                  type="button"
                  className={u.photoBox}
                  onClick={() => window.alert('Upload de foto seria aberto aqui (demo).')}
                >
                  <FiUpload aria-hidden />
                  Upload
                </button>
              </div>
              <div />
            </div>
            <div className={u.formGrid1} style={{ marginTop: '0.5rem' }}>
              <div>
                <label className={u.inputLabel}>Nome completo *</label>
                <input
                  className={u.input}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Ex.: João da Silva Santos"
                />
              </div>
              <div className={u.formGrid2}>
                <div>
                  <label className={u.inputLabel}>E-mail *</label>
                  <input
                    className={u.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
                <div>
                  <label className={u.inputLabel}>Telefone</label>
                  <input
                    className={u.input}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(00) 00000-0000"
                  />
                </div>
              </div>
              <div className={u.formGrid2}>
                <div>
                  <label className={u.inputLabel}>CPF *</label>
                  <input className={u.input} value={cpf} onChange={(e) => setCpf(e.target.value)} placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className={u.inputLabel}>Data de nascimento</label>
                  <input className={u.input} type="date" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
                </div>
              </div>
              <div>
                <label className={u.inputLabel}>Endereço</label>
                <input
                  className={u.input}
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua, número, bairro, cidade - UF"
                />
              </div>
            </div>
          </>
        ) : null}
        {step === 2 ? renderStep2() : null}
        {step === 3 ? renderReview() : null}
      </div>

      <div className={u.wizardFoot}>
        <button type="button" className={u.btnOutline} disabled={step <= 1} onClick={() => setStep((s) => Math.max(1, s - 1))}>
          Anterior
        </button>
        <div className={u.wizardFootRight}>
          <Link href="/admin/usuarios/lista" className={u.btnGhost}>
            Cancelar
          </Link>
          {step < 3 ? (
            <button
              type="button"
              className={u.btnPrimaryBlue}
              onClick={() => {
                if (step === 1 && !validarPasso1()) return
                setStep((s) => Math.min(3, s + 1))
              }}
            >
              Próximo
            </button>
          ) : (
            <button type="button" className={u.btnPrimaryGreen} onClick={finalizar}>
              Criar {PERFIS_LABEL[tipo].toLowerCase()}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
