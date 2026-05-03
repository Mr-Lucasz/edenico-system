'use client'

import { useState, type ReactNode } from 'react'
import { Navbar } from '@src/components/layout/Navbar'
import { GameChromeStrip } from '@src/components/game/GameChromeStrip'
import { ParentalCredentialsModal } from '@src/components/game/ParentalCredentialsModal'
import { ParentalSettingsModal } from '@src/components/game/ParentalSettingsModal'
import styles from './AcademyGameShell.module.scss'

interface AcademyGameShellProps {
  readonly children: ReactNode
}

export function AcademyGameShell({ children }: AcademyGameShellProps) {
  const [showCred, setShowCred] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const openParental = () => setShowCred(true)

  const credConfirm = () => {
    setShowCred(false)
    setShowSettings(true)
  }

  return (
    <div className={styles.shell}>
      <Navbar />
      <GameChromeStrip onParentalOpen={openParental} />
      <main className={styles.main}>{children}</main>

      <ParentalCredentialsModal
        open={showCred}
        onClose={() => setShowCred(false)}
        onConfirm={credConfirm}
      />
      <ParentalSettingsModal open={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  )
}
