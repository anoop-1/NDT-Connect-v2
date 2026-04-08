import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'NDT Connect - The #1 NDT Inspection Marketplace';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1B3A5C 0%, #004aad 50%, #0066ff 100%)',
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
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
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
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: 'white',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            NDT Connect
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '40px',
              maxWidth: '800px',
            }}
          >
            The #1 Marketplace for Non-Destructive Testing Services
          </div>
          <div
            style={{
              display: 'flex',
              gap: '24px',
              fontSize: 18,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <span>75+ Cities</span>
            <span>\u2022</span>
            <span>12 NDT Methods</span>
            <span>\u2022</span>
            <span>Verified Providers</span>
          </div>
          <div
            style={{
              marginTop: '40px',
              fontSize: 16,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '2px',
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
