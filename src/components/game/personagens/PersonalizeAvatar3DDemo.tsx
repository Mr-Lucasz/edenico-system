'use client'

import dynamic from 'next/dynamic'
import type { AvatarPairFocus } from './r3f/AvatarPairScene'
import styles from './PersonalizePersonagemModal.module.scss'

const AvatarPairScene = dynamic(() => import('./r3f/AvatarPairScene').then((m) => m.AvatarPairScene), {
  ssr: false,
  loading: () => <div className={styles.preview3dLoading}>A carregar WebGL…</div>,
})

type PersonalizeAvatar3DDemoProps = {
  readonly focus: AvatarPairFocus
}

export function PersonalizeAvatar3DDemo({ focus }: PersonalizeAvatar3DDemoProps) {
  return (
    <div className={styles.preview3d} role="img" aria-label="Demonstração 3D: Adão e Eva (React Three Fiber)">
      <AvatarPairScene focus={focus} />
    </div>
  )
}
