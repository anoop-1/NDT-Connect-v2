'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
}

declare global {
  var adsbygoogle: Array<any>;
}

export const AdSense = ({ slot, format = 'auto', className = '' }: AdSenseProps) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: 'ca-pub-4713278078667871',
        adsbygoogle: true,
      });
    } catch (err: any) {
      console.error('AdSense error:', err);
    }
  }, []);

  const getAdDimensions = () => {
    switch (format) {
      case 'rectangle':
        return { width: 300, height: 250 };
      case 'horizontal':
        return { width: 728, height: 90 };
      case 'vertical':
        return { width: 300, height: 600 };
      default:
        return { width: 'auto', height: 'auto' };
    }
  };

  const dimensions = getAdDimensions();

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        width: typeof dimensions.width === 'number' ? `${dimensions.width}px` : 'auto',
        height: typeof dimensions.height === 'number' ? `${dimensions.height}px` : 'auto',
      }}
      data-ad-client="ca-pub-4713278078667871"
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
};

export default AdSense;
