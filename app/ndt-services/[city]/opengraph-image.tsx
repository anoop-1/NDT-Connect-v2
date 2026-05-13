import { ImageResponse } from 'next/og';
import { CITIES, findPublishableCity } from '@/data/cities';

export const runtime = 'edge';
export const alt = 'NDT Connect';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

interface Params {
  params: { city: string };
}

export default async function Image({ params }: Params) {
  const slug = params?.city;
  const city = findPublishableCity(slug) ?? CITIES.find((c) => c.slug === slug);

  const heading = city
    ? `NDT Services in ${city.name}, ${city.state}`
    : 'NDT Services';
  const subline = city
    ? `${city.industries.length}+ industries · ${city.namedFacilities.length}+ facilities · ASNT-certified`
    : 'Free NDT tools + provider marketplace';

  return new ImageResponse(
    (
      <div
        style={{
          background: '#003680',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '80px',
          position: 'relative',
        }}
      >
        {/* Subtle grid overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            display: 'flex',
          }}
        />

        {/* Brand row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '40px',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: 'white',
              color: '#003680',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: '-1px',
            }}
          >
            NC
          </div>
          <div
            style={{
              color: 'white',
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            NDT Connect
          </div>
        </div>

        {/* Heading */}
        <div
          style={{
            fontSize: 76,
            fontWeight: 800,
            color: 'white',
            letterSpacing: '-2px',
            lineHeight: 1.05,
            marginBottom: '24px',
            maxWidth: 1000,
            display: 'flex',
          }}
        >
          {heading}
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 30,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 1000,
            display: 'flex',
          }}
        >
          {subline}
        </div>

        {/* Footer */}
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 18,
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          <span>ndt-connect.com</span>
          <span>Verified providers</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
