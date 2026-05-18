'use client'

import { createContext, useContext } from 'react'

export type MetodologiaChapter = 'stars' | 'philosophy' | 'identity'

export type MetodologiaHubContextValue = {
  readonly inHub: true
  readonly active: MetodologiaChapter
  readonly setActive: (chapter: MetodologiaChapter, opts?: { philosophyDim?: string }) => void
  readonly peekPendingPhilosophyDim: () => string | undefined
}

export const MetodologiaHubContext = createContext<MetodologiaHubContextValue | null>(null)

export function useMetodologiaHub(): MetodologiaHubContextValue | null {
  return useContext(MetodologiaHubContext)
}
