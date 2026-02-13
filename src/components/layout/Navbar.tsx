'use client'

import { useState } from 'react'
import { FiBarChart2, FiBook, FiAward, FiUsers, FiUser, FiBell, FiMessageCircle } from 'react-icons/fi'
import { Avatar } from '@src/components/ui'
import { cn } from '@src/utils/cn'

interface NavLink {
  label: string
  icon: React.ReactNode
  href: string
  id: string
  isActive?: boolean
}

export function Navbar() {
  const [activeLink, setActiveLink] = useState('dashboard')

  const navLinks: NavLink[] = [
    { label: 'Dashboard', icon: <FiBarChart2 />, href: '/dashboard', id: 'dashboard' },
    { label: 'Meus Cursos', icon: <FiBook />, href: '/cursos', id: 'cursos' },
    { label: 'Conquistas', icon: <FiAward />, href: '/conquistas', id: 'conquistas' },
    { label: 'Comunidade', icon: <FiUsers />, href: '/comunidade', id: 'comunidade' },
    { label: 'Perfil', icon: <FiUser />, href: '/perfil', id: 'perfil' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-bold text-white">
              E
            </div>
            <span className="text-xl font-bold text-gray-900">Edénicos Academy</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => {
              const isActive = activeLink === link.id
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    setActiveLink(link.id)
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  {link.icon}
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-gray-900">
              <FiBell className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-red-500" />
            </button>
            <button className="relative text-gray-600 hover:text-gray-900">
              <FiMessageCircle className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-green-500" />
            </button>
            <div className="flex items-center gap-2">
              <Avatar name="Sofia" size="sm" />
              <span className="hidden text-sm font-medium text-gray-700 sm:inline">Sofia</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
