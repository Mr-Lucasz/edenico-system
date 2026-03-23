import Image from 'next/image'
import Link from 'next/link'

const OCTO_SRC = '/octogono-irregular-section-filosofia.svg'

export function PhilosophyCta() {
  return (
    <div
      className={[
        'filosofia-octogono',
        'z-[3]',
        'relative mx-auto mt-10 w-[260px] shrink-0',
        'md:absolute md:right-[-80px] md:top-[55%] md:mx-0 md:mt-0 md:w-[480px] md:min-w-[420px] md:max-w-[520px] md:-translate-y-1/2',
      ].join(' ')}
    >
      <div
        className={[
          'filosofia-octogono__figure',
          'filosofia-octogono--float',
          'relative aspect-[653/637] w-full',
          'drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]',
        ].join(' ')}
      >
        <Image
          src={OCTO_SRC}
          alt=""
          fill
          role="presentation"
          className="border-0 object-contain object-center outline-none"
          sizes="(max-width: 767px) 260px, 480px"
          unoptimized
        />
        <Link
          href="#cursos"
          className="filosofia-octogono__link absolute bottom-[25%] left-1/2 z-10 -translate-x-1/2 rounded-[14px] bg-gradient-to-b from-[#3B82F6] to-[#2563EB] px-8 py-3 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          Conheça mais
        </Link>
      </div>
    </div>
  )
}
