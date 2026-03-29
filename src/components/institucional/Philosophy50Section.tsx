import { institutionalCopy } from '@src/constants/institutionalCopy'
import { philosophy50Dimensions } from '@src/data/philosophy50Content'
import { FiActivity, FiZap, FiBook, FiHeart, FiAward } from 'react-icons/fi'
import styles from './Philosophy50Section.module.scss'

const DIMENSION_ICONS = [FiActivity, FiZap, FiBook, FiHeart, FiAward]

export function Philosophy50Section() {
  const { philosophy50: copy } = institutionalCopy
  return (
    <section id="filosofia-5" className={styles.section} aria-labelledby="philosophy50-heading">
      <div className={styles.container}>
        <span className={styles.tag}>{copy.tag}</span>
        <h2 id="philosophy50-heading" className={styles.title}>
          {copy.title}
        </h2>
        <p className={styles.intro}>{copy.intro}</p>

        <div className={styles.list}>
          {philosophy50Dimensions.map((dim, i) => {
            const Icon = DIMENSION_ICONS[i]
            return (
              <article
                key={dim.id}
                className={styles.article}
                style={{ backgroundColor: dim.cardSurface }}
              >
                <div className={styles.headRow}>
                  <div className={styles.iconBox}>
                    <Icon style={{ width: '2rem', height: '2rem', color: dim.iconColor }} aria-hidden />
                  </div>
                  <div>
                    <h3 className={styles.dimTitle}>{dim.title}</h3>
                    <p className={styles.dimSub}>{dim.subtitle}</p>
                  </div>
                </div>
                <div className={styles.grid2}>
                  <div>
                    <h4 className={styles.colHead}>Como Cuidamos</h4>
                    <ul className={styles.ul}>
                      {dim.howWeCare.map((item) => (
                        <li key={item.title} className={styles.li}>
                          <h5 className={styles.liTitle}>{item.title}</h5>
                          <p className={styles.liDesc}>{item.description}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className={styles.colHead}>Atividades e Práticas</h4>
                    <ul className={styles.ul}>
                      {dim.activities.map((item) => (
                        <li key={item.title} className={styles.li}>
                          <h5 className={styles.liTitle}>{item.title}</h5>
                          <p className={styles.liDesc}>{item.description}</p>
                        </li>
                      ))}
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
