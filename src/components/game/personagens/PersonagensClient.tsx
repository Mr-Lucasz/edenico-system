'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { FiChevronLeft, FiStar } from 'react-icons/fi'
import { FaCrown } from 'react-icons/fa6'
import { ADAO_CUSTOMIZATION_SLOTS, type AdaoIconSlotId } from './adaoIconAssets'
import { PersonalizePersonagemModal, type PersonagemModalCharacter } from './PersonalizePersonagemModal'
import styles from './PersonagensClient.module.scss'

const ICON_PX = 56

export function PersonagensClient() {
  const [adaoActive, setAdaoActive] = useState<AdaoIconSlotId | null>(null)
  const [evaActive, setEvaActive] = useState<AdaoIconSlotId | null>(null)
  const [modal, setModal] = useState<PersonagemModalCharacter | null>(null)

  const toggleAdao = (id: AdaoIconSlotId) => {
    setAdaoActive((prev) => (prev === id ? null : id))
  }

  const toggleEva = (id: AdaoIconSlotId) => {
    setEvaActive((prev) => (prev === id ? null : id))
  }

  return (
    <div className={styles.root}>
      <div className={styles.backRow}>
        <Link href="/comunidade" className={styles.backLink}>
          <FiChevronLeft className={styles.backIcon} aria-hidden />
          Voltar
        </Link>
      </div>

      <h1 className={styles.pageTitle}>Personalize seus personagens</h1>

      <div className={styles.cardsGrid}>
        <article className={`${styles.characterCard} ${styles.cardAdao}`} aria-labelledby="personagem-adao-titulo">
          <div className={styles.cardRow}>
            <div className={styles.cardMain}>
              <h2 id="personagem-adao-titulo" className={styles.name}>
                Adão
              </h2>
              <p className={styles.desc}>O primeiro homem do Éden</p>
              <div className={styles.statsRow}>
                <span className={styles.statItem}>
                  <FaCrown className={styles.statIconGold} aria-hidden />
                  Nível 45
                </span>
                <span className={styles.statItem}>
                  <FiStar className={styles.statIconGold} aria-hidden />
                  Líder Sábio
                </span>
              </div>
            </div>

            <div className={styles.iconRail} role="toolbar" aria-label="Atalhos de categoria do Adão">
              {ADAO_CUSTOMIZATION_SLOTS.map((slot) => {
                const active = adaoActive === slot.id
                return (
                  <button
                    key={slot.id}
                    type="button"
                    className={styles.iconBtn}
                    aria-pressed={active}
                    aria-label={slot.label}
                    onClick={() => toggleAdao(slot.id)}
                  >
                    <Image
                      src={active ? slot.clickedSrc : slot.defaultSrc}
                      alt=""
                      width={ICON_PX}
                      height={ICON_PX}
                      className={styles.iconImg}
                      priority={slot.id === 'roupa'}
                    />
                  </button>
                )
              })}
            </div>
          </div>
          <button type="button" className={styles.btnPersonalize} onClick={() => setModal('adao')}>
            Personalizar
          </button>
        </article>

        <article className={`${styles.characterCard} ${styles.cardEva}`} aria-labelledby="personagem-eva-titulo">
          <div className={styles.cardRow}>
            <div className={styles.cardMain}>
              <h2 id="personagem-eva-titulo" className={styles.name}>
                Eva
              </h2>
              <p className={styles.desc}>A primeira mulher do Éden</p>
              <div className={styles.statsRow}>
                <span className={styles.statItem}>
                  <FaCrown className={styles.statIconGold} aria-hidden />
                  Nível 44
                </span>
                <span className={styles.statItem}>
                  <FiStar className={styles.statIconGold} aria-hidden />
                  Coração Gentil
                </span>
              </div>
            </div>

            <div className={styles.iconRail} role="toolbar" aria-label="Atalhos de categoria da Eva">
              {ADAO_CUSTOMIZATION_SLOTS.map((slot) => {
                const active = evaActive === slot.id
                return (
                  <button
                    key={`eva-${slot.id}`}
                    type="button"
                    className={styles.iconBtn}
                    aria-pressed={active}
                    aria-label={slot.label}
                    onClick={() => toggleEva(slot.id)}
                  >
                    <Image
                      src={active ? slot.clickedSrc : slot.defaultSrc}
                      alt=""
                      width={ICON_PX}
                      height={ICON_PX}
                      className={`${styles.iconImg} ${active ? styles.evaPinkClicked : ''}`}
                    />
                  </button>
                )
              })}
            </div>
          </div>
          <button type="button" className={styles.btnPersonalize} onClick={() => setModal('eva')}>
            Personalizar
          </button>
        </article>
      </div>

      {modal ? (
        <PersonalizePersonagemModal open character={modal} onClose={() => setModal(null)} />
      ) : null}
    </div>
  )
}
