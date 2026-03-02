import Link from 'next/link'

export function PhilosophyCta() {
  return (
    <div className="flex flex-col items-center lg:items-end">
      <div
        className="flex h-52 w-52 shrink-0 flex-col items-center justify-end rounded-lg bg-edenicos-yellow p-6 shadow-2xl sm:h-56 sm:w-56"
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        <Link
          href="#cursos"
          className="rounded-xl bg-[#387ADF] px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-purple-900"
        >
          Conheça mais
        </Link>
      </div>
    </div>
  )
}
