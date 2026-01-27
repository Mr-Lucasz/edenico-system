import { type HTMLAttributes, forwardRef } from 'react'
import { cn } from '@src/utils/cn'

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  name: string
  size?: 'sm' | 'md' | 'lg'
  imageUrl?: string
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, name, size = 'md', imageUrl, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 w-8 text-xs',
      md: 'h-10 w-10 text-sm',
      lg: 'h-12 w-12 text-base',
    }

    const getInitials = (name: string): string => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold',
          sizes[size],
          className
        )}
        {...props}
      >
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="h-full w-full rounded-full object-cover" />
        ) : (
          <span>{getInitials(name)}</span>
        )}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'
