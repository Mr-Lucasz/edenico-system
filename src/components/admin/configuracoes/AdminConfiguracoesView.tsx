'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  FiBell,
  FiChevronDown,
  FiCloud,
  FiCpu,
  FiCopy,
  FiDownload,
  FiEye,
  FiEyeOff,
  FiHardDrive,
  FiHome,
  FiKey,
  FiMail,
  FiMonitor,
  FiRefreshCw,
  FiSave,
  FiSend,
  FiShield,
  FiSliders,
  FiTrash2,
  FiCheckCircle,
} from 'react-icons/fi'
import { ConfigToggle } from './ConfigToggle'
import styles from './AdminConfiguracoesView.module.scss'

type TabId =
  | 'geral'
  | 'seguranca'
  | 'email'
  | 'notificacoes'
  | 'aparencia'
  | 'backup'
  | 'integracoes'

const TAB_IDS: TabId[] = [
  'geral',
  'seguranca',
  'email',
  'notificacoes',
  'aparencia',
  'backup',
  'integracoes',
]

function isTabId(value: string | null): value is TabId {
  return value !== null && (TAB_IDS as string[]).includes(value)
}

const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'geral', label: 'Geral', icon: <FiSliders aria-hidden /> },
  { id: 'seguranca', label: 'Segurança', icon: <FiShield aria-hidden /> },
  { id: 'email', label: 'Email', icon: <FiMail aria-hidden /> },
  { id: 'notificacoes', label: 'Notificações', icon: <FiBell aria-hidden /> },
  { id: 'aparencia', label: 'Aparência', icon: <FiMonitor aria-hidden /> },
  { id: 'backup', label: 'Backup', icon: <FiHardDrive aria-hidden /> },
  { id: 'integracoes', label: 'Integrações', icon: <FiCpu aria-hidden /> },
]

