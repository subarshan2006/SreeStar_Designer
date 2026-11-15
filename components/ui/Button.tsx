import React from 'react'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'gold' | 'outline' | 'ghost' | 'blend'
  size?: 'sm' | 'md' | 'lg'
  iconRight?: React.ReactNode
  iconLeft?: React.ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  iconRight,
  iconLeft,
  ...props
}: ButtonProps) {
  const baseStyles = 'group relative inline-flex items-center justify-center font-sans tracking-wide transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const sizeStyles = {
    sm: 'text-xs uppercase px-4 py-2 gap-1.5',
    md: 'text-xs uppercase font-medium px-6 py-3.5 gap-2',
    lg: 'text-sm uppercase font-medium px-8 py-4 gap-2.5',
  }[size]

  const variantStyles = {
    primary:
      'bg-maroon text-white hover:bg-maroon-hover active:bg-maroon-dark shadow-sm hover:shadow-md transition-transform hover:-translate-y-0.5',
    gold:
      'bg-gold text-charcoal hover:bg-gold-light active:bg-gold-dark font-semibold shadow-sm hover:shadow transition-transform hover:-translate-y-0.5',
    outline:
      'border border-charcoal/20 hover:border-maroon text-charcoal hover:text-maroon bg-transparent hover:bg-maroon-light/30',
    ghost:
      'bg-transparent text-charcoal hover:text-maroon px-2 py-1 underline-offset-4 hover:underline',
    blend:
      'bg-transparent text-white mix-blend-difference hover:opacity-80 transition-opacity',
  }[variant]

  return (
    <button
      className={cn(baseStyles, sizeStyles, variantStyles, className)}
      {...props}
    >
      {iconLeft && <span className="transition-transform group-hover:-translate-x-0.5">{iconLeft}</span>}
      <span>{children}</span>
      {iconRight && <span className="transition-transform group-hover:translate-x-0.5">{iconRight}</span>}
    </button>
  )
}
