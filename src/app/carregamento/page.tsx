'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { startNavigationProgress } from '@src/lib/navigationProgress'
import { AcademyLoadingFull } from '@src/components/loading/AcademyLoadingFull'

export default function CarregamentoPage() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const id = globalThis.setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + 1.5)))
    }, 48)
    return () => globalThis.clearInterval(id)
  }, [])

  useEffect(() => {
    if (progress < 100) return
    const t = globalThis.setTimeout(() => {
      startNavigationProgress()
      router.push('/')
    }, 450)
    return () => globalThis.clearTimeout(t)
  }, [progress, router])

  return <AcademyLoadingFull progress={progress} />
}
