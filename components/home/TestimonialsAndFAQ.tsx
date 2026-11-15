'use client'

import React, { useState, useEffect } from 'react'
import { getTestimonials, getFAQs, TestimonialRecord, FAQRecord } from '@/lib/api'
import { Heading, Caption } from '@/components/ui/typography'
import { Star, ChevronLeft, ChevronRight, ChevronDown, MessageCircle, ExternalLink, Quote } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/constants'

export function TestimonialsAndFAQ() {
  const [testimonials, setTestimonials] = useState<TestimonialRecord[]>([])
  const [faqs, setFaqs] = useState<FAQRecord[]>([])
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0)
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1')
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    getTestimonials().then(setTestimonials)
    getFAQs().then(setFaqs)
  }, [])

  // Auto-rotate testimonials every 7s unless hovered
  useEffect(() => {
    if (testimonials.length <= 1 || isPaused) return
    const timer = setInterval(() => {
      setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [testimonials.length, isPaused])

  const nextTestimonial = () => {
    if (testimonials.length === 0) return
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    if (testimonials.length === 0) return
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[activeTestimonialIndex]

  return (
    <section
      aria-label="Testimonials and Frequently Asked Questions"
      className="relative w-full py-20 sm:py-28 bg-ivory text-charcoal overflow-hidden select-none border-t border-surface-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* =========================================================
            PART 1: TESTIMONIALS CAROUSEL
            ========================================================= */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="space-y-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-maroon" />
                <Caption>Real Brides & Women Across Chennai</Caption>
              </div>
              <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl mt-2 text-charcoal">
                Client Fitting Reviews
              </Heading>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-charcoal hover:text-maroon font-semibold"
              >
                <span>Read Google Reviews</span>
                <ExternalLink className="w-3.5 h-3.5 text-maroon" />
              </a>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  aria-label="Previous Testimonial"
                  className="w-10 h-10 rounded-full border border-surface-border bg-surface-card flex items-center justify-center text-charcoal hover:border-maroon hover:bg-maroon hover:text-white transition-colors focus:outline-none"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  aria-label="Next Testimonial"
                  className="w-10 h-10 rounded-full border border-surface-border bg-surface-card flex items-center justify-center text-charcoal hover:border-maroon hover:bg-maroon hover:text-white transition-colors focus:outline-none"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {currentTestimonial && (
            <div className="relative max-w-4xl mx-auto bg-surface-card rounded-sm p-8 sm:p-14 border border-surface-border shadow-lg transition-all duration-500">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-maroon-light opacity-50 pointer-events-none" />

              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6 text-gold">
                {Array.from({ length: currentTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Testimonial Quote */}
              <blockquote className="font-serif italic text-xl sm:text-2xl md:text-3xl text-charcoal leading-relaxed mb-8">
                &ldquo;{currentTestimonial.text}&rdquo;
              </blockquote>

              {/* Author & Occasion */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-surface-border/60">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-semibold text-charcoal">
                    {currentTestimonial.clientName}
                  </h4>
                  <p className="font-mono text-xs text-maroon font-semibold mt-0.5">
                    {currentTestimonial.occasion}
                  </p>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs text-charcoal-subtle">
                  <span>Verified Fitting</span>
                  <span>•</span>
                  <span>{currentTestimonial.date}</span>
                </div>
              </div>

              {/* Slide Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTestimonialIndex(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none ${
                      activeTestimonialIndex === idx ? 'w-8 bg-maroon' : 'w-2 bg-surface-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* =========================================================
            PART 2: FAQ ACCORDION (Schema.org compliant)
            ========================================================= */}
        <div className="space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-surface-border pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-maroon" />
                <Caption>Pricing, Turnaround & Fitting Policies</Caption>
              </div>
              <Heading level={2} variant="serif" italic className="text-3xl sm:text-5xl mt-2 text-charcoal">
                Frequently Asked Questions
              </Heading>
            </div>

            <p className="font-mono text-xs text-charcoal-muted max-w-xs text-left sm:text-right">
              Everything you need to know about tailoring with SreeStar.
            </p>
          </div>

          <div className="max-w-4xl mx-auto divide-y divide-surface-border border-y border-surface-border">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id

              return (
                <div key={faq.id} className="py-5 sm:py-6 transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left gap-4 focus:outline-none group"
                  >
                    <span className="font-serif text-lg sm:text-xl font-medium text-charcoal group-hover:text-maroon transition-colors">
                      {faq.question}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border border-surface-border flex items-center justify-center text-charcoal-muted group-hover:border-maroon group-hover:text-maroon transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180 bg-maroon-light text-maroon' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="pt-3 pr-10 text-charcoal-muted font-sans text-sm sm:text-base leading-relaxed animate-fade-up">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="text-center pt-4">
            <p className="font-sans text-xs text-charcoal-muted">
              Have a question not answered here?{' '}
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20${encodeURIComponent(SITE_CONFIG.shopName)}!%20I%20have%20a%20question%20regarding%20stitching.`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-maroon font-semibold underline underline-offset-4 hover:text-maroon-hover inline-flex items-center gap-1 font-mono"
              >
                <span>Ask us on WhatsApp</span>
                <MessageCircle className="w-3.5 h-3.5" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
