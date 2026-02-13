import Link from 'next/link'

export function TestimonialsSection() {
  return (
    <section className="relative bg-white py-16 sm:py-20" aria-labelledby="testimonials-heading">
      {/* Borda superior irregular (rasgo) */}
      <div
        className="absolute left-0 right-0 top-0 h-10 bg-white"
        style={{
          clipPath: 'polygon(0 100%, 5% 0, 12% 100%, 18% 0, 25% 100%, 32% 0, 40% 100%, 50% 0, 60% 100%, 68% 0, 75% 100%, 82% 0, 88% 100%, 95% 0, 100% 100%)',
        }}
        aria-hidden
      />

      <div className="mx-auto max-w-3xl px-4 pt-8 text-center sm:px-6 lg:px-8">
        <h2 id="testimonials-heading" className="sr-only">
          Depoimentos
        </h2>

        {/* 5 estrelas */}
        <div className="flex justify-center gap-1 text-edenicos-yellow" aria-hidden>
          {[1, 2, 3, 4, 5].map((i) => (
            <span key={i} className="text-3xl">
              ★
            </span>
          ))}
        </div>

        <blockquote className="mt-6 text-lg font-medium text-gray-700 sm:text-xl">
          &ldquo;A metodologia dos 5 pilares mudou minha forma de estudar e me desenvolver. Recomendo muito a Edênicos Academy.&rdquo;
        </blockquote>
        <footer className="mt-4 text-sm text-gray-500">
          — Aluno(a), <cite className="not-italic">Instituição parceira</cite>
        </footer>

        <Link
          href="#depoimentos"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
          Ler mais
        </Link>
      </div>
    </section>
  )
}
