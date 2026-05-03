'use client'

import { FiDownload, FiUsers, FiUserPlus } from 'react-icons/fi'
import { downloadCsv } from '@src/lib/downloadFile'
import { USUARIOS_MOCK_ROWS, PERFIS_LABEL } from '@src/infrastructure/data/mockGestaoUsuarios'
import u from './gestaoUsuarios.module.scss'

export function GestaoUsuariosRelatoriosTab() {
  function exportAtivos() {
    const rows = USUARIOS_MOCK_ROWS.filter((r) => r.status === 'ativo')
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-relatorio-usuarios-ativos-${stamp}.csv`,
      [
        { key: 'id', header: 'ID' },
        { key: 'nome', header: 'Nome' },
        { key: 'perfil', header: 'Perfil' },
        { key: 'unidade', header: 'Unidade' },
      ],
      rows.map((r) => ({ id: r.id, nome: r.nome, perfil: PERFIS_LABEL[r.perfil], unidade: r.unidade })),
    )
  }

  function exportInativos() {
    const rows = USUARIOS_MOCK_ROWS.filter((r) => r.status === 'inativo')
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-relatorio-usuarios-inativos-${stamp}.csv`,
      [
        { key: 'id', header: 'ID' },
        { key: 'nome', header: 'Nome' },
        { key: 'perfil', header: 'Perfil' },
      ],
      rows.map((r) => ({ id: r.id, nome: r.nome, perfil: PERFIS_LABEL[r.perfil] })),
    )
  }

  function exportCompleto() {
    const stamp = new Date().toISOString().slice(0, 10)
    downloadCsv(
      `edenicos-relatorio-usuarios-completo-${stamp}.csv`,
      [{ key: 'id', header: 'ID' }, { key: 'nome', header: 'Nome' }, { key: 'email', header: 'E-mail' }],
      USUARIOS_MOCK_ROWS.map((r) => ({ id: r.id, nome: r.nome, email: r.email })),
    )
  }

  const ativos = USUARIOS_MOCK_ROWS.filter((r) => r.status === 'ativo').length
  const inativos = USUARIOS_MOCK_ROWS.filter((r) => r.status === 'inativo').length

  return (
    <div>
      <p className={u.pageSubtitle} style={{ marginBottom: '1.25rem' }}>
        Exportações prontas para auditoria e indicadores. Os arquivos são gerados no navegador (demonstração).
      </p>
      <div className={u.reportGrid}>
        <div className={u.reportCard}>
          <h3>Usuários ativos</h3>
          <p>
            {ativos} registros com status ativo na amostra atual. Inclui colunas de identificação e unidade.
          </p>
          <button type="button" className={u.btnPrimaryGreen} onClick={exportAtivos}>
            <FiDownload aria-hidden />
            Baixar CSV
          </button>
        </div>
        <div className={u.reportCard}>
          <h3>Usuários inativos</h3>
          <p>{inativos} registros inativos para revisão de churn e reativação.</p>
          <button type="button" className={u.btnOutline} onClick={exportInativos}>
            <FiDownload aria-hidden />
            Baixar CSV
          </button>
        </div>
        <div className={u.reportCard}>
          <h3>Base completa (resumo)</h3>
          <p>Lista resumida com ID, nome e e-mail de todos os usuários mock.</p>
          <button type="button" className={u.btnOutline} onClick={exportCompleto}>
            <FiUsers aria-hidden />
            Exportar resumo
          </button>
        </div>
        <div className={u.reportCard}>
          <h3>Novos cadastros (7 dias)</h3>
          <p>Relatório simulado de novos cadastros — use o dashboard para tendência visual.</p>
          <button
            type="button"
            className={u.btnOutline}
            onClick={() => window.alert('Na integração real, este botão consultaria a API de eventos.')}
          >
            <FiUserPlus aria-hidden />
            Gerar relatório
          </button>
        </div>
      </div>
    </div>
  )
}
