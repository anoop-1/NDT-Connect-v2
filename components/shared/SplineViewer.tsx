'use client';

import { useEffect, useRef, useState } from 'react';

interface SplineViewerProps {
  scene: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function SplineViewer({ scene, className = '', style }: SplineViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dynamically load the spline-viewer web component
    if (typeof window !== 'undefined' && !customElements.get('spline-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
      script.onload = () => setLoaded(true);
      document.head.appendChild(script);
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return <div className={className} style={style} />;
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {/* @ts-ignore - spline-viewer is a web component */}
      <spline-viewer
        url={scene}
        loading-anim-type="none"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
      />
    </div>
  );
}
