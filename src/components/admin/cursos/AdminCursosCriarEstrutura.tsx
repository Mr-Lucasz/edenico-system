'use client'

import type { Dispatch, SetStateAction } from 'react'
import {
  FiChevronDown,
  FiFileText,
  FiHelpCircle,
  FiPlus,
  FiTrash2,
  FiVideo,
} from 'react-icons/fi'
import s from './AdminCursosCriarView.module.scss'

export function nid() {
  return globalThis.crypto?.randomUUID?.() ?? `x_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export type QuizQuestaoState = {
  id: string
  texto: string
  pontos: number
  tipo: string
  opcoes: string[]
  correta: number
}

export type VideoBlockState = {
  tab: 'link' | 'upload'
  titulo: string
  url: string
  duracao: string
}

export type PdfBlockState = {
  tab: 'link' | 'upload'
  titulo: string
  link: string
  arquivos: { id: string; nome: string }[]
}

export type QuizBlockState = {
  titulo: string
  questoes: QuizQuestaoState[]
}

export type ContentBlockState =
  | { id: string; kind: 'video'; video: VideoBlockState }
  | { id: string; kind: 'pdf'; pdf: PdfBlockState }
  | { id: string; kind: 'quiz'; quiz: QuizBlockState }

export type ChapterState = {
  id: string
  titulo: string
  open: boolean
  contents: ContentBlockState[]
}

export type UnitState = {
  id: string
  titulo: string
  descricao: string
  open: boolean
  chapters: ChapterState[]
}

type Props = {
  units: UnitState[]
  setUnits: Dispatch<SetStateAction<UnitState[]>>
}

function defaultVideo(): VideoBlockState {
  return { tab: 'link', titulo: '', url: '', duracao: '15:00 min' }
}

function defaultPdf(): PdfBlockState {
  return {
    tab: 'link',
    titulo: '',
    link: '',
    arquivos: [{ id: nid(), nome: 'apostila-demo.pdf' }],
  }
}

function defaultQuiz(): QuizBlockState {
  return {
    titulo: '',
    questoes: [
      {
        id: nid(),
        texto: '',
        pontos: 1,
        tipo: 'Múltipla Escolha',
        opcoes: ['', '', ''],
        correta: 0,
      },
    ],
  }
}

function sumPontos(qs: QuizQuestaoState[]) {
  return qs.reduce((a, q) => a + (Number.isFinite(q.pontos) ? q.pontos : 0), 0)
}

export function AdminCursosCriarEstrutura({ units, setUnits }: Props) {
  function addUnit() {
    setUnits((prev) => [
      ...prev,
      {
        id: nid(),
        titulo: `Unidade ${prev.length + 1}`,
        descricao: '',
        open: true,
        chapters: [],
      },
    ])
  }

  function toggleUnit(uid: string) {
    setUnits((prev) => prev.map((u) => (u.id === uid ? { ...u, open: !u.open } : u)))
  }

  function patchUnit(uid: string, patch: Partial<Pick<UnitState, 'titulo' | 'descricao'>>) {
    setUnits((prev) => prev.map((u) => (u.id === uid ? { ...u, ...patch } : u)))
  }

  function removeUnit(uid: string) {
    setUnits((prev) => prev.filter((u) => u.id !== uid))
  }

  function addChapter(uid: string) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        const n = u.chapters.length + 1
        return {
          ...u,
          chapters: [
            ...u.chapters,
            { id: nid(), titulo: `Capítulo ${n}`, open: true, contents: [] },
          ],
        }
      }),
    )
  }

  function toggleChapter(uid: string, cid: string) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((c) => (c.id === cid ? { ...c, open: !c.open } : c)),
        }
      }),
    )
  }

  function patchChapter(uid: string, cid: string, titulo: string) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((c) => (c.id === cid ? { ...c, titulo } : c)),
        }
      }),
    )
  }

  function removeChapter(uid: string, cid: string) {
    setUnits((prev) =>
      prev.map((u) => (u.id !== uid ? u : { ...u, chapters: u.chapters.filter((c) => c.id !== cid) })),
    )
  }

  function addContent(uid: string, cid: string, kind: 'video' | 'pdf' | 'quiz') {
    const block: ContentBlockState =
      kind === 'video'
        ? { id: nid(), kind: 'video', video: defaultVideo() }
        : kind === 'pdf'
          ? { id: nid(), kind: 'pdf', pdf: defaultPdf() }
          : { id: nid(), kind: 'quiz', quiz: defaultQuiz() }

    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((c) =>
            c.id === cid ? { ...c, contents: [...c.contents, block] } : c,
          ),
        }
      }),
    )
  }

  function removeContent(uid: string, cid: string, bid: string) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((c) =>
            c.id === cid ? { ...c, contents: c.contents.filter((b) => b.id !== bid) } : c,
          ),
        }
      }),
    )
  }

  function patchVideo(uid: string, cid: string, bid: string, video: VideoBlockState) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((ch) =>
            ch.id !== cid
              ? ch
              : {
                  ...ch,
                  contents: ch.contents.map((b) =>
                    b.id === bid && b.kind === 'video' ? { ...b, video } : b,
                  ),
                },
          ),
        }
      }),
    )
  }

  function patchPdf(uid: string, cid: string, bid: string, pdf: PdfBlockState) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((ch) =>
            ch.id !== cid
              ? ch
              : {
                  ...ch,
                  contents: ch.contents.map((b) => (b.id === bid && b.kind === 'pdf' ? { ...b, pdf } : b)),
                },
          ),
        }
      }),
    )
  }

  function patchQuiz(uid: string, cid: string, bid: string, quiz: QuizBlockState) {
    setUnits((prev) =>
      prev.map((u) => {
        if (u.id !== uid) return u
        return {
          ...u,
          chapters: u.chapters.map((ch) =>
            ch.id !== cid
              ? ch
              : {
                  ...ch,
                  contents: ch.contents.map((b) =>
                    b.id === bid && b.kind === 'quiz' ? { ...b, quiz } : b,
                  ),
                },
          ),
        }
      }),
    )
  }

  return (
    <section className={s.card} aria-labelledby="estrutura-title">
      <div className={s.cardHead}>
        <h2 id="estrutura-title" className={s.cardTitle}>
          Estrutura do Curso
        </h2>
        <button type="button" className={s.btnBlue} onClick={addUnit}>
          <FiPlus aria-hidden />
          Adicionar Unidade
        </button>
      </div>
      <div className={s.cardBody}>
        {units.length === 0 ? (
          <p className={s.emptyEstrutura}>
            Nenhuma unidade adicionada ainda. Clique em &apos;Adicionar Unidade&apos; para começar
          </p>
        ) : (
          units.map((u, ui) => (
            <div key={u.id} className={s.unit}>
              <div className={s.unitHead}>
                <div className={s.unitHeadLeft}>
                  <button type="button" className={s.unitHeadBtn} onClick={() => toggleUnit(u.id)}>
                    <FiChevronDown
                      aria-hidden
                      className={`${s.unitChevron} ${u.open ? s.unitChevronOpen : ''}`}
                    />
                    Unidade {ui + 1}
                  </button>
                </div>
                <button
                  type="button"
                  className={s.iconBtn}
                  aria-label="Remover unidade"
                  onClick={() => removeUnit(u.id)}
                >
                  <FiTrash2 aria-hidden />
                </button>
              </div>
              {u.open ? (
                <div className={s.unitBody}>
                  <div className={s.field}>
                    <label className={s.label} htmlFor={`ut-${u.id}`}>
                      Título da unidade
                    </label>
                    <input
                      id={`ut-${u.id}`}
                      className={s.input}
                      value={u.titulo}
                      onChange={(e) => patchUnit(u.id, { titulo: e.target.value })}
                    />
                  </div>
                  <div className={`${s.field} ${s.smGap}`}>
                    <label className={s.label} htmlFor={`ud-${u.id}`}>
                      Descrição (opcional)
                    </label>
                    <textarea
                      id={`ud-${u.id}`}
                      className={s.textarea}
                      style={{ minHeight: '4rem' }}
                      value={u.descricao}
                      onChange={(e) => patchUnit(u.id, { descricao: e.target.value })}
                    />
                  </div>

                  {u.chapters.map((ch, ci) => (
                    <div key={ch.id} className={s.chapter}>
                      <div className={s.chapterHead}>
                        <button type="button" className={s.chapterHeadBtn} onClick={() => toggleChapter(u.id, ch.id)}>
                          <FiChevronDown
                            aria-hidden
                            className={`${s.unitChevron} ${ch.open ? s.unitChevronOpen : ''}`}
                          />
                          Capítulo {ci + 1}
                        </button>
                        <button
                          type="button"
                          className={s.iconBtn}
                          aria-label="Remover capítulo"
                          onClick={() => removeChapter(u.id, ch.id)}
                        >
                          <FiTrash2 aria-hidden />
                        </button>
                      </div>
                      {ch.open ? (
                        <div className={s.chapterBody}>
                          <div className={s.field}>
                            <label className={s.label} htmlFor={`ct-${ch.id}`}>
                              Título do capítulo
                            </label>
                            <input
                              id={`ct-${ch.id}`}
                              className={s.input}
                              value={ch.titulo}
                              onChange={(e) => patchChapter(u.id, ch.id, e.target.value)}
                            />
                          </div>

                          {ch.contents.map((b) => {
                            if (b.kind === 'video') {
                              const v = b.video
                              return (
                                <div key={b.id} className={`${s.block} ${s.blockVideo}`}>
                                  <div className={s.blockHead}>
                                    <span className={s.blockHeadLeft}>
                                      <FiVideo aria-hidden />
                                      Vídeo
                                    </span>
                                    <button
                                      type="button"
                                      className={s.iconBtn}
                                      aria-label="Remover conteúdo"
                                      onClick={() => removeContent(u.id, ch.id, b.id)}
                                    >
                                      <FiTrash2 aria-hidden />
                                    </button>
                                  </div>
                                  <div className={s.blockBody}>
                                    <div className={s.field}>
                                      <label className={s.label}>Título</label>
                                      <input
                                        className={s.input}
                                        value={v.titulo}
                                        onChange={(e) =>
                                          patchVideo(u.id, ch.id, b.id, { ...v, titulo: e.target.value })
                                        }
                                      />
                                    </div>
                                    <div className={s.tabs}>
                                      <button
                                        type="button"
                                        className={`${s.tab} ${v.tab === 'link' ? s.tabOn : ''}`}
                                        onClick={() => patchVideo(u.id, ch.id, b.id, { ...v, tab: 'link' })}
                                      >
                                        Link do Vídeo
                                      </button>
                                      <button
                                        type="button"
                                        className={`${s.tab} ${v.tab === 'upload' ? s.tabOn : ''}`}
                                        onClick={() => patchVideo(u.id, ch.id, b.id, { ...v, tab: 'upload' })}
                                      >
                                        Subir Vídeo
                                      </button>
                                    </div>
                                    {v.tab === 'link' ? (
                                      <input
                                        className={s.input}
                                        placeholder="https://..."
                                        value={v.url}
                                        onChange={(e) =>
                                          patchVideo(u.id, ch.id, b.id, { ...v, url: e.target.value })
                                        }
                                      />
                                    ) : (
                                      <div className={s.dropZone}>Arraste um vídeo ou clique para selecionar (demo)</div>
                                    )}
                                    <div className={s.preview}>Pré-visualização do player</div>
                                    <div className={s.duracao}>Duração: {v.duracao}</div>
                                  </div>
                                </div>
                              )
                            }
                            if (b.kind === 'pdf') {
                              const p = b.pdf
                              return (
                                <div key={b.id} className={`${s.block} ${s.blockPdf}`}>
                                  <div className={s.blockHead}>
                                    <span className={s.blockHeadLeft}>
                                      <FiFileText aria-hidden />
                                      PDF
                                    </span>
                                    <button
                                      type="button"
                                      className={s.iconBtn}
                                      aria-label="Remover conteúdo"
                                      onClick={() => removeContent(u.id, ch.id, b.id)}
                                    >
                                      <FiTrash2 aria-hidden />
                                    </button>
                                  </div>
                                  <div className={s.blockBody}>
                                    <div className={s.field}>
                                      <label className={s.label}>Título</label>
                                      <input
                                        className={s.input}
                                        value={p.titulo}
                                        onChange={(e) =>
                                          patchPdf(u.id, ch.id, b.id, { ...p, titulo: e.target.value })
                                        }
                                      />
                                    </div>
                                    <div className={s.tabs}>
                                      <button
                                        type="button"
                                        className={`${s.tab} ${p.tab === 'link' ? s.tabOn : ''}`}
                                        onClick={() => patchPdf(u.id, ch.id, b.id, { ...p, tab: 'link' })}
                                      >
                                        Link do Arquivo
                                      </button>
                                      <button
                                        type="button"
                                        className={`${s.tab} ${p.tab === 'upload' ? s.tabOn : ''}`}
                                        onClick={() => patchPdf(u.id, ch.id, b.id, { ...p, tab: 'upload' })}
                                      >
                                        Subir Arquivo
                                      </button>
                                    </div>
                                    {p.tab === 'link' ? (
                                      <input
                                        className={s.input}
                                        placeholder="https://..."
                                        value={p.link}
                                        onChange={(e) =>
                                          patchPdf(u.id, ch.id, b.id, { ...p, link: e.target.value })
                                        }
                                      />
                                    ) : (
                                      <div className={s.dropZone}>Área de upload (demo)</div>
                                    )}
                                    {p.arquivos.map((f) => (
                                      <div key={f.id} className={s.fileRow}>
                                        <span className={s.fileName}>{f.nome}</span>
                                        <button type="button" className={s.btnView}>
                                          Visualizar
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )
                            }
                            const qz = b.quiz
                            const total = sumPontos(qz.questoes)
                            return (
                              <div key={b.id} className={`${s.block} ${s.blockQuiz}`}>
                                <div className={s.blockHead}>
                                  <span className={s.blockHeadLeft}>
                                    <FiHelpCircle aria-hidden />
                                    Quiz
                                  </span>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <span className={s.totalPts}>Total de Pontos: {total}</span>
                                    <button
                                      type="button"
                                      className={s.iconBtn}
                                      aria-label="Remover conteúdo"
                                      onClick={() => removeContent(u.id, ch.id, b.id)}
                                    >
                                      <FiTrash2 aria-hidden />
                                    </button>
                                  </div>
                                </div>
                                <div className={s.blockBody}>
                                  <div className={s.field}>
                                    <label className={s.label}>Título do quiz</label>
                                    <input
                                      className={s.input}
                                      value={qz.titulo}
                                      onChange={(e) =>
                                        patchQuiz(u.id, ch.id, b.id, { ...qz, titulo: e.target.value })
                                      }
                                    />
                                  </div>
                                  {qz.questoes.map((qu, qi) => (
                                    <div key={qu.id} className={s.quizQ}>
                                      <div className={s.quizQTop}>
                                        <span className={s.quizQLabel}>Questão {qi + 1}</span>
                                        <label className={s.label} style={{ margin: 0 }}>
                                          Pontos:{' '}
                                          <input
                                            type="number"
                                            min={0}
                                            className={s.input}
                                            style={{ width: '4rem', display: 'inline-block', padding: '0.25rem' }}
                                            value={String(qu.pontos)}
                                            onChange={(e) => {
                                              const pontos = Number(e.target.value) || 0
                                              const questoes = qz.questoes.map((x) =>
                                                x.id === qu.id ? { ...x, pontos } : x,
                                              )
                                              patchQuiz(u.id, ch.id, b.id, { ...qz, questoes })
                                            }}
                                          />
                                        </label>
                                      </div>
                                      <input
                                        className={s.input}
                                        placeholder="Enunciado da questão"
                                        value={qu.texto}
                                        onChange={(e) => {
                                          const questoes = qz.questoes.map((x) =>
                                            x.id === qu.id ? { ...x, texto: e.target.value } : x,
                                          )
                                          patchQuiz(u.id, ch.id, b.id, { ...qz, questoes })
                                        }}
                                      />
                                      <div className={s.field} style={{ marginTop: '0.5rem' }}>
                                        <label className={s.label}>Tipo</label>
                                        <select
                                          className={s.select}
                                          value={qu.tipo}
                                          onChange={(e) => {
                                            const questoes = qz.questoes.map((x) =>
                                              x.id === qu.id ? { ...x, tipo: e.target.value } : x,
                                            )
                                            patchQuiz(u.id, ch.id, b.id, { ...qz, questoes })
                                          }}
                                        >
                                          <option>Múltipla Escolha</option>
                                          <option>Verdadeiro/Falso</option>
                                        </select>
                                      </div>
                                      {qu.opcoes.map((op, oi) => (
                                        <div key={`${qu.id}-o-${oi}`} className={s.radioRow}>
                                          <input
                                            type="radio"
                                            name={`corr-${b.id}-${qu.id}`}
                                            checked={qu.correta === oi}
                                            onChange={() => {
                                              const questoes = qz.questoes.map((x) =>
                                                x.id === qu.id ? { ...x, correta: oi } : x,
                                              )
                                              patchQuiz(u.id, ch.id, b.id, { ...qz, questoes })
                                            }}
                                          />
                                          <input
                                            className={`${s.input} ${s.optionInput}`}
                                            placeholder={`Opção ${oi + 1}`}
                                            value={op}
                                            onChange={(e) => {
                                              const opcoes = qu.opcoes.map((t, j) =>
                                                j === oi ? e.target.value : t,
                                              )
                                              const questoes = qz.questoes.map((x) =>
                                                x.id === qu.id ? { ...x, opcoes } : x,
                                              )
                                              patchQuiz(u.id, ch.id, b.id, { ...qz, questoes })
                                            }}
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                  <button
                                    type="button"
                                    className={s.addQ}
                                    onClick={() => {
                                      const questoes = [
                                        ...qz.questoes,
                                        {
                                          id: nid(),
                                          texto: '',
                                          pontos: 1,
                                          tipo: 'Múltipla Escolha',
                                          opcoes: ['', '', ''],
                                          correta: 0,
                                        },
                                      ]
                                      patchQuiz(u.id, ch.id, b.id, { ...qz, questoes })
                                    }}
                                  >
                                    + Adicionar Questão
                                  </button>
                                </div>
                              </div>
                            )
                          })}

                          <div className={s.addContentRow}>
                            <button
                              type="button"
                              className={`${s.miniBtn} ${s.miniVideo}`}
                              onClick={() => addContent(u.id, ch.id, 'video')}
                            >
                              + Vídeo
                            </button>
                            <button
                              type="button"
                              className={`${s.miniBtn} ${s.miniPdf}`}
                              onClick={() => addContent(u.id, ch.id, 'pdf')}
                            >
                              + PDF
                            </button>
                            <button
                              type="button"
                              className={`${s.miniBtn} ${s.miniQuiz}`}
                              onClick={() => addContent(u.id, ch.id, 'quiz')}
                            >
                              + Quiz
                            </button>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}

                  <button type="button" className={s.addChapter} onClick={() => addChapter(u.id)}>
                    + Adicionar Capítulo
                  </button>
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
