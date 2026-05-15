'use client'

import styles from './AdminConfiguracoesView.module.scss'

type Props = {
  on: boolean
  onToggle: () => void
  labelledBy: string
}

export function ConfigToggle({ on, onToggle, labelledBy }: Props) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-labelledby={labelledBy}
      className={styles.switch}
      data-on={on ? 'true' : 'false'}
      onClick={onToggle}
    >
      <span className={styles.switchKnob} />
    </button>
  )
}
