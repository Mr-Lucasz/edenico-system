import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiHome, FiUsers, FiGitBranch, FiZap } from 'react-icons/fi'
import styles from './AboutSection.module.scss'

export function AboutSection() {
  const { about } = institutionalCopy

  return (
    <section id="quem-somos" className={styles.section} aria-labelledby="about-heading">
      <span id="sobre" className={styles.anchor} aria-hidden />
      <div className={styles.container}>
        <header className={styles.head}>
          <span className={styles.tag}>{about.tag}</span>
          <h2 id="about-heading" className={styles.title}>
            {about.title}
          </h2>
          <span className={styles.titleRule} aria-hidden />
        </header>

        <div className={styles.layout}>
          <div className={styles.colLeft}>
            <article className={styles.storyCard}>
              <div className={styles.cardRow}>
                <div className={styles.iconBoxBlue}>
                  <FiHome className={styles.icon} aria-hidden />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.artTitle}>{about.history.title}</h3>
                  <p className={styles.artText}>{about.history.description}</p>
                </div>
              </div>
            </article>
            <article className={styles.storyCard}>
              <div className={styles.cardRow}>
                <div className={styles.iconBoxPurple}>
                  <FiUsers className={styles.icon} aria-hidden />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.artTitle}>{about.team.title}</h3>
                  <p className={styles.artText}>{about.team.description}</p>
                </div>
              </div>
            </article>
            <article className={styles.storyCard}>
              <div className={styles.cardRow}>
                <div className={styles.iconBoxOrange}>
                  <FiGitBranch className={styles.icon} aria-hidden />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.artTitle}>{about.path.title}</h3>
                  <p className={styles.artText}>{about.path.description}</p>
                </div>
              </div>
            </article>
          </div>

          <aside className={styles.colRight} aria-label="Destaques e números">
            <div className={styles.mediaPlaceholder} aria-label={about.mediaPlaceholderLabel} />
            <div className={styles.statsRow}>
              <div className={styles.statCardBlue}>
                <p className={styles.statValue}>{about.stats.year}</p>
                <p className={styles.statLabel}>{about.stats.yearLabel}</p>
                <span className={styles.statRule} aria-hidden />
              </div>
              <div className={styles.statCardPurple}>
                <p className={styles.statValue}>{about.stats.professionals}</p>
                <p className={styles.statLabel}>{about.stats.professionalsLabel}</p>
                <span className={styles.statRule} aria-hidden />
              </div>
            </div>
            <article className={styles.innovationCard}>
              <div className={styles.innovationRow}>
                <div className={styles.iconBoxInnovation}>
                  <FiZap className={styles.icon} aria-hidden />
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.artTitle}>{about.innovation.title}</h3>
                  <p className={styles.artTextMuted}>{about.innovation.subtitle}</p>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  )
}
