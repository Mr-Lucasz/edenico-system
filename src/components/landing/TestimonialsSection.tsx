import Link from 'next/link'
import styles from './TestimonialsSection.module.scss'

export function TestimonialsSection() {
  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.fadeTop} aria-hidden />
      <div className={styles.inner}>
        <h2 id="testimonials-heading" className={styles.srOnly}>
          Depoimentos
        </h2>
        <div className={styles.stars} aria-hidden>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className={styles.star}>
              ★
            </span>
          ))}
        </div>
        <blockquote className={styles.quote}>
          &ldquo;A plataforma transformou a forma como meus filhos veem o estudo. Eles se envolvem de verdade!&rdquo;
        </blockquote>
        <footer className={styles.footer}>
          — Aluno(a), <cite className={styles.cite}>Instituição parceira</cite>
        </footer>
        <Link href="/register" className={styles.cta}>
          Quero fazer parte
        </Link>
      </div>
    </section>
  )
}
