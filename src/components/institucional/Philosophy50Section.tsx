import type { CSSProperties } from 'react'
import { cn } from '@src/utils/cn'
import { institutionalCopy } from '@src/constants/institutionalCopy'
import { philosophy50Dimensions } from '@src/data/philosophy50Content'
import {
  getPhilosophyActivityIcon,
  getPhilosophyHowCareIcon,
  philosophy50HeaderIcons,
} from '@src/data/philosophy50Icons'
import styles from './Philosophy50Section.module.scss'

const DEFAULT_HOW = 'Como Cuidamos'
const DEFAULT_ACTIVITIES = 'Atividades e Práticas'

export function Philosophy50Section() {
  const { philosophy50: copy } = institutionalCopy
  return (
    <section id="filosofia-5" className={styles.section} aria-labelledby="philosophy50-heading">
      <div className={styles.container}>
        <h2 id="philosophy50-heading" className={styles.title}>
          {copy.title}
        </h2>
        <span className={styles.titleRulePurple} aria-hidden />
        <p className={styles.intro}>{copy.intro}</p>

        <div className={styles.list}>
          {philosophy50Dimensions.map((dim) => {
            const HeaderIcon = philosophy50HeaderIcons[dim.id] ?? philosophy50HeaderIcons.fisica
            const howTitle = dim.howWeCareColumnTitle ?? DEFAULT_HOW
            const actTitle = dim.activitiesColumnTitle ?? DEFAULT_ACTIVITIES
            return (
              <article
                key={dim.id}
                id={`filosofia-dim-${dim.id}`}
                className={styles.article}
                style={
                  {
                    backgroundColor: dim.cardSurface,
                    '--phil-card-border': dim.cardBorderColor,
                    '--phil-item-border': dim.itemBorderColor,
                  } as CSSProperties
                }
              >
                <div className={styles.headRow}>
                  <div
                    className={styles.iconBox}
                    style={
                      dim.headerIconGradient
                        ? {
                            background: dim.headerIconGradient,
                            borderColor: 'rgb(255 255 255 / 0.35)',
                          }
                        : { backgroundColor: dim.iconColor }
                    }
                  >
                    <HeaderIcon className={styles.headerIcon} aria-hidden />
                  </div>
                  <div>
                    <h3 className={styles.dimTitle}>{dim.title}</h3>
                    <p className={styles.dimSub}>{dim.subtitle}</p>
                  </div>
                </div>
                <div className={styles.grid2}>
                  <div>
                    <h4 className={styles.colHead}>{howTitle}</h4>
                    <ul className={styles.ul}>
                      {dim.howWeCare.map((item, i) => {
                        const ItemIcon = getPhilosophyHowCareIcon(dim.id, i)
                        return (
                          <li key={item.title} className={styles.li}>
                            <div className={styles.itemIconWrap}>
                              <ItemIcon className={styles.itemIcon} aria-hidden />
                            </div>
                            <div className={styles.itemText}>
                              <h5 className={styles.liTitle}>{item.title}</h5>
                              <p className={styles.liDesc}>{item.description}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                  <div>
                    <h4 className={styles.colHead}>{actTitle}</h4>
                    <ul className={styles.ul}>
                      {dim.activities.map((item, i) => {
                        const ItemIcon = getPhilosophyActivityIcon(dim.id, i)
                        return (
                          <li key={item.title} className={styles.li}>
                            {item.hideIcon ? (
                              <div className={styles.itemIconSpacer} aria-hidden />
                            ) : item.emoji ? (
                              <div
                                className={cn(
                                  styles.itemEmojiWrap,
                                  dim.id === 'espiritual' && styles.itemEmojiDimEspiritual,
                                  dim.id === 'relacional' && styles.itemEmojiDimRelacional,
                                  dim.id === 'profissional' && styles.itemEmojiDimProfissional
                                )}
                              >
                                <span className={styles.itemEmoji} aria-hidden>
                                  {item.emoji}
                                </span>
                              </div>
                            ) : (
                              <div className={styles.itemIconWrap}>
                                <ItemIcon className={styles.itemIcon} aria-hidden />
                              </div>
                            )}
                            <div className={styles.itemText}>
                              <h5 className={styles.liTitle}>{item.title}</h5>
                              <p className={styles.liDesc}>{item.description}</p>
                            </div>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
