'use client';

import { AdSense } from './AdSense';

type AdPosition = 'header' | 'sidebar' | 'in-content' | 'footer' | 'anchor';

interface AdPlacementProps {
  position: AdPosition;
  className?: string;
  slot?: string;
}

const adConfigurations: Record<AdPosition, { slot: string; format: 'auto' | 'rectangle' | 'horizontal' | 'vertical'; containerClass: string }> = {
  header: {
    slot: '1234567890',
    format: 'horizontal',
    containerClass: 'my-4 flex justify-center',
  },
  sidebar: {
    slot: '1234567891',
    format: 'rectangle',
    containerClass: 'sticky top-4 mb-6',
  },
  'in-content': {
    slot: '1234567892',
    format: 'auto',
    containerClass: 'my-6 flex justify-center',
  },
  footer: {
    slot: '1234567893',
    format: 'horizontal',
    containerClass: 'mt-8 flex justify-center',
  },
  anchor: {
    slot: '1234567894',
    format: 'auto',
    containerClass: 'fixed bottom-0 left-0 right-0',
  },
};

export const AdPlacement = ({ position, className = '', slot }: AdPlacementProps) => {
  const config = adConfigurations[position];
  const adSlot = slot || config.slot;

  return (
    <div className={`${config.containerClass} ${className}`}>
      <AdSense slot={adSlot} format={config.format} />
    </div>
  );
};

export default AdPlacement;
