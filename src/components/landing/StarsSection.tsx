'use client'

import Link from 'next/link'
import { useState } from 'react'
import { starsCategories } from '../../data/starsContent'
import { StarsTitleSvg } from './StarsTitleSvg'

const SCIENCE_PARAGRAPH = 'Na Edênicos Academy, a ciência é o caminho para despertar a curiosidade e compreender o funcionamento da vida e do universo. Por meio da observação, da investigação e da experimentação, os alunos desenvolvem uma mente analítica e crítica, aprendendo a valorizar a verdade e a buscar respostas fundamentadas. Acreditamos que a ciência abre portas para o conhecimento e inspira o desejo de explorar e transformar o mundo em um lugar melhor.'

export function StarsSection() {
  const [activeLetterIndex, setActiveLetterIndex] = useState(0)
  const category = starsCategories[activeLetterIndex]
  const isScience = category.id === 'science'

  return (
    <section
      id="sobre"
      className="relative bg-edenicos-cream bg-cover bg-center bg-no-repeat py-16 sm:py-20"
      style={{ backgroundImage: "url('/BackgroundSectionStars.png')" }}
      aria-labelledby="stars-heading"
    >
      {/* Borda ondulada na base */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: 'ellipse(75% 100% at 50% 0%)' }} />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título STARS: SVG com peças clicáveis, hover = opacidade 1 como o S */}
        <div className="mb-12 flex justify-center sm:mb-16">
          <StarsTitleSvg
            id="stars-heading"
            activeIndex={activeLetterIndex}
            onSelectLetter={setActiveLetterIndex}
          />
        </div>

        {/* Card centralizado: conteúdo do pilar selecionado + mascote */}
        <div className="mx-auto flex max-w-4xl flex-col items-center lg:flex-row lg:items-stretch">
          <div className="relative z-10 w-full rounded-2xl bg-white/95 px-6 py-8 shadow-lg backdrop-blur-sm sm:px-8 sm:py-10 lg:max-w-[52%]">
            <div className="space-y-5 text-gray-800">
              <h3 className={`text-xl font-bold sm:text-2xl ${category.color}`}>{category.title}</h3>
              <p className="text-justify text-sm leading-relaxed sm:text-base">
                {isScience ? SCIENCE_PARAGRAPH : category.subtitle}
              </p>
              <p className="font-semibold text-gray-800">{category.leftColumnTitle}:</p>
              <div className="flex flex-wrap gap-2">
                {category.leftCards.map((card) => (
                  <span
                    key={card.title}
                    className="rounded-lg bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-800"
                  >
                    {card.title}
                  </span>
                ))}
              </div>
              <Link
                href="/register"
                className="inline-block rounded-lg bg-amber-700 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-amber-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-edenicos-yellow focus-visible:ring-offset-2"
              >
                Conhecer mais
              </Link>
            </div>
          </div>

          <div className="relative z-20 flex flex-shrink-0 items-center justify-center lg:-ml-6 lg:max-w-[48%]">
            <img
              src="/Science%20(Cat).png"
              alt="Mascote Edênicos - gato cientista com lupa"
              className="h-auto w-full max-w-[280px] object-contain sm:max-w-[320px] lg:max-w-[340px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
