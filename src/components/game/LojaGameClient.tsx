'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { FiChevronDown, FiFilter, FiHeart, FiZap } from 'react-icons/fi'
import { GiTwoCoins } from 'react-icons/gi'
import { LojaCheckoutModal } from '@src/components/game/LojaCheckoutModal'
import { ParentalCredentialsModal } from '@src/components/game/ParentalCredentialsModal'
import styles from './LojaGameClient.module.scss'

const LOJA_PARENTAL_DESC =
  'Para acessar as configurações de controle parental, um responsável deve confirmar sua identidade.'

type PayType = 'coin' | 'energy' | 'real'

type ItemCategory = 'roupa' | 'consumivel' | 'pacote'

interface LojaItem {
  id: string
  title: string
  description: string
  tag: string
  payType: PayType
  price: string
  imageUrl: string
  category: ItemCategory
  /** Maior = mais recente (filtro “Mais recentes”) */
  releasedAt: number
  onSale: boolean
}

const nf = new Intl.NumberFormat('pt-BR')

function formatWalletAmount(n: number): string {
  return nf.format(Math.max(0, Math.floor(n)))
}

/** Preços em moedas usam milhar com ponto (ex.: 1.200) */
function parseCoinPrice(price: string): number {
  const digits = price.replace(/\D/g, '')
  return digits ? parseInt(digits, 10) : 0
}

function parseEnergyPrice(price: string): number {
  const n = parseInt(price.replace(/\D/g, ''), 10)
  return Number.isFinite(n) ? n : 0
}

const ALL_ITEMS: LojaItem[] = [
  {
    id: '1',
    title: 'Túnica Dourada Premium',
    description: 'Aumenta XP de Ciências em 15%',
    tag: 'Para Adão',
    payType: 'coin',
    price: '850',
    category: 'roupa',
    releasedAt: 1,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '2',
    title: 'Coroa de Sabedoria',
    description: 'Bónus de reputação em missões',
    tag: 'Para Eva',
    payType: 'energy',
    price: '12',
    category: 'roupa',
    releasedAt: 2,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1606166325699-ceadc6272834?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '3',
    title: 'Pacote Iniciante',
    description: 'Moedas e energia para começar',
    tag: 'Quantidade: 1000',
    payType: 'real',
    price: 'R$ 4,99',
    category: 'pacote',
    releasedAt: 3,
    onSale: true,
    imageUrl:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '4',
    title: 'Elmo Explorador',
    description: 'Proteção visual em desafios',
    tag: 'Para Adão',
    payType: 'coin',
    price: '1.200',
    category: 'roupa',
    releasedAt: 4,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1593508512259-f021cd98cb09?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '5',
    title: 'Botas Velozes',
    description: 'Reduz tempo de cooldown',
    tag: 'Para Eva',
    payType: 'energy',
    price: '18',
    category: 'roupa',
    releasedAt: 5,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '6',
    title: 'Mapa Secreto',
    description: 'Revela pistas em continentes',
    tag: 'Quantidade: 1',
    payType: 'coin',
    price: '2.400',
    category: 'consumivel',
    releasedAt: 6,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1528819622765-40e311520fa8?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '7',
    title: 'Cristal de Foco',
    description: '+10% XP em Tecnologia',
    tag: 'Para Adão',
    payType: 'energy',
    price: '25',
    category: 'consumivel',
    releasedAt: 7,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '8',
    title: 'Kit Social',
    description: 'Emotes e reações exclusivas',
    tag: 'Para Eva',
    payType: 'real',
    price: 'R$ 9,90',
    category: 'pacote',
    releasedAt: 8,
    onSale: true,
    imageUrl:
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '9',
    title: 'Relíquia Antiga',
    description: 'Troca por itens raros',
    tag: 'Quantidade: 3',
    payType: 'coin',
    price: '5.000',
    category: 'consumivel',
    releasedAt: 9,
    onSale: false,
    imageUrl:
      'https://images.unsplash.com/photo-1493711668172-93f64759cc48?auto=format&fit=crop&w=640&q=75',
  },
  {
    id: '10',
    title: 'Passe Semanal',
    description: 'Recompensas diárias extra',
    tag: 'Quantidade: 7',
    payType: 'real',
    price: 'R$ 12,90',
    category: 'pacote',
    releasedAt: 10,
    onSale: true,
    imageUrl:
      'https://images.unsplash.com/photo-1593305841691-19750529fcab?auto=format&fit=crop&w=640&q=75',
  },
]

const PAGE_SIZE = 5

type ToastTone = 'success' | 'error'

