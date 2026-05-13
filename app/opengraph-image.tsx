import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NDT Connect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#003680',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            display: 'flex',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '60px',
          }}
        >
          {/* Logo block */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 18,
                background: 'white',
                color: '#003680',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 44,
                fontWeight: 800,
                letterSpacing: '-2px',
              }}
            >
              NC
            </div>
            <div
              style={{
                fontSize: 84,
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-2px',
                lineHeight: 1,
              }}
            >
              NDT Connect
            </div>
          </div>

          <div
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '40px',
              maxWidth: 1000,
              lineHeight: 1.3,
            }}
          >
            Free NDT tools + provider marketplace
          </div>

          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontSize: 20,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <span>Equipment registry</span>
            <span>·</span>
            <span>Calibration alerts</span>
            <span>·</span>
            <span>Certificate vault</span>
          </div>

          <div
            style={{
              marginTop: '50px',
              fontSize: 18,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            ndt-connect.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
