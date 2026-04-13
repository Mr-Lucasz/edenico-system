import type { ReactNode } from 'react'
import type { IconBaseProps } from 'react-icons/lib'
import { FaBrain, FaCrown, FaMoneyBillWave } from 'react-icons/fa6'
import {
  FiActivity,
  FiAward,
  FiBook,
  FiBookOpen,
  FiCpu,
  FiFilm,
  FiGlobe,
  FiHeart,
  FiStar,
  FiHome,
  FiCloud,
  FiLayers,
  FiMic,
  FiPenTool,
  FiSmile,
  FiTarget,
  FiTool,
  FiUsers,
  FiZap,
} from 'react-icons/fi'
import { HiOutlineBeaker, HiOutlineLightBulb, HiOutlineSparkles } from 'react-icons/hi2'
import {
  MdOutlineScience,
  MdOutlineSportsEsports,
  MdPalette,
  MdTheaterComedy,
  MdVolunteerActivism,
} from 'react-icons/md'
import type { StarsCategoryId } from './starsContent'

type IconType = (props: IconBaseProps) => ReactNode

/** Ícones circulares — coluna «Áreas» (índice por cartão) */
export const starsLeftColumnIcons: Record<StarsCategoryId, IconType[]> = {
  science: [MdOutlineScience as IconType, FiGlobe, FiTarget, FiGlobe],
  technology: [FiTarget, FiCpu, FiTool],
  arts: [MdTheaterComedy as IconType, FiPenTool, MdPalette as IconType, FiMic, FiGlobe],
  relationship: [FaBrain, FiHome, FiUsers, FiStar, FiGlobe],
  service: [FiHome, MdVolunteerActivism as IconType, HiOutlineLightBulb, FaMoneyBillWave, FaCrown],
}

/** Ícones à esquerda — coluna «Atividades» (cartões horizontais) */
export const starsRightColumnIcons: Record<StarsCategoryId, IconType[]> = {
  science: [HiOutlineBeaker as IconType, HiOutlineSparkles as IconType, FiZap, FiTool],
  technology: [FiCpu, FiActivity, MdOutlineSportsEsports as IconType, FiLayers],
  arts: [FiFilm, FiBook, FiLayers, FiMic],
  relationship: [FiUsers, FiHeart, FiSmile, FiActivity],
  service: [FiHeart, FiZap, FiBook, FiAward],
}

/** Fundo e cor do traço dos ícones — coluna direita (protótipo / SVG: acentos distintos por linha) */
export const starsRightActivityIconAccents: Record<StarsCategoryId, { bg: string; fg: string }[]> = {
  science: [
    { bg: '#DBEAFE', fg: '#2563EB' },
    { bg: '#DCFCE7', fg: '#16A34A' },
    { bg: '#FFEDD5', fg: '#EA580C' },
    { bg: '#CCFBF1', fg: '#0D9488' },
  ],
  technology: [
    { bg: '#EDE9FE', fg: '#7C3AED' },
    { bg: '#E0E7FF', fg: '#4F46E5' },
    { bg: '#FCE7F3', fg: '#DB2777' },
    { bg: '#D1FAE5', fg: '#059669' },
  ],
  arts: [
    { bg: '#FFEDD5', fg: '#C2410C' },
    { bg: '#FEF3C7', fg: '#B45309' },
    { bg: '#FCE7F3', fg: '#BE185D' },
    { bg: '#E0E7FF', fg: '#4338CA' },
  ],
  relationship: [
    { bg: '#DCFCE7', fg: '#15803D' },
    { bg: '#D1FAE5', fg: '#047857' },
    { bg: '#ECFCCB', fg: '#65A30D' },
    { bg: '#E0F2FE', fg: '#0369A1' },
  ],
  service: [
    { bg: '#FEE2E2', fg: '#DC2626' },
    { bg: '#FFEDD5', fg: '#EA580C' },
    { bg: '#FEF3C7', fg: '#D97706' },
    { bg: '#E0E7FF', fg: '#4F46E5' },
  ],
}

export function getLeftIcon(cat: StarsCategoryId, index: number): IconType {
  const list = starsLeftColumnIcons[cat]
  return list[index] ?? MdOutlineScience
}

export function getRightIcon(cat: StarsCategoryId, index: number): IconType {
  const list = starsRightColumnIcons[cat]
  return list[index] ?? FiActivity
}

export function getRightActivityAccent(cat: StarsCategoryId, index: number): { bg: string; fg: string } {
  const list = starsRightActivityIconAccents[cat]
  return list[index] ?? { bg: '#F3F4F6', fg: '#4B5563' }
}
