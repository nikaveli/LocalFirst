import { ImageResponse } from 'next/og';

// Default OG image for any route that doesn't override.
// Generated at build/request time using Next's ImageResponse.
// Final dimensions: 1200x630 (standard OG / Twitter card size).

export const alt = 'LocalFirst — No Business Left Behind';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background:
            'radial-gradient(ellipse 90% 60% at 50% 30%, #0c1830 0%, #000 70%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          fontFamily: 'sans-serif',
          color: '#FFFFFF',
        }}
      >
        {/* Top eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 22,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#F4B000',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              display: 'flex',
              width: 56,
              height: 1.5,
              background: '#F4B000',
            }}
          />
          AI Local Search Is Live
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              fontWeight: 700,
              maxWidth: 1000,
            }}
          >
            Customers are asking AI
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.04,
              letterSpacing: '-0.02em',
              fontWeight: 700,
            }}
          >
            to find a business like yours.
          </div>
          <div
            style={{
              fontSize: 64,
              fontStyle: 'italic',
              color: '#99BBEA',
              marginTop: 10,
              fontFamily: 'serif',
            }}
          >
            Are you the answer?
          </div>
        </div>

        {/* Bottom — wordmark + credentials */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 0,
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            <span style={{ color: '#FFFFFF' }}>Local</span>
            <span style={{ color: '#99BBEA' }}>First</span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 22,
              fontSize: 18,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#A8ACB3',
            }}
          >
            <span>Google Local Guide · L7</span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <span>BBB A+</span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>·</span>
            <span>Colorado</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
