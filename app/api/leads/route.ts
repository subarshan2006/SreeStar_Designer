import { NextRequest, NextResponse } from 'next/server'
import { createWhatsAppLink } from '@/lib/whatsapp'

// In-memory rate limiting map: IP -> timestamp
const RATE_LIMIT_MAP = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute per submission

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1'
    const now = Date.now()

    // Rate Limiting check
    const lastRequest = RATE_LIMIT_MAP.get(ip)
    if (lastRequest && now - lastRequest < RATE_LIMIT_WINDOW) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait 1 minute before submitting again.' },
        { status: 429 }
      )
    }

    const body = await request.json()

    // Anti-Spam Honeypot check
    if (body._gotcha || body.website) {
      // Silently discard spam bots
      return NextResponse.json({ success: true, message: 'Lead received' })
    }

    const { name, phone, garmentType, preferredDate, designCode, notes } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid full name.' }, { status: 400 })
    }

    const cleanPhone = String(phone || '').replace(/[^0-9+]/g, '')
    if (cleanPhone.length < 10) {
      return NextResponse.json({ error: 'Please provide a valid 10-digit mobile number.' }, { status: 400 })
    }

    // Set rate limit
    RATE_LIMIT_MAP.set(ip, now)

    // Build WhatsApp URL
    const waUrl = createWhatsAppLink({
      type: 'fitting_booking',
      clientName: name.trim(),
      phone: cleanPhone,
      garmentType: garmentType || 'Bespoke Blouse',
      preferredDate: preferredDate || 'Earliest Available',
      designCode: designCode?.trim() || undefined,
      notes: notes?.trim() || undefined,
    })

    const leadId = `LEAD-${Date.now().toString(36).toUpperCase()}`

    return NextResponse.json({
      success: true,
      leadId,
      waUrl,
      message: 'Fitting appointment requested successfully. Opening WhatsApp concierge.',
    })
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : 'Internal Server Error'
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}
