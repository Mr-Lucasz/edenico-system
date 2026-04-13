import styles from './EmptySelectionPanel.module.scss'

export function EmptySelectionPanel() {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>Selecione um conteúdo para começar</h2>
      <p className={styles.sub}>Use o painel lateral para navegar pelos capítulos e unidades do curso.</p>
    </div>
  )
}
