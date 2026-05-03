'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { FiCheck, FiGrid, FiX } from 'react-icons/fi'
import { GiClothes, GiCrossedSwords, GiGemNecklace, GiRoundShield } from 'react-icons/gi'
import { cn } from '@src/utils/cn'
import type { CustomizeTabId } from './personalizeCatalog'
import { filterCatalog, itemById, ITEMS_PER_PAGE } from './personalizeCatalog'
import { PersonalizeAvatar3DDemo } from './PersonalizeAvatar3DDemo'
import styles from './PersonalizePersonagemModal.module.scss'

export type PersonagemModalCharacter = 'adao' | 'eva'

type PersonalizePersonagemModalProps = {
  readonly open: boolean
  readonly onClose: () => void
  readonly character: PersonagemModalCharacter
  readonly onSave?: (equippedIds: string[]) => void
}

const TAB_DEF: { id: CustomizeTabId; label: string; Icon: typeof FiGrid }[] = [
  { id: 'tudo', label: 'Tudo', Icon: FiGrid },
  { id: 'roupa', label: 'Roupas', Icon: GiClothes },
  { id: 'acessorios', label: 'Acessórios', Icon: GiGemNecklace },
  { id: 'armas', label: 'Armas', Icon: GiCrossedSwords },
  { id: 'ferramentas', label: 'Equipamentos', Icon: GiRoundShield },
]

const COPY: Record<
  PersonagemModalCharacter,
  { title: string; subtitle: string; previewName: string; previewDesc: string }
> = {
  adao: {
    title: 'Personalize Adão',
    subtitle: 'Deixe seu personagem com estilo, mude roupas, acessórios e equipamentos.',
    previewName: 'Adão',
    previewDesc: 'O primeiro homem da Terra',
  },
  eva: {
    title: 'Personalize Eva',
    subtitle: 'Deixe seu personagem com estilo, mude roupas, acessórios e equipamentos.',
    previewName: 'Eva',
    previewDesc: 'A primeira mulher da Terra',
  },
}

const DEFAULT_EQUIPPED_ADAO = ['w1', 'e2'] // Espada de Ferro, Luvas de Proteção
const DEFAULT_EQUIPPED_EVA = ['r2', 'a1']

export function PersonalizePersonagemModal({ open, onClose, character, onSave }: PersonalizePersonagemModalProps) {
  const titleId = useId()
  const [tab, setTab] = useState<CustomizeTabId>('tudo')
  const [page, setPage] = useState(1)
  const [equippedIds, setEquippedIds] = useState<string[]>([])

  const copy = COPY[character]

  useEffect(() => {
    if (!open) return
    setTab('tudo')
    setPage(1)
    setEquippedIds(character === 'adao' ? [...DEFAULT_EQUIPPED_ADAO] : [...DEFAULT_EQUIPPED_EVA])
  }, [open, character])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const filtered = useMemo(() => filterCatalog(tab), [tab])

  useEffect(() => {
    setPage(1)
  }, [tab])

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE))
  const safePage = Math.min(page, totalPages)
  const slice = filtered.slice((safePage - 1) * ITEMS_PER_PAGE, safePage * ITEMS_PER_PAGE)

  const equippedLabels = equippedIds
    .map((id) => itemById(id))
    .filter(Boolean)
    .map((i) => i!.name)

  const toggleItem = (id: string) => {
    setEquippedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const save = () => {
    onSave?.(equippedIds)
    onClose()
  }

  if (!open || typeof document === 'undefined') return null

  return createPortal(
    <div
      className={styles.backdrop}
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className={styles.panel} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Fechar">
            <FiX style={{ width: '1.25rem', height: '1.25rem' }} aria-hidden />
          </button>
          <div className={styles.titleRow}>
            <span className={styles.titleDot} aria-hidden />
            <div>
              <h2 id={titleId} className={styles.title}>
                {copy.title}
              </h2>
              <p className={styles.subtitle}>{copy.subtitle}</p>
            </div>
          </div>
        </header>

        <div className={styles.body}>
          <div>
            <p className={styles.previewLabel}>Preview</p>
            <div className={cn(styles.previewBox, character === 'eva' && styles.previewBoxEva)}>
              <p className={styles.previewName}>{copy.previewName}</p>
              <p className={styles.previewDesc}>{copy.previewDesc}</p>
              <p className={styles.preview3dLabel}>Demo 3D (WebGL)</p>
              <PersonalizeAvatar3DDemo focus={character} />
              <p className={styles.equipTitle}>Equipado</p>
              {equippedLabels.length === 0 ? (
                <p className={styles.equipEmpty}>Nenhum item selecionado.</p>
              ) : (
                <ul className={styles.equipList}>
                  {equippedLabels.map((label) => (
                    <li key={label} className={styles.equipRow}>
                      <FiCheck className={styles.check} style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                      {label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.tabs} role="tablist" aria-label="Categorias">
              {TAB_DEF.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  className={cn(styles.tab, tab === id && styles.tabActive)}
                  onClick={() => setTab(id)}
                >
                  <Icon style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
                  {label}
                </button>
              ))}
            </div>

            <div className={styles.gridWrap}>
              <div className={styles.grid}>
                {slice.map((item) => {
                  const on = equippedIds.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      type="button"
                      className={cn(styles.itemCard, on && styles.itemCardSelected)}
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.name}
                    </button>
                  )
                })}
              </div>

              <div className={styles.pagination}>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={safePage <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </button>
                <span className={styles.pageCurrent}>{safePage}</span>
                <button
                  type="button"
                  className={styles.pageBtn}
                  disabled={safePage >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Próxima
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <button type="button" className={styles.btnCancel} onClick={onClose}>
            Cancelar
          </button>
          <button type="button" className={styles.btnSave} onClick={save}>
            Salvar Personalização
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
