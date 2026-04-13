import { institutionalCopy } from '@src/constants/institutionalCopy'
import { FiMonitor, FiPackage, FiTool } from 'react-icons/fi'
import { cn } from '@src/utils/cn'
import styles from './ServicesSection.module.scss'

const ICONS = [FiMonitor, FiPackage, FiTool]
const ICON_STYLES = [styles.iconBlue, styles.iconOrange, styles.iconPurple]

export function ServicesSection() {
  const { services } = institutionalCopy
  return (
    <section id="ecossistema" className={styles.section} aria-labelledby="services-heading">
      <div className={styles.container}>
        <h2 id="services-heading" className={styles.title}>
          {services.title}
        </h2>
        <div className={styles.grid}>
          {services.items.map((item, i) => {
            const Icon = ICONS[i]
            return (
              <article
                key={item.title}
                className={cn(styles.card, i === 0 && styles.cardFeatured)}
              >
                <div className={ICON_STYLES[i]}>
                  <Icon className={styles.icon} aria-hidden />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
