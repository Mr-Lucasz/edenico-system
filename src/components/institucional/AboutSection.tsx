import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiClock, FiUsers } from 'react-icons/fi'
import styles from './AboutSection.module.scss'

export function AboutSection() {
  const { about } = institutionalCopy
  return (
    <section id="quem-somos" className={styles.section} aria-labelledby="about-heading">
      <span id="sobre" className={styles.anchor} aria-hidden />
      <div className={styles.container}>
        <span className={styles.tag}>{about.tag}</span>
        <h2 id="about-heading" className={styles.title}>
          {about.title}
        </h2>
        <div className={styles.grid}>
          <article className={styles.article}>
            <div className={styles.iconBoxBlue}>
              <FiClock className={styles.icon} aria-hidden />
            </div>
            <h3 className={styles.artTitle}>{about.history.title}</h3>
            <p className={styles.artText}>{about.history.description}</p>
          </article>
          <article className={styles.article}>
            <div className={styles.iconBoxPurple}>
              <FiUsers className={styles.icon} aria-hidden />
            </div>
            <h3 className={styles.artTitle}>{about.team.title}</h3>
            <p className={styles.artText}>{about.team.description}</p>
          </article>
        </div>
      </div>
    </section>
  )
}
