import { gradients } from '@src/constants/gradients'

export function Banner() {
  return (
    <div
      className={`relative h-64 w-full overflow-hidden rounded-2xl bg-gradient-to-r ${gradients.banner} p-8 shadow-lg md:h-80`}
    >
      <div className="relative z-10 flex h-full flex-col justify-center text-white">
        <h1 className="mb-3 text-4xl font-bold drop-shadow-lg md:text-5xl">Super Amigos</h1>
        <p className="text-lg leading-relaxed drop-shadow md:text-xl">
          Faça novos amigos e aprenda a ser gentil, carinhoso e um bom colega!
        </p>
      </div>
      {/* Placeholder para imagem de crianças - pode ser substituído por uma imagem real */}
      <div className="absolute bottom-0 right-0 hidden h-full w-1/3 md:block">
        <div className="flex h-full items-end justify-center">
          <div className="mb-4 flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-16 w-16 rounded-full bg-white/30 backdrop-blur-sm shadow-lg"
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
