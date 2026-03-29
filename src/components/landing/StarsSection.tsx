'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { starsCategories } from '@src/data/starsContent'
import { StarsPuzzleTabs } from './StarsPuzzleTabs'
import { cn } from '@src/utils/cn'
import styles from './StarsSection.module.scss'

export function StarsSection() {
  const [activeLetterIndex, setActiveLetterIndex] = useState(0)
  const category = starsCategories[activeLetterIndex]
  const title = category.landingTitle ?? category.title
  const description = category.description ?? category.subtitle
  const areas = category.areas ?? category.leftCards.map((c) => c.title)
  const colorHex = category.colorHex ?? '#b45309'
  const isLetterA = activeLetterIndex === 2

  return (
    <section
      id="sobre"
      className={styles.section}
      style={{ backgroundImage: "url('/BackgroundSectionStars.png')" }}
      aria-labelledby="stars-heading"
    >
      <div className={styles.inner}>
        <div className={styles.tabsWrap}>
          <StarsPuzzleTabs
            id="stars-heading"
            activeIndex={activeLetterIndex}
            onSelectLetter={setActiveLetterIndex}
          />
        </div>

        <div className={styles.panelWrap} role="tabpanel" aria-labelledby="stars-heading">
          <div className={styles.card}>
            <div className={styles.cardInner}>
              <h2 className={styles.cardTitle} style={{ color: colorHex }}>
                {title}
              </h2>
              <p className={styles.desc}>{description}</p>
              <div>
                <h3 className={styles.areasTitle}>Áreas de Estudo:</h3>
                <div className={styles.tags}>
                  {areas.map((area) => (
                    <span key={area} className={styles.tag}>
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/register"
                className={styles.cta}
                style={{ backgroundColor: colorHex }}
              >
                Conhecer mais
              </Link>
            </div>
          </div>

          <div
            className={cn(styles.mascotWrap, isLetterA && styles.mascotWrapA)}
          >
            {category.image ? (
              <Image
                src={category.image}
                alt={`Mascote da área de ${title}`}
                width={454}
                height={567}
                className={cn(
                  styles.mascotImgBase,
                  isLetterA ? styles.mascotImgShort : styles.mascotImgTall
                )}
                sizes={isLetterA ? '(max-width: 768px) 40vw, 46vw' : '(max-width: 768px) 45vw, 52vw'}
              />
            ) : (
              <div className={styles.placeholder}>[Mascote]</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
