import { ImageResponse } from 'next/og'
import { SITE_CONFIG } from '@/lib/constants'

export const runtime = 'edge'

export const alt = `${SITE_CONFIG.shopName} — Women's Custom Blouse & Tailoring Studio Chennai`
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OpenGraphImage() {
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
        {/* Subtle Luxury Gold Border Inset */}
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

        {/* Top Header Row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
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
              Haute Couture Atelier • Chennai
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
            Strictly Women Only
          </span>
        </div>

        {/* Center Editorial Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '1000px',
          }}
        >
          <h1
            style={{
              fontSize: 68,
              fontWeight: 800,
              color: '#FAF9F5',
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: '-0.02em',
            }}
          >
            SREESTAR
          </h1>
          <p
            style={{
              fontSize: 28,
              color: '#C5A059',
              fontStyle: 'italic',
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            Bespoke Bridal Blouses, Grand Frocks, Kurtis & 90s Vintage Collection
          </p>
        </div>

        {/* Bottom Feature Badges & Location */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            width: '100%',
            borderTop: '1px solid rgba(250, 249, 245, 0.15)',
            paddingTop: '28px',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '12px',
            }}
          >
            {['100% Fit Guarantee', '500+ Silhouettes', '48-Hr Rush Available', 'T. Nagar Studio'].map(
              (badge) => (
                <div
                  key={badge}
                  style={{
                    backgroundColor: 'rgba(114, 27, 41, 0.45)',
                    border: '1px solid rgba(197, 160, 89, 0.4)',
                    color: '#FAF9F5',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontSize: 13,
                    fontFamily: 'monospace',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {badge}
                </div>
              )
            )}
          </div>

          <span
            style={{
              fontSize: 16,
              color: '#FAF9F5',
              fontFamily: 'monospace',
              letterSpacing: '0.1em',
            }}
          >
            sreestar.com
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
