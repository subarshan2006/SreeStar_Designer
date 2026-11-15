import React from 'react'
import { cn } from '@/lib/utils'

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'display' | 'serif' | 'sans'
  italic?: boolean
  tracking?: 'normal' | 'tight' | 'wide' | 'widest' | 'ultra'
}

export function Heading({
  level = 1,
  variant = 'serif',
  italic = false,
  tracking = 'tight',
  className,
  children,
  ...props
}: HeadingProps) {
  const Component = `h${level}` as const

  const sizeClasses = {
    1: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05]',
    2: 'text-3xl sm:text-4xl md:text-5xl leading-[1.12]',
    3: 'text-2xl sm:text-3xl md:text-4xl leading-[1.2]',
    4: 'text-xl sm:text-2xl md:text-3xl leading-[1.25]',
    5: 'text-lg sm:text-xl font-medium leading-[1.3]',
    6: 'text-base sm:text-lg font-medium leading-[1.4]',
  }[level]

  const variantClasses = {
    display: 'font-display font-light uppercase tracking-wider',
    serif: 'font-serif font-normal',
    sans: 'font-sans font-semibold',
  }[variant]

  const trackingClasses = {
    normal: 'tracking-normal',
    tight: 'tracking-tight',
    wide: 'tracking-wide',
    widest: 'tracking-widest',
    ultra: 'tracking-ultra',
  }[tracking]

  return (
    <Component
      className={cn(
        'text-charcoal text-balance',
        sizeClasses,
        variantClasses,
        trackingClasses,
        italic && 'italic',
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'lg' | 'base' | 'sm' | 'xs'
  tone?: 'default' | 'muted' | 'subtle' | 'faint' | 'light'
}

export function Body({
  size = 'base',
  tone = 'default',
  className,
  children,
  ...props
}: BodyProps) {
  const sizeClasses = {
    lg: 'text-lg sm:text-xl leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    sm: 'text-sm sm:text-base leading-normal',
    xs: 'text-xs sm:text-sm leading-normal',
  }[size]

  const toneClasses = {
    default: 'text-charcoal',
    muted: 'text-charcoal-muted',
    subtle: 'text-charcoal-subtle',
    faint: 'text-charcoal-faint',
    light: 'text-ivory-light',
  }[tone]

  return (
    <p
      className={cn('font-sans font-normal', sizeClasses, toneClasses, className)}
      {...props}
    >
      {children}
    </p>
  )
}

export interface CaptionProps extends React.HTMLAttributes<HTMLSpanElement> {
  uppercase?: boolean
}

export function Caption({
  uppercase = true,
  className,
  children,
  ...props
}: CaptionProps) {
  return (
    <span
      className={cn(
        'text-xs tracking-wider text-charcoal-subtle font-mono',
        uppercase && 'uppercase',
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: 'charcoal' | 'maroon' | 'gold' | 'muted'
}

export function Label({
  tone = 'charcoal',
  className,
  children,
  ...props
}: LabelProps) {
  const toneClasses = {
    charcoal: 'text-charcoal border-charcoal/20 bg-charcoal/5',
    maroon: 'text-maroon border-maroon/20 bg-maroon-light',
    gold: 'text-gold-dark border-gold/30 bg-gold-shimmer/60',
    muted: 'text-charcoal-muted border-surface-border bg-surface',
  }[tone]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase rounded-full border',
        toneClasses,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export interface DesignCodeBadgeProps {
  code: string
  className?: string
}

export function DesignCodeBadge({ code, className }: DesignCodeBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-charcoal-muted bg-surface-card border border-surface-border px-2 py-0.5 rounded',
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
      {code}
    </span>
  )
}
