/**
 * ====================================================================
 * SreeStar Tailoring — GSAP ScrollTrigger & Animation Core
 * ====================================================================
 */

export const ANIMATION_DEFAULTS = {
  duration: 0.85,
  ease: 'power3.out',
  stagger: 0.12,
  distance: 30,
} as const

export type RevealVariant = 'fade-up' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right' | 'clip-reveal'

/**
 * Generates Tailwind / CSS animation styles matching the GSAP preset
 * allowing full visual parity with or without client JS hydration.
 */
export function getRevealStyles(
  variant: RevealVariant = 'fade-up',
  delayMs: number = 0
): { className: string; style: React.CSSProperties } {
  const baseTransitions = 'transition-all duration-700 ease-out will-change-transform'

  const styles: React.CSSProperties = {
    transitionDelay: `${delayMs}ms`,
  }

  const variantClassMap: Record<RevealVariant, string> = {
    'fade-up': `${baseTransitions} translate-y-6 opacity-0 data-[revealed=true]:translate-y-0 data-[revealed=true]:opacity-100`,
    'fade-in': `${baseTransitions} opacity-0 data-[revealed=true]:opacity-100`,
    'scale-up': `${baseTransitions} scale-95 opacity-0 data-[revealed=true]:scale-100 data-[revealed=true]:opacity-100`,
    'slide-left': `${baseTransitions} -translate-x-8 opacity-0 data-[revealed=true]:translate-x-0 data-[revealed=true]:opacity-100`,
    'slide-right': `${baseTransitions} translate-x-8 opacity-0 data-[revealed=true]:translate-x-0 data-[revealed=true]:opacity-100`,
    'clip-reveal': `${baseTransitions} opacity-0 data-[revealed=true]:opacity-100 [clip-path:inset(100%_0_0_0)] data-[revealed=true]:[clip-path:inset(0%_0_0_0)]`,
  }

  return {
    className: variantClassMap[variant],
    style: styles,
  }
}
