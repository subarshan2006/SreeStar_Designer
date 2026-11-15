import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#FAF9F5',
          dark: '#F2EFE9',
          light: '#FDFAF5',
          warm: '#F7F4EE',
        },
        surface: {
          DEFAULT: '#F5F2EB',
          elevated: '#FFFFFF',
          card: '#F8F5EE',
          border: '#E8E4DC',
        },
        charcoal: {
          DEFAULT: '#141413',
          light: '#2B2926',
          muted: '#635F59',
          subtle: '#8C867E',
          faint: '#C2BCB3',
        },
        maroon: {
          DEFAULT: '#721B29',
          hover: '#54121D',
          light: '#FAEFF1',
          accent: '#8E2435',
          border: '#E3C1C7',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#DFC58B',
          dark: '#9A7836',
          shimmer: '#F5EBD4',
          accent: '#D4AF37',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Cinzel', 'Playfair Display', 'serif'],
        serif: ['var(--font-serif)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        ultra: '0.25em',
        widest: '0.2em',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