export function LojaGameClient() {
  const [page, setPage] = useState(1)
  const [checkoutItem, setCheckoutItem] = useState<LojaItem | null>(null)
  const [showParental, setShowParental] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const [walletCoins, setWalletCoins] = useState(12450)
  const [walletEnergy, setWalletEnergy] = useState(89)
  const WALLET_LIVES = '87'

  const [ownedIds, setOwnedIds] = useState<Set<string>>(() => new Set())

  const [filterTipo, setFilterTipo] = useState('')
  const [filterMoeda, setFilterMoeda] = useState('')
  const [filterData, setFilterData] = useState('')

  const [toast, setToast] = useState<{ message: string; tone: ToastTone } | null>(null)

  const pushToast = useCallback((message: string, tone: ToastTone) => {
    setToast({ message, tone })
  }, [])

  useEffect(() => {
    if (!toast) return
    const t = window.setTimeout(() => setToast(null), 4200)
    return () => window.clearTimeout(t)
  }, [toast])

  const filteredItems = useMemo(() => {
    let list = [...ALL_ITEMS]

    if (filterTipo) {
      list = list.filter((i) => i.category === filterTipo)
    }
    if (filterMoeda === 'moedas') {
      list = list.filter((i) => i.payType === 'coin')
    } else if (filterMoeda === 'raios') {
      list = list.filter((i) => i.payType === 'energy')
    } else if (filterMoeda === 'real') {
      list = list.filter((i) => i.payType === 'real')
    }
    if (filterData === 'promo') {
      list = list.filter((i) => i.onSale)
    }
    if (filterData === 'recente') {
      list.sort((a, b) => b.releasedAt - a.releasedAt)
    }

    return list
  }, [filterTipo, filterMoeda, filterData])

  const totalPages =
    filteredItems.length === 0 ? 0 : Math.ceil(filteredItems.length / PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [filterTipo, filterMoeda, filterData])

  useEffect(() => {
    if (totalPages === 0) return
    setPage((p) => Math.min(p, totalPages))
  }, [totalPages])

  const visible = useMemo(() => {
    if (filteredItems.length === 0) return []
    const start = (page - 1) * PAGE_SIZE
    return filteredItems.slice(start, start + PAGE_SIZE)
  }, [filteredItems, page])

  const startRealPurchase = (item: LojaItem) => {
    setCheckoutItem(item)
    setShowParental(true)
  }

  const closeParentalOnly = () => {
    setShowParental(false)
    setCheckoutItem(null)
  }

  const afterParentalConfirm = () => {
    setShowParental(false)
    setShowCheckout(true)
  }

  const closeCheckout = () => {
    setShowCheckout(false)
    setCheckoutItem(null)
  }

  const onCheckoutSuccess = () => {
    if (checkoutItem) {
      setOwnedIds((prev) => new Set(prev).add(checkoutItem.id))
    }
    pushToast('Compra confirmada! O item foi adicionado ao seu inventário.', 'success')
  }

  const checkoutPayload =
    checkoutItem === null
      ? null
      : {
          title: checkoutItem.title,
          description: checkoutItem.description,
          price: checkoutItem.price,
        }

  const buyVirtual = (item: LojaItem) => {
    if (ownedIds.has(item.id)) return

    if (item.payType === 'coin') {
      const cost = parseCoinPrice(item.price)
      if (walletCoins < cost) {
        pushToast('Moedas insuficientes para esta compra.', 'error')
        return
      }
      setWalletCoins((c) => c - cost)
      setOwnedIds((prev) => new Set(prev).add(item.id))
      pushToast(`${item.title} adquirido com moedas Edênicas.`, 'success')
      return
    }

    if (item.payType === 'energy') {
      const cost = parseEnergyPrice(item.price)
      if (walletEnergy < cost) {
        pushToast('Energia (raios) insuficiente.', 'error')
        return
      }
      setWalletEnergy((e) => e - cost)
      setOwnedIds((prev) => new Set(prev).add(item.id))
      pushToast(`${item.title} adquirido com raios de energia.`, 'success')
    }
  }

  const handleBuyClick = (item: LojaItem) => {
    if (ownedIds.has(item.id)) return
    if (item.payType === 'real') {
      startRealPurchase(item)
      return
    }
    buyVirtual(item)
  }

  const canAfford = (item: LojaItem): boolean => {
    if (item.payType === 'coin') return walletCoins >= parseCoinPrice(item.price)
    if (item.payType === 'energy') return walletEnergy >= parseEnergyPrice(item.price)
    return true
  }

  return (
    <>
      <ParentalCredentialsModal
        open={showParental}
        onClose={closeParentalOnly}
        onConfirm={afterParentalConfirm}
        description={LOJA_PARENTAL_DESC}
      />
      <LojaCheckoutModal
        open={showCheckout}
        onClose={closeCheckout}
        item={checkoutPayload}
        onSuccess={onCheckoutSuccess}
      />

      {toast ? (
        <div
          className={`${styles.toast} ${toast.tone === 'success' ? styles.toastSuccess : styles.toastError}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      ) : null}

      <div className={styles.root}>
        <header className={styles.pageHead}>
          <h1 className={styles.pageTitle}>Loja de Itens</h1>
          <div className={styles.wallet} aria-label="Saldo do jogador">
            <div className={styles.walletPill}>
              <span className={styles.walletIcon} style={{ background: 'rgb(234 88 12 / 0.35)', color: '#fb923c' }}>
                <GiTwoCoins style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              </span>
              {formatWalletAmount(walletCoins)}
            </div>
            <div className={styles.walletPill}>
              <span className={styles.walletIcon} style={{ background: 'rgb(234 179 8 / 0.25)', color: '#facc15' }}>
                <FiZap style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              </span>
              {formatWalletAmount(walletEnergy)}
            </div>
            <div className={styles.walletPill}>
              <span className={styles.walletIcon} style={{ background: 'rgb(239 68 68 / 0.25)', color: '#f87171' }}>
                <FiHeart style={{ width: '0.875rem', height: '0.875rem' }} aria-hidden />
              </span>
              {WALLET_LIVES}
            </div>
          </div>
        </header>

        <section className={styles.filters} aria-labelledby="loja-filtros-heading">
          <div className={styles.filtersHead} id="loja-filtros-heading">
            <FiFilter style={{ width: '1rem', height: '1rem' }} aria-hidden />
            Filtros
          </div>
          <div className={styles.filtersGrid}>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="filtro-tipo">
                Tipo de Item
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="filtro-tipo"
                  className={styles.select}
                  value={filterTipo}
                  onChange={(e) => setFilterTipo(e.target.value)}
                >
                  <option value="">Todos os tipos</option>
                  <option value="roupa">Roupa</option>
                  <option value="consumivel">Consumível</option>
                  <option value="pacote">Pacote</option>
                </select>
                <FiChevronDown className={styles.chevron} aria-hidden />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="filtro-moeda">
                Moeda
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="filtro-moeda"
                  className={styles.select}
                  value={filterMoeda}
                  onChange={(e) => setFilterMoeda(e.target.value)}
                >
                  <option value="">Todas</option>
                  <option value="moedas">Moedas</option>
                  <option value="raios">Raios</option>
                  <option value="real">Real</option>
                </select>
                <FiChevronDown className={styles.chevron} aria-hidden />
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel} htmlFor="filtro-data">
                Data
              </label>
              <div className={styles.selectWrap}>
                <select
                  id="filtro-data"
                  className={styles.select}
                  value={filterData}
                  onChange={(e) => setFilterData(e.target.value)}
                >
                  <option value="">Qualquer data</option>
                  <option value="recente">Mais recentes</option>
                  <option value="promo">Em promoção</option>
                </select>
                <FiChevronDown className={styles.chevron} aria-hidden />
              </div>
            </div>
          </div>
        </section>

        {filteredItems.length === 0 ? (
          <p className={styles.emptyState}>Nenhum item encontrado com estes filtros. Ajuste os filtros e tente de novo.</p>
        ) : (
          <div className={styles.grid}>
            {visible.map((item) => {
              const owned = ownedIds.has(item.id)
              const affordable = canAfford(item)
              const disabledBuy = owned || (!affordable && item.payType !== 'real')

              return (
                <article key={item.id} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      width={640}
                      height={400}
                      loading="eager"
                      decoding="async"
                      className={styles.cardImageImg}
                    />
                  </div>
                  <div className={styles.cardBody}>
                    <h2 className={styles.cardTitle}>{item.title}</h2>
                    <p className={styles.cardDesc}>{item.description}</p>
                    <span className={styles.badge}>{item.tag}</span>
                    <div className={styles.cardFooter}>
                      <div className={styles.price}>
                        {item.payType === 'coin' ? (
                          <>
                            <GiTwoCoins style={{ width: '1rem', height: '1rem', color: '#fb923c' }} aria-hidden />
                            <span>{item.price}</span>
                          </>
                        ) : null}
                        {item.payType === 'energy' ? (
                          <>
                            <FiZap style={{ width: '1rem', height: '1rem', color: '#facc15' }} aria-hidden />
                            <span>{item.price}</span>
                          </>
                        ) : null}
                        {item.payType === 'real' ? <span className={styles.priceReal}>{item.price}</span> : null}
                      </div>
                      <button
                        type="button"
                        className={`${styles.btnBuy} ${owned ? styles.btnBuyOwned : item.payType === 'real' ? styles.btnBuyGreen : styles.btnBuyOrange}`}
                        disabled={disabledBuy}
                        onClick={() => handleBuyClick(item)}
                      >
                        {owned ? 'Adquirido' : 'Comprar'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}

        <nav className={styles.pagination} aria-label="Paginação da loja">
          <p className={styles.paginationMeta}>
            Página {filteredItems.length === 0 ? 0 : page} de {totalPages} •{' '}
            {filteredItems.length} itens encontrados
          </p>
          <div className={styles.paginationNav}>
            <button
              type="button"
              className={`${styles.pageBtn} ${styles.pageBtnNav}`}
              disabled={page <= 1 || filteredItems.length === 0}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              &lt; Anterior
            </button>
            {filteredItems.length === 0
              ? null
              : Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    className={`${styles.pageBtn} ${n === page ? styles.pageBtnActive : ''}`}
                    onClick={() => setPage(n)}
                    aria-current={n === page ? 'page' : undefined}
                  >
                    {n}
                  </button>
                ))}
            <button
              type="button"
              className={`${styles.pageBtn} ${styles.pageBtnNav}`}
              disabled={page >= totalPages || filteredItems.length === 0}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Próximo &gt;
            </button>
          </div>
        </nav>
      </div>
    </>
  )
}