export function AdminConfiguracoesView() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<TabId>('geral')
  const [nome, setNome] = useState('Edênicos Academy')
  const [emailContato, setEmailContato] = useState('contato@edenicos.com')
  const [telefone, setTelefone] = useState('(11) 98765-4321')
  const [endereco, setEndereco] = useState('Av. Paulista, 1000 - São Paulo, SP')
  const [descricao, setDescricao] = useState(
    'Plataforma de ensino gamificada para crianças de 5 a 15 anos.',
  )
  const [manutencao, setManutencao] = useState(false)
  const [cadastros, setCadastros] = useState(true)
  const [apiExterna, setApiExterna] = useState(false)
  const [debug, setDebug] = useState(false)

  const [senhaAtual, setSenhaAtual] = useState('')
  const [novaSenha, setNovaSenha] = useState('')
  const [confirmaSenha, setConfirmaSenha] = useState('')
  const [verAtual, setVerAtual] = useState(false)
  const [verNova, setVerNova] = useState(false)
  const [verConfirma, setVerConfirma] = useState(false)

  const [smtpHost, setSmtpHost] = useState('smtp.gmail.com')
  const [smtpPorta, setSmtpPorta] = useState('587')
  const [smtpUsuario, setSmtpUsuario] = useState('noreply@edenicos.com')
  const [smtpSenha, setSmtpSenha] = useState('')
  const [verSmtpSenha, setVerSmtpSenha] = useState(false)
  const [emailTeste, setEmailTeste] = useState('')

  const [notifNovosUsuarios, setNotifNovosUsuarios] = useState(true)
  const [notifConquistas, setNotifConquistas] = useState(true)
  const [notifRelatorios, setNotifRelatorios] = useState(false)
  const [notifManutencao, setNotifManutencao] = useState(true)
  const [canalEmail, setCanalEmail] = useState(true)
  const [canalPush, setCanalPush] = useState(false)
  const [canalSms, setCanalSms] = useState(false)

  const [temaId, setTemaId] = useState<'claro' | 'escuro' | 'sistema'>('claro')

  const temas = [
    { id: 'claro' as const, label: 'Claro', cor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' },
    { id: 'escuro' as const, label: 'Escuro', cor: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
    { id: 'sistema' as const, label: 'Sistema', cor: 'linear-gradient(90deg, #f8fafc 50%, #1e293b 50%)' },
  ]

  const starsCores = [
    { nome: 'Primária', hex: '#155DFC', cor: '#155dfc' },
    { nome: 'Secundária', hex: '#E17100', cor: '#e17100' },
    { nome: 'Sucesso', hex: '#00C950', cor: '#00c950' },
    { nome: 'Alerta', hex: '#FE9A00', cor: '#fe9a00' },
  ]

  useEffect(() => {
    if (!pathname?.startsWith('/admin/configuracoes')) {
      return
    }
    const q = searchParams.get('tab')
    if (q === 'avaliacoes') {
      router.replace('/admin/avaliacoes')
      return
    }
    if (isTabId(q)) {
      setTab(q)
    } else {
      setTab('geral')
    }
  }, [pathname, router, searchParams])

  function goToTab(next: TabId) {
    setTab(next)
    const params = new URLSearchParams(searchParams.toString())
    if (next === 'geral') {
      params.delete('tab')
    } else {
      params.set('tab', next)
    }
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
  }

  return (
    <div className={styles.root}>
      <header className={styles.headerRow}>
        <div className={styles.titleBlock}>
          <h1 className={styles.pageTitle}>Configurações do Sistema</h1>
          <p className={styles.pageSubtitle}>Gerencie todas as configurações da plataforma</p>
        </div>
        <span className={styles.statusBadge}>
          <FiCheckCircle aria-hidden />
          Sistema Online
        </span>
      </header>

      <div className={styles.tabRail} role="tablist" aria-label="Seções de configuração">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            className={`${styles.tabBtn} ${tab === t.id ? styles.tabBtnActive : ''}`}
            onClick={() => goToTab(t.id)}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className={styles.panels}>
        {tab === 'geral' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-inst-header">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-inst-header">
                  <FiHome aria-hidden />
                  <h2 className={styles.cardTitle}>Informações da Instituição</h2>
                </div>
                <p className={styles.cardDesc}>Configure os dados básicos da sua instituição de ensino</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cfg-nome">
                      Nome da Instituição <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="cfg-nome"
                      className={styles.input}
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cfg-email">
                      Email de Contato <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="cfg-email"
                      type="email"
                      className={styles.input}
                      value={emailContato}
                      onChange={(e) => setEmailContato(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cfg-tel">
                      Telefone
                    </label>
                    <input
                      id="cfg-tel"
                      className={styles.input}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cfg-end">
                      Endereço
                    </label>
                    <input
                      id="cfg-end"
                      className={styles.input}
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.grid2} style={{ marginTop: '1rem' }}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="cfg-desc">
                      Descrição
                    </label>
                    <textarea
                      id="cfg-desc"
                      className={styles.textarea}
                      value={descricao}
                      onChange={(e) => setDescricao(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Logo da Instituição</span>
                    <div className={styles.logoRow}>
                      <div className={styles.logoPreview} aria-hidden>
                        E
                      </div>
                      <div className={styles.uploadZone}>
                        <FiCloud aria-hidden />
                        <p className={styles.uploadTitle}>Clique para fazer upload do logo</p>
                        <p className={styles.uploadHint}>PNG, JPG ou SVG (máx. 2MB)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button type="button" className={styles.btnGhost}>
                    Cancelar
                  </button>
                  <button type="button" className={styles.btnPrimary}>
                    <FiSave aria-hidden />
                    Salvar Alterações
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-sys-header">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-sys-header">
                  <FiSliders aria-hidden />
                  <h2 className={styles.cardTitle}>Configurações do Sistema</h2>
                </div>
                <p className={styles.cardDesc}>Configure o comportamento geral da plataforma</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.toggleList}>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-manut">
                        Modo Manutenção
                      </p>
                      <p className={styles.toggleHint}>Desativa o acesso de usuários à plataforma</p>
                    </div>
                    <ConfigToggle
                      on={manutencao}
                      onToggle={() => setManutencao((v) => !v)}
                      labelledBy="lbl-manut"
                    />
                  </div>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-cad">
                        Permitir Novos Cadastros
                      </p>
                      <p className={styles.toggleHint}>Permite que novos usuários se cadastrem</p>
                    </div>
                    <ConfigToggle
                      on={cadastros}
                      onToggle={() => setCadastros((v) => !v)}
                      labelledBy="lbl-cad"
                    />
                  </div>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-api">
                        API Externa
                      </p>
                      <p className={styles.toggleHint}>Permite acesso via API externa</p>
                    </div>
                    <ConfigToggle
                      on={apiExterna}
                      onToggle={() => setApiExterna((v) => !v)}
                      labelledBy="lbl-api"
                    />
                  </div>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-dbg">
                        Modo Debug
                      </p>
                      <p className={styles.toggleHint}>
                        Exibe informações de depuração (apenas desenvolvimento)
                      </p>
                    </div>
                    <ConfigToggle on={debug} onToggle={() => setDebug((v) => !v)} labelledBy="lbl-dbg" />
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-locale-header">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-locale-header">
                  <FiMonitor aria-hidden />
                  <h2 className={styles.cardTitle}>Região e Idioma</h2>
                </div>
                <p className={styles.cardDesc}>Configure idioma e formatos regionais</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <span className={styles.label}>Idioma Principal</span>
                    <button type="button" className={styles.selectBtn}>
                      <span>🇧🇷 Português (Brasil)</span>
                      <FiChevronDown aria-hidden />
                    </button>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Fuso Horário</span>
                    <button type="button" className={styles.selectBtn}>
                      <span>Brasília (GMT-3)</span>
                      <FiChevronDown aria-hidden />
                    </button>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Formato de Data</span>
                    <button type="button" className={styles.selectBtn}>
                      <span>DD/MM/YYYY</span>
                      <FiChevronDown aria-hidden />
                    </button>
                  </div>
                  <div className={styles.field}>
                    <span className={styles.label}>Moeda</span>
                    <button type="button" className={styles.selectBtn}>
                      <span>R$ - Real Brasileiro</span>
                      <FiChevronDown aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : tab === 'seguranca' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-sec-pwd">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-sec-pwd">
                  <FiKey aria-hidden />
                  <h2 className={styles.cardTitle}>Política de senha</h2>
                </div>
                <p className={styles.cardDesc}>Atualize a senha do administrador e revise requisitos mínimos</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="sec-atual">
                      Senha atual
                    </label>
                    <div className={styles.passwordFieldWrap}>
                      <input
                        id="sec-atual"
                        type={verAtual ? 'text' : 'password'}
                        className={`${styles.input} ${styles.passwordInput}`}
                        value={senhaAtual}
                        onChange={(e) => setSenhaAtual(e.target.value)}
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        className={styles.inputIconBtn}
                        aria-label={verAtual ? 'Ocultar senha' : 'Mostrar senha'}
                        onClick={() => setVerAtual((v) => !v)}
                      >
                        {verAtual ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                      </button>
                    </div>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="sec-nova">
                      Nova senha
                    </label>
                    <div className={styles.passwordFieldWrap}>
                      <input
                        id="sec-nova"
                        type={verNova ? 'text' : 'password'}
                        className={`${styles.input} ${styles.passwordInput}`}
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className={styles.inputIconBtn}
                        aria-label={verNova ? 'Ocultar senha' : 'Mostrar senha'}
                        onClick={() => setVerNova((v) => !v)}
                      >
                        {verNova ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                      </button>
                    </div>
                    <p className={styles.fieldHint}>Mínimo de 8 caracteres, com letras e números</p>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="sec-conf">
                      Confirmar nova senha
                    </label>
                    <div className={styles.passwordFieldWrap}>
                      <input
                        id="sec-conf"
                        type={verConfirma ? 'text' : 'password'}
                        className={`${styles.input} ${styles.passwordInput}`}
                        value={confirmaSenha}
                        onChange={(e) => setConfirmaSenha(e.target.value)}
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        className={styles.inputIconBtn}
                        aria-label={verConfirma ? 'Ocultar senha' : 'Mostrar senha'}
                        onClick={() => setVerConfirma((v) => !v)}
                      >
                        {verConfirma ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.actionsRowEnd}>
                  <button type="button" className={styles.btnOrange}>
                    <FiKey aria-hidden />
                    Atualizar senha
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-sec-sess">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-sec-sess">
                  <FiMonitor aria-hidden />
                  <h2 className={styles.cardTitle}>Sessões ativas</h2>
                </div>
                <p className={styles.cardDesc}>Dispositivos conectados à sua conta de administrador</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.sessionBox}>
                  <div className={styles.sessionMeta}>
                    <p className={styles.sessionTitle}>Este dispositivo · Chrome no Windows</p>
                    <p className={styles.sessionSub}>IP 192.168.x.x · Último acesso: hoje, 09:42</p>
                  </div>
                  <span className={styles.badgeAtiva}>Ativa</span>
                </div>
                <div className={styles.sectionRule} role="presentation" />
                <button type="button" className={styles.btnFullGhost}>
                  <FiTrash2 aria-hidden />
                  Encerrar outras sessões
                </button>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-sec-log">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-sec-log">
                  <FiShield aria-hidden />
                  <h2 className={styles.cardTitle}>Registro de segurança</h2>
                </div>
                <p className={styles.cardDesc}>Últimos eventos relevantes à conta e ao sistema</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.logList}>
                  <div className={styles.logRow}>
                    <span className={styles.logDotGreen} aria-hidden />
                    <div className={styles.logText}>
                      <p className={styles.logTitle}>Login bem-sucedido</p>
                      <p className={styles.logTime}>Hoje, 09:42 · Painel administrativo</p>
                    </div>
                  </div>
                  <div className={styles.logRow}>
                    <span className={styles.logDotBlue} aria-hidden />
                    <div className={styles.logText}>
                      <p className={styles.logTitle}>Alteração de configurações</p>
                      <p className={styles.logTime}>Ontem, 16:20 · E-mail SMTP</p>
                    </div>
                  </div>
                  <div className={styles.logRow}>
                    <span className={styles.logDotOrange} aria-hidden />
                    <div className={styles.logText}>
                      <p className={styles.logTitle}>Tentativa de login bloqueada</p>
                      <p className={styles.logTime}>12/05, 08:01 · IP desconhecido</p>
                    </div>
                  </div>
                </div>
                <div className={styles.actionsRowEnd}>
                  <button type="button" className={styles.btnGhost}>
                    <FiRefreshCw aria-hidden />
                    Atualizar lista
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : tab === 'email' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-mail-smtp">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-mail-smtp">
                  <FiMail aria-hidden />
                  <h2 className={styles.cardTitle}>Servidor SMTP</h2>
                </div>
                <p className={styles.cardDesc}>Credenciais usadas para envio de e-mails transacionais</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.grid2}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="smtp-host">
                      Host
                    </label>
                    <input
                      id="smtp-host"
                      className={styles.input}
                      value={smtpHost}
                      onChange={(e) => setSmtpHost(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="smtp-porta">
                      Porta
                    </label>
                    <input
                      id="smtp-porta"
                      className={styles.input}
                      value={smtpPorta}
                      onChange={(e) => setSmtpPorta(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="smtp-user">
                      Usuário
                    </label>
                    <input
                      id="smtp-user"
                      className={styles.input}
                      value={smtpUsuario}
                      onChange={(e) => setSmtpUsuario(e.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="smtp-pass">
                      Senha do aplicativo
                    </label>
                    <div className={styles.passwordFieldWrap}>
                      <input
                        id="smtp-pass"
                        type={verSmtpSenha ? 'text' : 'password'}
                        className={`${styles.input} ${styles.passwordInput}`}
                        value={smtpSenha}
                        onChange={(e) => setSmtpSenha(e.target.value)}
                        autoComplete="off"
                      />
                      <button
                        type="button"
                        className={styles.inputIconBtn}
                        aria-label={verSmtpSenha ? 'Ocultar senha' : 'Mostrar senha'}
                        onClick={() => setVerSmtpSenha((v) => !v)}
                      >
                        {verSmtpSenha ? <FiEyeOff aria-hidden /> : <FiEye aria-hidden />}
                      </button>
                    </div>
                    <p className={styles.fieldHint}>Recomendamos senha de app, nunca a senha da conta pessoal</p>
                  </div>
                </div>
                <div className={styles.grid2} style={{ marginTop: '0.75rem' }}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="mail-teste">
                      Enviar e-mail de teste para
                    </label>
                    <input
                      id="mail-teste"
                      type="email"
                      className={styles.input}
                      placeholder="seu@email.com"
                      value={emailTeste}
                      onChange={(e) => setEmailTeste(e.target.value)}
                    />
                  </div>
                </div>
                <div className={styles.btnRowSplit}>
                  <button type="button" className={styles.btnGhost}>
                    Cancelar
                  </button>
                  <button type="button" className={styles.btnPrimary}>
                    <FiSave aria-hidden />
                    Salvar SMTP
                  </button>
                  <button type="button" className={styles.btnOrange}>
                    <FiSend aria-hidden />
                    Enviar teste
                  </button>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-mail-tpl">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-mail-tpl">
                  <FiMail aria-hidden />
                  <h2 className={styles.cardTitle}>Modelos de e-mail</h2>
                </div>
                <p className={styles.cardDesc}>Acesse ou restaure modelos padrão de mensagens</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.templateList}>
                  <button type="button" className={styles.templateBtn}>
                    Boas-vindas ao aluno
                  </button>
                  <button type="button" className={styles.templateBtn}>
                    Redefinição de senha
                  </button>
                  <button type="button" className={styles.templateBtn}>
                    Resumo semanal para responsáveis
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : tab === 'notificacoes' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-not-pref">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-not-pref">
                  <FiBell aria-hidden />
                  <h2 className={styles.cardTitle}>Preferências</h2>
                </div>
                <p className={styles.cardDesc}>Escolha quais alertas o administrador recebe</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.toggleList}>
                  <div className={styles.notifPrefRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-nu">
                        Novos usuários
                      </p>
                      <p className={styles.toggleHint}>Quando um novo cadastro for concluído</p>
                    </div>
                    <ConfigToggle
                      on={notifNovosUsuarios}
                      onToggle={() => setNotifNovosUsuarios((v) => !v)}
                      labelledBy="lbl-nu"
                    />
                  </div>
                  <div className={styles.notifPrefRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-conq">
                        Conquistas e badges
                      </p>
                      <p className={styles.toggleHint}>Resumo de conquistas desbloqueadas</p>
                    </div>
                    <ConfigToggle
                      on={notifConquistas}
                      onToggle={() => setNotifConquistas((v) => !v)}
                      labelledBy="lbl-conq"
                    />
                  </div>
                  <div className={styles.notifPrefRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-rel">
                        Relatórios agendados
                      </p>
                      <p className={styles.toggleHint}>Envio automático de relatórios por e-mail</p>
                    </div>
                    <ConfigToggle
                      on={notifRelatorios}
                      onToggle={() => setNotifRelatorios((v) => !v)}
                      labelledBy="lbl-rel"
                    />
                  </div>
                  <div className={styles.notifPrefRow}>
                    <div className={styles.toggleText}>
                      <p className={styles.toggleLabel} id="lbl-man">
                        Manutenção programada
                      </p>
                      <p className={styles.toggleHint}>Avisos antes de janelas de manutenção</p>
                    </div>
                    <ConfigToggle
                      on={notifManutencao}
                      onToggle={() => setNotifManutencao((v) => !v)}
                      labelledBy="lbl-man"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-not-ch">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-not-ch">
                  <FiSend aria-hidden />
                  <h2 className={styles.cardTitle}>Canais</h2>
                </div>
                <p className={styles.cardDesc}>Ative ou desative canais de entrega</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.toggleList}>
                  <div className={styles.channelRow}>
                    <div className={`${styles.toggleText} ${styles.channelLeft}`}>
                      <FiMail className={styles.channelIcon} aria-hidden />
                      <div>
                        <p className={styles.toggleLabel} id="lbl-ch-email">
                          E-mail
                        </p>
                        <p className={styles.toggleHint}>Notificações na caixa de entrada</p>
                      </div>
                    </div>
                    <ConfigToggle on={canalEmail} onToggle={() => setCanalEmail((v) => !v)} labelledBy="lbl-ch-email" />
                  </div>
                  <div className={styles.channelRow}>
                    <div className={`${styles.toggleText} ${styles.channelLeft}`}>
                      <FiBell className={styles.channelIcon} aria-hidden />
                      <div>
                        <p className={styles.toggleLabel} id="lbl-ch-push">
                          Push no navegador
                        </p>
                        <p className={styles.toggleHint}>Alertas em tempo real no painel</p>
                      </div>
                    </div>
                    <ConfigToggle on={canalPush} onToggle={() => setCanalPush((v) => !v)} labelledBy="lbl-ch-push" />
                  </div>
                  <div className={styles.channelRow}>
                    <div className={`${styles.toggleText} ${styles.channelLeft}`}>
                      <FiCpu className={styles.channelIcon} aria-hidden />
                      <div>
                        <p className={styles.toggleLabel} id="lbl-ch-sms">
                          SMS (integração)
                        </p>
                        <p className={styles.toggleHint}>Requer provedor configurado em Integrações</p>
                      </div>
                    </div>
                    <ConfigToggle on={canalSms} onToggle={() => setCanalSms((v) => !v)} labelledBy="lbl-ch-sms" />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : tab === 'aparencia' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-ap-tema">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-ap-tema">
                  <FiMonitor aria-hidden />
                  <h2 className={styles.cardTitle}>Tema da interface</h2>
                </div>
                <p className={styles.cardDesc}>Aparência do painel para administradores e alunos</p>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.subheading}>Modo de exibição</p>
                <div className={styles.swatchGrid} role="radiogroup" aria-label="Tema">
                  {temas.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      role="radio"
                      aria-checked={temaId === t.id}
                      className={styles.swatchBtn}
                      data-selected={temaId === t.id ? 'true' : 'false'}
                      onClick={() => setTemaId(t.id)}
                    >
                      <span className={styles.swatchInner} style={{ background: t.cor }} />
                      <span className={styles.swatchLabel}>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-ap-stars">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-ap-stars">
                  <FiSliders aria-hidden />
                  <h2 className={styles.cardTitle}>Cores STARS</h2>
                </div>
                <p className={styles.cardDesc}>Paleta usada em gamificação e componentes de destaque</p>
              </div>
              <div className={styles.cardBody}>
                {starsCores.map((s) => (
                  <div key={s.hex} className={styles.starsRow}>
                    <span className={styles.starsSwatch} style={{ background: s.cor }} aria-hidden />
                    <div className={styles.starsText}>
                      <p className={styles.starsName}>{s.nome}</p>
                      <p className={styles.starsHex}>{s.hex}</p>
                    </div>
                    <button type="button" className={styles.btnAlterar}>
                      Alterar
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-ap-fav">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-ap-fav">
                  <FiHome aria-hidden />
                  <h2 className={styles.cardTitle}>Favicon</h2>
                </div>
                <p className={styles.cardDesc}>Ícone exibido na aba do navegador</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.faviconRow}>
                  <div className={styles.faviconPreview} aria-hidden>
                    E
                  </div>
                  <div>
                    <p className={styles.manualMeta}>PNG ou ICO · recomendado 32×32 px</p>
                    <div className={styles.faviconActions}>
                      <button type="button" className={styles.btnSm}>
                        <FiCloud aria-hidden />
                        Enviar arquivo
                      </button>
                      <button type="button" className={styles.btnSm}>
                        Restaurar padrão
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.actionsRowEnd}>
                  <button type="button" className={styles.btnPrimary}>
                    <FiSave aria-hidden />
                    Salvar aparência
                  </button>
                </div>
              </div>
            </section>
          </>
        ) : tab === 'backup' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-bk-auto">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-bk-auto">
                  <FiHardDrive aria-hidden />
                  <h2 className={styles.cardTitle}>Backup automático</h2>
                </div>
                <p className={styles.cardDesc}>Agendamento e status do último backup em nuvem</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.scheduledInfo}>
                  <FiRefreshCw className={styles.scheduledIcon} aria-hidden />
                  <div>
                    <p className={styles.manualTitle} style={{ marginBottom: '0.35rem' }}>
                      Próximo backup agendado
                    </p>
                    <p className={styles.manualDate}>Hoje, 23:00 · Retenção de 14 dias</p>
                    <p style={{ margin: '0.5rem 0 0' }}>
                      <span className={styles.badgeSucesso}>Último job concluído com sucesso</span>
                    </p>
                  </div>
                </div>
                <button type="button" className={styles.btnGhost}>
                  Editar agendamento
                </button>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-bk-man">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-bk-man">
                  <FiSave aria-hidden />
                  <h2 className={styles.cardTitle}>Backup manual</h2>
                </div>
                <p className={styles.cardDesc}>Gere um instantâneo sob demanda do banco e arquivos</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.manualSummary}>
                  <div className={styles.manualRow}>
                    <div>
                      <p className={styles.manualTitle}>Último backup manual</p>
                      <p className={styles.manualDate}>14/05/2026, 18:32</p>
                      <p className={styles.manualMeta}>Tamanho aproximado: 128 MB · armazenamento seguro</p>
                    </div>
                    <span className={styles.badgeSucesso}>Concluído</span>
                  </div>
                  <div className={styles.backupActions}>
                    <button type="button" className={styles.backupPrimaryBtn}>
                      <FiHardDrive aria-hidden />
                      Criar backup agora
                    </button>
                    <button type="button" className={styles.backupSecondaryBtn}>
                      <FiDownload aria-hidden />
                      Baixar
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-bk-hist">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-bk-hist">
                  <FiCloud aria-hidden />
                  <h2 className={styles.cardTitle}>Histórico</h2>
                </div>
                <p className={styles.cardDesc}>Backups recentes disponíveis para restauração</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.historyRow}>
                  <div className={styles.historyMeta}>
                    <p className={styles.historyDate}>15/05/2026 — 06:00 (automático)</p>
                    <p className={styles.historySize}>132 MB</p>
                  </div>
                  <div className={styles.historyActions}>
                    <button type="button" className={styles.iconOnlyBtn} aria-label="Baixar backup">
                      <FiDownload aria-hidden />
                    </button>
                    <button type="button" className={styles.iconOnlyBtn} aria-label="Excluir backup">
                      <FiTrash2 aria-hidden />
                    </button>
                  </div>
                </div>
                <div className={styles.historyRow}>
                  <div className={styles.historyMeta}>
                    <p className={styles.historyDate}>14/05/2026 — 18:32 (manual)</p>
                    <p className={styles.historySize}>128 MB</p>
                  </div>
                  <div className={styles.historyActions}>
                    <button type="button" className={styles.iconOnlyBtn} aria-label="Baixar backup">
                      <FiDownload aria-hidden />
                    </button>
                    <button type="button" className={styles.iconOnlyBtn} aria-label="Excluir backup">
                      <FiTrash2 aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : tab === 'integracoes' ? (
          <>
            <section className={styles.card} aria-labelledby="cfg-int-serv">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-int-serv">
                  <FiCpu aria-hidden />
                  <h2 className={styles.cardTitle}>Serviços conectados</h2>
                </div>
                <p className={styles.cardDesc}>Autenticação, armazenamento e mensageria</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.integrationsGrid}>
                  <div className={styles.integrationCard}>
                    <div className={styles.integrationCardInner}>
                      <div className={styles.integrationHead}>
                        <div className={styles.integrationLogo} aria-hidden>
                          G
                        </div>
                        <div>
                          <h3 className={styles.integrationTitle}>Google Workspace</h3>
                          <span className={styles.badgeConnected}>Conectado</span>
                        </div>
                      </div>
                      <button type="button" className={styles.integrationFooterBtn}>
                        Gerenciar permissões
                      </button>
                    </div>
                  </div>
                  <div className={styles.integrationCard}>
                    <div className={styles.integrationCardInner}>
                      <div className={styles.integrationHead}>
                        <div className={styles.integrationLogo} aria-hidden>
                          M
                        </div>
                        <div>
                          <h3 className={styles.integrationTitle}>Microsoft 365</h3>
                          <span className={styles.badgeDisconnected}>Não conectado</span>
                        </div>
                      </div>
                      <button type="button" className={styles.integrationFooterBtn}>
                        Conectar conta
                      </button>
                    </div>
                  </div>
                  <div className={styles.integrationCard}>
                    <div className={styles.integrationCardInner}>
                      <div className={styles.integrationHead}>
                        <div className={styles.integrationLogo} aria-hidden>
                          S3
                        </div>
                        <div>
                          <h3 className={styles.integrationTitle}>Armazenamento S3</h3>
                          <span className={styles.badgeConnected}>Conectado</span>
                        </div>
                      </div>
                      <button type="button" className={styles.integrationFooterBtn}>
                        Editar bucket
                      </button>
                    </div>
                  </div>
                  <div className={styles.integrationCard}>
                    <div className={styles.integrationCardInner}>
                      <div className={styles.integrationHead}>
                        <div className={styles.integrationLogo} aria-hidden>
                          WA
                        </div>
                        <div>
                          <h3 className={styles.integrationTitle}>WhatsApp Business</h3>
                          <span className={styles.badgeDisconnected}>Não conectado</span>
                        </div>
                      </div>
                      <button type="button" className={styles.integrationFooterBtn}>
                        Configurar API
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className={styles.card} aria-labelledby="cfg-int-api">
              <div className={styles.cardHeader}>
                <div className={styles.cardTitleRow} id="cfg-int-api">
                  <FiKey aria-hidden />
                  <h2 className={styles.cardTitle}>Chaves de API</h2>
                </div>
                <p className={styles.cardDesc}>Credenciais para integrações externas com a plataforma</p>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.apiKeyBlock}>
                  <div className={styles.apiKeyLabelRow}>
                    <p className={styles.apiKeyLabel}>Chave pública</p>
                    <button type="button" className={styles.btnSm} aria-label="Copiar chave pública">
                      <FiCopy aria-hidden />
                      Copiar
                    </button>
                  </div>
                  <pre className={styles.codeMono}>pk_live_eden_••••••••••••••••</pre>
                </div>
                <div className={styles.apiKeyBlock}>
                  <div className={styles.apiKeyLabelRow}>
                    <p className={styles.apiKeyLabel}>Chave secreta</p>
                    <button type="button" className={styles.btnSm} aria-label="Copiar chave secreta">
                      <FiCopy aria-hidden />
                      Copiar
                    </button>
                  </div>
                  <pre className={styles.codeMono}>sk_live_eden_••••••••••••••••</pre>
                </div>
                <button type="button" className={styles.btnGenerateKeys}>
                  <FiRefreshCw aria-hidden />
                  Gerar novas chaves
                </button>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </div>
  )
}
