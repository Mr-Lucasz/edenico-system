import Image from 'next/image'

const PILLARS = [
  { id: 'fisico', svg: '/fisico-section-filosofia.svg' },
  { id: 'mental', svg: '/mental-section-filosofia.svg' },
  { id: 'espiritual', svg: '/espiritual-section-filosofia.svg' },
  { id: 'relacional', svg: '/relacional-section-filosofia.svg' },
  { id: 'profissional', svg: '/profissional-section-filosofia.svg' },
]

export function PhilosophyCards() {
  return (
    <div className="mx-auto w-full max-w-[642px]">
      <div className="grid grid-cols-1 grid-rows-[auto] gap-x-[18px] gap-y-[24px] sm:grid-cols-2">
        {PILLARS.map((pillar, index) => (
          <div
            key={pillar.id}
            className={index === 4 ? 'flex justify-center sm:col-span-2' : ''}
          >
            <div
              className="relative mx-auto h-[146px] w-full max-w-[309px] shrink-0 sm:w-[309px]"
              style={{ aspectRatio: '309/146' }}
            >
              <Image
                src={pillar.svg}
                alt=""
                fill
                className="object-contain object-left"
                sizes="(max-width: 640px) 100vw, 309px"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
