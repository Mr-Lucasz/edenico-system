'use client'

import { useState } from 'react'
import { cn } from '@src/utils/cn'
import styles from './StarsTitleSvg.module.scss'

const VIEWBOX = { width: 500, height: 150 }

/** Posições de cada hexágono/letra no viewBox (áreas de clique + clip para highlight) */
const LETTER_AREAS = [
  { id: 'S1', x: 18, y: 15, width: 112, height: 95 },
  { id: 'T', x: 117, y: 3, width: 92, height: 115 },
  { id: 'A', x: 192, y: 3, width: 118, height: 115 },
  { id: 'R', x: 292, y: 15, width: 92, height: 95 },
  { id: 'S2', x: 368, y: 15, width: 112, height: 95 },
] as const

export interface StarsTitleSvgProps {
  activeIndex: number
  onSelectLetter: (index: number) => void
  id?: string
  className?: string
}

export function StarsTitleSvg({ activeIndex, onSelectLetter, id = 'stars-heading', className = '' }: Readonly<StarsTitleSvgProps>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const highlightIndex = hoveredIndex ?? activeIndex

  return (
    <div className={cn(styles.wrap, className)} aria-labelledby={id}>
      <svg
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        className="h-auto w-full object-contain"
        aria-label="STARS"
      >
        <defs>
          {LETTER_AREAS.map((area) => (
            <clipPath key={area.id} id={`stars-clip-${area.id}`}>
              <rect x={area.x} y={area.y} width={area.width} height={area.height} />
            </clipPath>
          ))}
          {/* Filtro que tinge a peça em destaque no marrom do S (#C38C5C / #99522D) */}
          <filter id="brownTint" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="0.45 0.35 0.12 0 0
                      0.25 0.22 0.08 0 0
                      0.14 0.12 0.05 0 0
                      0    0    0    1 0"
            />
          </filter>
        </defs>
        {/* Camada base: SVG inteiro em opacidade reduzida (como as outras letras) */}
        <g style={{ opacity: 0.5 }}>
          <image href="/STARS.svg" x="0" y="0" width="500" height="150" preserveAspectRatio="xMidYMid meet" aria-hidden />
        </g>
        {/* Camada em destaque: mesma imagem com opacidade 1 só na letra hover/ativa (igual ao S), tingida de marrom */}
        {highlightIndex !== null && (
          <g clipPath={`url(#stars-clip-${LETTER_AREAS[highlightIndex].id})`} filter="url(#brownTint)">
            <image href="/STARS.svg" x="0" y="0" width="500" height="150" preserveAspectRatio="xMidYMid meet" style={{ opacity: 1 }} aria-hidden />
          </g>
        )}
        {/* Áreas clicáveis por cima */}
        {LETTER_AREAS.map((area, index) => (
          <rect
            key={area.id}
            x={area.x}
            y={area.y}
            width={area.width}
            height={area.height}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => onSelectLetter(index)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelectLetter(index)
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Pilar ${['Science', 'Technology', 'Arts', 'Relationship', 'Service'][index]}`}
          />
        ))}
      </svg>
    </div>
  )
}
