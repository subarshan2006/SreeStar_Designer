import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants'

export const runtime = 'edge'

export const alt = `${SITE_CONFIG.shopName} Twitter Card`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function TwitterImage() {
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
          padding: '60px 70px',
          fontFamily: 'serif',
          position: 'relative',
        }}
      >
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
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: '#721B29',
              }}
            />
            <span
              style={{
                fontSize: 18,
                letterSpacing: '0.25em',
                color: '#C5A059',
                textTransform: 'uppercase',
                fontFamily: 'monospace',
                fontWeight: 600,
              }}
            >
              SreeStar Atelier • Chennai
            </span>
          </div>

          <span
            style={{
              fontSize: 14,
              letterSpacing: '0.15em',
              color: 'rgba(250, 249, 245, 0.6)',
              textTransform: 'uppercase',
              fontFamily: 'monospace',
            }}
          >
            Custom Tailoring Studio
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: '#FAF9F5',
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            Award-Winning Women&apos;s Tailoring
          </h1>
          <p
            style={{
              fontSize: 26,
              color: '#C5A059',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            Bridal Maggam Blouses, Grand Frocks, Kurtis, Churidars & 90s Retro Collection
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(250, 249, 245, 0.15)',
            paddingTop: '24px',
          }}
        >
          <span
            style={{
              fontSize: 15,
              color: '#FAF9F5',
              fontFamily: 'monospace',
            }}
          >
            📍 T. Nagar, Chennai • 100% Perfect Fit Guarantee
          </span>
          <span
            style={{
              fontSize: 15,
              color: '#C5A059',
              fontFamily: 'monospace',
            }}
          >
            @sreestar_tailoring
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
