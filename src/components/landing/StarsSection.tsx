'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { starsCategories } from '@src/data/starsContent'
import { StarsPuzzleTabs } from './StarsPuzzleTabs'

export function StarsSection() {
  const [activeLetterIndex, setActiveLetterIndex] = useState(0)
  const category = starsCategories[activeLetterIndex]
  const title = category.landingTitle ?? category.title
  const description = category.description ?? category.subtitle
  const areas = category.areas ?? category.leftCards.map((c) => c.title)
  const colorHex = category.colorHex
  const isLetterA = activeLetterIndex === 2 // Arts

  return (
    <section
      id="sobre"
      className="relative min-h-screen overflow-hidden bg-[#FFFDF9] bg-cover bg-center bg-no-repeat py-16 px-4 sm:py-20 sm:px-6 lg:px-8"
      style={{ backgroundImage: "url('/BackgroundSectionStars.png')" }}
      aria-labelledby="stars-heading"
    >
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
        {/* Abas STARS em formato de peça de quebra-cabeça — sem div em volta, direto no fundo */}
        <div className="mb-12 flex justify-center sm:mb-16">
          <StarsPuzzleTabs
            id="stars-heading"
            activeIndex={activeLetterIndex}
            onSelectLetter={setActiveLetterIndex}
          />
        </div>

        {/* Wrapper: card e mascote centralizados na vertical; altura mínima evita quebra */}
        <div
          className="relative flex w-full min-h-[420px] md:min-h-[520px] items-center"
          role="tabpanel"
          aria-labelledby="stars-heading"
        >
          {/* Card: centralizado verticalmente pelo flex items-center do wrapper */}
          <div className="overflow-visible rounded-3xl bg-white shadow-xl transition-all duration-500 ease-in-out w-full max-w-3xl md:mr-24">
            <div className="flex flex-col justify-center p-6 md:p-8 py-5 md:py-6">
              <h2
                className={`mb-3 text-3xl font-bold sm:text-4xl ${colorHex ? '' : category.color}`}
                style={colorHex ? { color: colorHex } : undefined}
              >
                {title}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-gray-600 sm:text-base">
                {description}
              </p>
              <div className="mb-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-800">Áreas de Estudo:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {areas.map((area) => (
                    <span
                      key={area}
                      className="rounded-md bg-gray-100 px-3 py-1.5 text-xs text-gray-600 sm:text-sm"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href="/register"
                className={`w-full rounded-xl py-3 text-center font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400 ${colorHex ? '' : 'bg-amber-700'}`}
                style={colorHex ? { backgroundColor: colorHex } : undefined}
              >
                Conhecer mais
              </Link>
            </div>
          </div>

          {/* Mascote: centralizado na vertical, afastado do card; Letra A (Arts) um pouco menor */}
          <div
            className={`absolute -right-2 top-1/2 z-20 flex -translate-y-1/2 translate-x-3 items-center justify-end pointer-events-none md:right-0 md:translate-x-16 ${
              isLetterA ? 'w-[40%] min-w-[185px] md:w-[46%]' : 'w-[45%] min-w-[210px] md:w-[52%]'
            } md:min-w-0`}
          >
            {category.image ? (
              <Image
                src={category.image}
                alt={`Mascote da área de ${title}`}
                width={454}
                height={567}
                className={`object-contain object-bottom w-full ${
                  isLetterA
                    ? 'h-[270px] min-h-[230px] md:h-[370px] md:min-h-[320px] lg:h-[410px]'
                    : 'h-[305px] min-h-[260px] md:h-[420px] md:min-h-[360px] lg:h-[470px]'
                }`}
                sizes={isLetterA ? '(max-width: 768px) 40vw, 46vw' : '(max-width: 768px) 45vw, 52vw'}
              />
            ) : (
              <div className="h-64 w-40 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">[Mascote]</div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
