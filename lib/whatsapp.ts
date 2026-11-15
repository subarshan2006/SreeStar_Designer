import { SITE_CONFIG } from './constants'

export type WhatsAppContext =
  | 'design_enquiry'
  | 'fitting_booking'
  | 'wishlist_share'
  | 'emergency_rush'
  | 'doorstep_measurement'
  | 'general'

export interface WhatsAppOptions {
  type: WhatsAppContext
  designCode?: string
  title?: string
  clientName?: string
  phone?: string
  garmentType?: string
  preferredDate?: string
  designCodes?: string[]
  notes?: string
}

/**
 * ====================================================================
 * SreeStar Tailoring — WhatsApp Integration & Deep Linking Engine
 * ====================================================================
 */

export function buildWhatsAppMessage(options: WhatsAppOptions): string {
  const shop = SITE_CONFIG.shopName

  switch (options.type) {
    case 'design_enquiry': {
      const code = options.designCode ? `*${options.designCode}*` : 'a design'
      const name = options.title ? ` (${options.title})` : ''
      return `Hi ${shop}! I am interested in design code ${code}${name}. Could you please let me know fitting appointment availability, fabric requirements, and stitching estimates?`
    }

    case 'fitting_booking': {
      return (
        `*Fitting Appointment Reservation — ${shop}*\n\n` +
        `• Name: ${options.clientName || 'Valued Client'}\n` +
        `• WhatsApp: ${options.phone || 'Provided'}\n` +
        `• Garment: ${options.garmentType || 'Bespoke Blouse'}\n` +
        `• Preferred Date: ${options.preferredDate || 'Earliest Slot'}\n` +
        (options.designCode ? `• Design Code: ${options.designCode}\n` : '') +
        (options.notes ? `• Special Requests: ${options.notes}\n` : '') +
        `\nPlease confirm the nearest available master fitter consultation slot.`
      )
    }

    case 'wishlist_share': {
      const codes = options.designCodes?.join(', ') || 'None selected'
      const count = options.designCodes?.length || 0
      return (
        `Hi ${shop}! I was browsing your runway collections and curated a wishlist of ${count} designs I love:\n\n` +
        `✨ Design Codes: *${codes}*\n\n` +
        `Can we discuss custom stitching and fabric options for these?`
      )
    }

    case 'emergency_rush': {
      const code = options.designCode ? ` for design ${options.designCode}` : ''
      return `Hi ${shop}! 🔥 I have an urgent wedding/event and need your 48-Hour Emergency Rush Stitching service${code}. Can you accommodate my order?`
    }

    case 'doorstep_measurement': {
      return `Hi ${shop}! I am planning a bridal order (3+ blouses) and would like to request your Senior Master Fitter at-home measurement service in Chennai.`
    }

    case 'general':
    default: {
      return `Hi ${shop}! I have an enquiry regarding bespoke women's tailoring at your Chennai atelier.`
    }
  }
}

/**
 * Generate full click-to-chat WhatsApp URL
 */
export function createWhatsAppLink(options: WhatsAppOptions): string {
  const message = buildWhatsAppMessage(options)
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
}
