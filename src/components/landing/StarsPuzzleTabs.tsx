'use client'

import { starsCategories } from '@src/data/starsContent'

/** Peça horizontal: usada em S, A, S (peca-de-quebra-cabeca.svg) */
const PUZZLE_PATH_SAS =
  'M113.545 47.3885C113.545 53.8944 108.415 59.2119 101.969 59.5001C101.665 59.5137 101.418 59.7591 101.418 60.0635V88.7159C101.418 89.0202 101.171 89.2669 100.867 89.2669H75.3258C75.0707 89.2669 74.8498 89.0912 74.7838 88.8448C73.0383 82.334 67.2106 77.461 60.2187 77.1537C59.9885 77.1432 59.7579 77.1432 59.5274 77.1432C59.2972 77.1432 59.0667 77.1432 58.8361 77.1537C51.8442 77.461 46.0165 82.3337 44.2711 88.8447C44.205 89.0912 43.9842 89.2669 43.7291 89.2669H18.1884C17.8841 89.2669 17.6374 89.0202 17.6374 88.7159V60.0635C17.6374 59.7591 17.3901 59.5137 17.0861 59.5001C10.64 59.2119 5.51025 53.8944 5.51025 47.3885C5.51025 40.8729 10.64 35.5647 17.0861 35.277C17.3901 35.2635 17.6374 35.0181 17.6374 34.7137V6.06128C17.6374 5.75696 17.8841 5.51025 18.1884 5.51025H43.7291C43.9842 5.51025 44.205 5.68602 44.2711 5.93242C46.0165 12.4434 51.8442 17.3161 58.8361 17.6237C59.0664 17.6237 59.2969 17.6342 59.5274 17.6342C59.7577 17.6342 59.9882 17.6237 60.2187 17.6237C67.2106 17.3161 73.0383 12.4437 74.7838 5.93243C74.8498 5.68602 75.0707 5.51025 75.3258 5.51025H100.867C101.171 5.51025 101.418 5.75696 101.418 6.06128V34.714C101.418 35.0183 101.665 35.2637 101.969 35.2773C108.415 35.565 113.545 40.8729 113.545 47.3885Z'

/** Peça de encaixe vertical: usada em T e R (encaixe-t-r-peca-quebra-cabeca.svg) */
const PUZZLE_PATH_TR =
  'M77.164 59.5125C77.164 66.8049 82.1388 72.9616 88.8688 74.7648C89.1153 74.8308 89.2911 75.0517 89.2911 75.3068V100.84C89.2911 101.144 89.0444 101.391 88.7401 101.391H60.0792C59.7749 101.391 59.5295 101.638 59.5159 101.942C59.2275 108.386 53.9085 113.515 47.4011 113.515C40.8834 113.515 35.574 108.387 35.2862 101.942C35.2726 101.638 35.0272 101.391 34.7229 101.391H6.06177C5.75745 101.391 5.51074 101.144 5.51074 100.84V75.3068C5.51074 75.0517 5.68658 74.8308 5.93301 74.7648C12.6631 72.9616 17.6379 66.8049 17.6379 59.5125C17.6379 52.2206 12.6631 46.0636 5.93301 44.2604C5.68658 44.1944 5.51074 43.9736 5.51074 43.7184V18.185C5.51074 17.8807 5.75745 17.634 6.06177 17.634H34.7226C35.027 17.634 35.2724 17.3868 35.286 17.0827C35.5738 10.6385 40.8831 5.51031 47.4008 5.51031C53.9082 5.51031 59.2272 10.6385 59.5156 17.0827C59.5292 17.3868 59.7746 17.634 60.0789 17.634H88.7398C89.0441 17.634 89.2908 17.8807 89.2908 18.185V43.7184C89.2908 43.9736 89.115 44.1944 88.8686 44.2604C82.1388 46.0636 77.164 52.2206 77.164 59.5125Z'

const TAB_LABELS = ['Science', 'Technology', 'Arts', 'Relations', 'Service']

/** Índices S, A, S usam peça horizontal; T e R usam peça de encaixe vertical */
function getPecaEncaixe(index: number): { path: string; viewBox: string } {
  const isTR = index === 1 || index === 3 // T, R
  return isTR
    ? { path: PUZZLE_PATH_TR, viewBox: '0 0 95 120' }
    : { path: PUZZLE_PATH_SAS, viewBox: '0 0 120 95' }
}

export interface StarsPuzzleTabsProps {
  activeIndex: number
  onSelectLetter: (index: number) => void
  id?: string
  className?: string
}

export function StarsPuzzleTabs({
  activeIndex,
  onSelectLetter,
  id = 'stars-heading',
  className = '',
}: Readonly<StarsPuzzleTabsProps>) {
  return (
    <div
      role="tablist"
      aria-label="STARS"
      id={id}
      className={`flex flex-nowrap justify-center overflow-visible ${className}`}
    >
      {starsCategories.map((tab, index) => {
        const isActive = index === activeIndex
        const colorHex = tab.colorHex ?? '#A66B46'
        const fillColor = isActive ? colorHex : '#f9fafb'
        const { path, viewBox } = getPecaEncaixe(index)
        /** Margem negativa para as peças se encaixarem (tab/slot); a partir da 2ª peça */
        const overlapClass = index === 0 ? '' : '-ml-6 sm:-ml-10'

        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Pilar ${TAB_LABELS[index]}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectLetter(index)}
            onKeyDown={(e) => {
              const prev = e.key === 'ArrowLeft' || e.key === 'Home'
              const next = e.key === 'ArrowRight' || e.key === 'End'
              if (prev) {
                e.preventDefault()
                onSelectLetter(next ? starsCategories.length - 1 : Math.max(0, activeIndex - 1))
              } else if (next) {
                e.preventDefault()
                onSelectLetter(e.key === 'End' ? starsCategories.length - 1 : Math.min(starsCategories.length - 1, activeIndex + 1))
              }
            }}
            className={`relative z-10 flex-shrink-0 cursor-pointer transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 h-20 w-20 sm:h-28 sm:w-28 ${overlapClass}`}
            style={{
              transform: isActive ? 'scale(1.05)' : undefined,
              zIndex: isActive ? 50 + index : 10 + index,
              filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))',
            }}
          >
            <svg
              viewBox={viewBox}
              className="h-full w-full"
              aria-hidden
            >
              <path d={path} fill={fillColor} stroke={isActive ? colorHex : '#e5e7eb'} strokeWidth="1.5" />
            </svg>
            <span
              className={`absolute inset-0 flex items-center justify-center text-3xl font-bold sm:text-4xl ${isActive ? 'text-white' : 'text-gray-400'}`}
            >
              {tab.letter}
            </span>
          </button>
        )
      })}
    </div>
  )
}
