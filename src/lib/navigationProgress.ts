/**
 * Permite disparar o indicador de navegação a partir de qualquer cliente
 * (ex.: antes de router.push), sem depender só de cliques em <Link>.
 */
type Setter = (pending: boolean) => void

let setter: Setter | null = null

export function registerNavigationProgressSetter(fn: Setter | null) {
  setter = fn
}

export function startNavigationProgress() {
  setter?.(true)
}
