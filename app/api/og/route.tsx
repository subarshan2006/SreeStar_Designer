import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
import { SITE_CONFIG } from '@/lib/constants'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const title = searchParams.get('title') || 'Custom Tailored Blouse'
    const code = searchParams.get('code') || 'D-0104'
    const category = searchParams.get('cat') || 'Bridal Blouses'
    const work = searchParams.get('work') || 'Artisanal Handcraft'

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#141413',
            padding: '55px 70px',
            fontFamily: 'serif',
            position: 'relative',
          }}
        >
          {/* Gold Inset Frame */}
          <div
            style={{
              position: 'absolute',
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              border: '1px solid rgba(197, 160, 89, 0.35)',
              pointerEvents: 'none',
            }}
          />

          {/* Top Atelier Bar */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: '#721B29',
                }}
              />
              <span
                style={{
                  fontSize: 16,
                  letterSpacing: '0.22em',
                  color: '#C5A059',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  fontWeight: 600,
                }}
              >
                {SITE_CONFIG.shopName.toUpperCase()} ATELIER • {SITE_CONFIG.city.toUpperCase()}
              </span>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(114, 27, 41, 0.6)',
                border: '1px solid rgba(197, 160, 89, 0.45)',
                color: '#FAF9F5',
                padding: '6px 14px',
                borderRadius: '4px',
                fontSize: 13,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '0.12em',
              }}
            >
              {code}
            </div>
          </div>

          {/* Center Design Info */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '1020px',
            }}
          >
            <span
              style={{
                fontSize: 15,
                color: '#C5A059',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
                letterSpacing: '0.18em',
              }}
            >
              {category} • {work}
            </span>
            <h1
              style={{
                fontSize: 56,
                fontWeight: 800,
                color: '#FAF9F5',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 22,
                color: 'rgba(250, 249, 245, 0.75)',
                fontStyle: 'italic',
                margin: 0,
              }}
            >
              Individually tailored with precision body contouring & 100% perfect fit guarantee.
            </p>
          </div>

          {/* Bottom Footer Specs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(250, 249, 245, 0.15)',
              paddingTop: '22px',
            }}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <span
                style={{
                  fontSize: 13,
                  color: '#FAF9F5',
                  fontFamily: 'monospace',
                }}
              >
                ✓ Women Only Atelier
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#FAF9F5',
                  fontFamily: 'monospace',
                }}
              >
                ✓ 48-Hr Rush Service
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: '#FAF9F5',
                  fontFamily: 'monospace',
                }}
              >
                ✓ Free Alterations
              </span>
            </div>

            <span
              style={{
                fontSize: 15,
                color: '#C5A059',
                fontFamily: 'monospace',
                letterSpacing: '0.08em',
              }}
            >
              sreestar.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : 'Unknown error'
    return new Response(`Failed to generate OG Image: ${errorMsg}`, { status: 500 })
  }
}
