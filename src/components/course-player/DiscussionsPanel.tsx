'use client'

import { useMemo, useState } from 'react'
import { FiPlus, FiSearch } from 'react-icons/fi'
import type { DiscussionCategoryTag, DiscussionPost } from '@src/types/courseContent.types'
import styles from './DiscussionsPanel.module.scss'

const CATEGORY_STYLES: Record<
  DiscussionCategoryTag,
  { label: string; background: string; color: string }
> = {
  ciencias: { label: 'Ciências', background: '#faf5f0', color: '#965a3e' },
  tecnologia: { label: 'Tecnologia', background: '#f3f0fa', color: '#7c3aed' },
  artes: { label: 'Artes', background: '#fff5f0', color: '#ea580c' },
  relacionamento: { label: 'Relações', background: '#f0faf5', color: '#2563eb' },
  servico: { label: 'Serviço', background: '#fff0f2', color: '#059669' },
}

function initials(name: string): string {
  const parts = name.trim().split(/\s+/)
  const a = parts[0]?.[0] ?? '?'
  const b = parts[1]?.[0] ?? ''
  return (a + b).toUpperCase()
}

interface DiscussionsPanelProps {
  posts: DiscussionPost[]
}

export function DiscussionsPanel({ posts }: DiscussionsPanelProps) {
  const [q, setQ] = useState('')

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return posts
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.excerpt.toLowerCase().includes(s) ||
        p.authorName.toLowerCase().includes(s) ||
        p.hashtags.some((h) => h.toLowerCase().includes(s)),
    )
  }, [posts, q])

  return (
    <section aria-label="Discussões da aula">
      <div className={styles.toolbar}>
        <div className={styles.starsRow} aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className={i < 4 ? styles.starOn : styles.starOff}>
              ★
            </span>
          ))}
        </div>
        <button type="button" className={styles.cta}>
          <FiPlus style={{ width: '1rem', height: '1rem' }} aria-hidden />
          Nova Discussão
        </button>
      </div>

      <div className={styles.searchWrap}>
        <FiSearch className={styles.searchIcon} style={{ width: '1rem', height: '1rem' }} aria-hidden />
        <input
          className={styles.searchInput}
          type="search"
          placeholder="Buscar discussões, tags ou autores..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Buscar discussões"
        />
      </div>

      {filtered.length === 0 ? (
        <p className={styles.empty}>Nenhuma discussão encontrada.</p>
      ) : (
        <div className={styles.list}>
          {filtered.map((post) => {
            const cat = CATEGORY_STYLES[post.category]
            return (
              <article key={post.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.avatar} aria-hidden>
                    {initials(post.authorName)}
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                    <p className={styles.meta}>
                      {post.authorName} · {post.authorAge} · {post.authorRole} · {post.dateLabel}
                    </p>
                    <span
                      className={styles.catTag}
                      style={{ background: cat.background, color: cat.color }}
                    >
                      {cat.label}
                    </span>
                    <p className={styles.excerpt}>{post.excerpt}</p>
                    <div className={styles.hashtags}>
                      {post.hashtags.map((h) => (
                        <span key={h} className={styles.hash}>
                          {h}
                        </span>
                      ))}
                    </div>
                    <div className={styles.cardFoot}>
                      <span>
                        {post.likes} curtidas · {post.comments} comentários · {post.views} visualizações
                      </span>
                      <div className={styles.actions}>
                        <button type="button" className={styles.linkish}>
                          Curtir
                        </button>
                        <button type="button" className={styles.linkish}>
                          Responder
                        </button>
                        <button type="button" className={styles.linkish}>
                          Compartilhar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
