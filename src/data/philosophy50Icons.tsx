import type { ReactNode } from 'react'
import type { IconBaseProps } from 'react-icons/lib'
import { BiBrain } from 'react-icons/bi'
import {
  FaBuilding,
  FaHeartPulse,
  FaPumpSoap,
  FaSeedling,
  FaStaffSnake,
  FaStethoscope,
  FaUserTie,
  FaVenus,
} from 'react-icons/fa6'
import {
  FiAward,
  FiBarChart2,
  FiBookOpen,
  FiBriefcase,
  FiDroplet,
  FiEdit3,
  FiFeather,
  FiFilm,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMessageCircle,
  FiMic,
  FiMoon,
  FiPenTool,
  FiRefreshCw,
  FiStar,
  FiSun,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiUsers,
  FiVolume2,
  FiZap,
} from 'react-icons/fi'
import { HiOutlineSparkles } from 'react-icons/hi2'
import { LuHandshake, LuPuzzle } from 'react-icons/lu'
import { MdOutlineRestaurant, MdSelfImprovement } from 'react-icons/md'

type IconType = (props: IconBaseProps) => ReactNode

/** Ícone do cabeçalho do cartão (quadrado colorido + pictograma branco) */
export const philosophy50HeaderIcons: Record<string, IconType> = {
  fisica: FaHeartPulse,
  mental: BiBrain,
  espiritual: HiOutlineSparkles,
  relacional: FiGlobe,
  profissional: FiBriefcase,
}

const howCareIcons: Record<string, IconType[]> = {
  fisica: [MdOutlineRestaurant as IconType, FaVenus, FaStethoscope, FaPumpSoap],
  mental: [BiBrain, FiHeart, FaStaffSnake, FaSeedling],
  espiritual: [FiGlobe, HiOutlineSparkles, MdSelfImprovement as IconType, FiHeart],
  relacional: [LuHandshake, LuHandshake, FaSeedling, FiGlobe],
  profissional: [FiTarget, FaUserTie, LuHandshake, FaBuilding],
}

const activityIcons: Record<string, IconType[]> = {
  fisica: [FiDroplet, MdOutlineRestaurant as IconType, MdSelfImprovement as IconType, FiFeather, FiZap],
  mental: [LuPuzzle as IconType, FiBookOpen, FiFilm, FiPenTool, FiEdit3],
  espiritual: [FiSun, FiMessageCircle, FiMoon, FiVolume2, FiBookOpen],
  relacional: [FiGlobe, FiFeather, FiTarget, FiRefreshCw],
  profissional: [FiBriefcase, FiTrendingUp, FiMic, FiBarChart2, FiGlobe],
}

const fallbackHow: IconType = FiLayers
const fallbackAct: IconType = FiStar

export function getPhilosophyHowCareIcon(dimId: string, index: number): IconType {
  const list = howCareIcons[dimId]
  return list?.[index] ?? fallbackHow
}

export function getPhilosophyActivityIcon(dimId: string, index: number): IconType {
  const list = activityIcons[dimId]
  return list?.[index] ?? fallbackAct
}
