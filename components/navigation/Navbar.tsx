'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { CategoryOverlay } from './CategoryOverlay'
import { BookingModal } from './BookingModal'
import { Menu, X, Sliders, Calendar } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export interface NavbarProps {
  activeCategory?: string
  onSelectCategory?: (categoryId: string) => void
}

export function Navbar({ activeCategory, onSelectCategory }: NavbarProps) {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      {/* =========================================================
          AWARD-LEVEL MINIMAL FIXED NAV
          mix-blend-mode: difference keeps text always legible
          ========================================================= */}
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none select-none">
        <nav
          aria-label="Main Navigation"
          className="w-full px-4 sm:px-6 md:px-10 py-5 flex items-center justify-between text-xs tracking-widest uppercase font-mono blend-difference text-white"
        >
          {/* Left: + Collections */}
          <div className="flex items-center gap-4 sm:gap-6 pointer-events-auto">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(true)}
              className="group inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity focus:outline-none"
              aria-expanded={isCategoryOpen}
              aria-label="Open Category Panel"
            >
              <span className="text-base font-bold text-white transition-transform group-hover:rotate-90 duration-300">
                +
              </span>
              <span className="font-semibold">Collections</span>
              <span className="hidden sm:inline-block text-[10px] opacity-70">
                (500+)
              </span>
            </button>

            {/* Quick Link to Living Styleguide */}
            <Link
              href="/styleguide"
              className="hidden lg:inline-flex items-center gap-1 text-[11px] bg-white/10 px-2 py-0.5 rounded border border-white/20 hover:bg-white/20 transition-all"
            >
              <Sliders className="w-3 h-3" />
              <span>Tokens</span>
            </Link>
          </div>

          {/* Centre-Right: About / Gallery / Contact */}
          <div className="hidden md:flex items-center gap-8 font-sans text-xs tracking-widest uppercase opacity-90 pointer-events-auto">
            <a
              href="#about"
              className="hover:opacity-100 hover:underline underline-offset-4 transition-all"
            >
              About
            </a>
            <button
              type="button"
              onClick={() => setIsCategoryOpen(true)}
              className="hover:opacity-100 hover:underline underline-offset-4 transition-all uppercase tracking-widest font-sans"
            >
              Gallery
            </button>
            <a
              href="#contact"
              className="hover:opacity-100 hover:underline underline-offset-4 transition-all"
            >
              Contact
            </a>
          </div>

          {/* Right: Book a Fitting + & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {/* Desktop & Tablet Book Button */}
            <button
              type="button"
              onClick={() => setIsBookingOpen(true)}
              className="inline-flex items-center gap-2 border border-white/60 px-3.5 py-1.5 rounded-full hover:bg-white hover:text-black transition-all font-mono text-[11px] focus:outline-none"
            >
              <span>Book a Fitting</span>
              <span className="font-bold">+</span>
            </button>

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-1.5 text-white focus:outline-none"
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <span className="inline-flex items-center gap-1 font-mono text-[11px]">
                  <span>+</span> Menu
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Collapsible Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden pointer-events-auto bg-ivory text-charcoal border-b border-surface-border px-6 py-6 shadow-xl animate-fade-up">
            <div className="space-y-4 font-mono text-xs uppercase tracking-wider">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsCategoryOpen(true)
                }}
                className="w-full text-left py-2 border-b border-surface-border flex items-center justify-between text-maroon font-semibold"
              >
                <span>+ View All 500+ Collections</span>
                <span>→</span>
              </button>
              <a
                href="#about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-surface-border text-charcoal"
              >
                About Tailoring Studio
              </a>
              <Link
                href="/styleguide"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 border-b border-surface-border text-charcoal"
              >
                Design System & Styleguide
              </Link>
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-charcoal"
              >
                Contact & Google Maps
              </a>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsBookingOpen(true)
                }}
                className="w-full mt-2 bg-maroon text-white text-center py-3 rounded uppercase font-semibold text-xs tracking-wider"
              >
                Book a Fitting +
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Fullscreen Category Overlay Modal */}
      <CategoryOverlay
        isOpen={isCategoryOpen}
        onClose={() => setIsCategoryOpen(false)}
        activeCategory={activeCategory}
        onSelectCategory={onSelectCategory}
      />

      {/* Book a Fitting Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </>
  )
}
