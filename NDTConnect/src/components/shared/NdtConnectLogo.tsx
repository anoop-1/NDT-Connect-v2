// src/components/shared/NdtConnectLogo.tsx
//
// SVG re-creation of the NDT Connect mark — globe + wordmark.
// Renders cleanly at any size, supports a `variant` prop so the same
// component drops onto white backgrounds (color variant) or dark/blue
// backgrounds (white variant).
//
// Use:
//   <NdtConnectLogo variant="color" height={48} />     // marketing pages
//   <NdtConnectLogo variant="white" height={64} showWordmark />  // login hero
//
// The artwork is intentionally simple so it stays crisp at favicon sizes.

import * as React from "react";

interface Props {
  variant?: "color" | "white";
  height?: number;
  showWordmark?: boolean;
  className?: string;
  ariaLabel?: string;
}

const BRAND_BLUE = "#004AAD";

export function NdtConnectLogo({
  variant = "color",
  height = 48,
  showWordmark = true,
  className,
  ariaLabel = "NDT Connect",
}: Props) {
  const stroke = variant === "white" ? "#FFFFFF" : BRAND_BLUE;
  const text = variant === "white" ? "#FFFFFF" : BRAND_BLUE;
  const subtext = variant === "white" ? "#FFFFFF" : BRAND_BLUE;
  const width = showWordmark ? height * 3.4 : height;

  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={width}
      height={height}
      viewBox={`0 0 ${showWordmark ? 340 : 100} 100`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Globe — outer circle */}
      <g fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round">
        <circle cx="50" cy="50" r="40" />
        {/* Equator */}
        <line x1="10" y1="50" x2="90" y2="50" />
        {/* Latitudes */}
        <ellipse cx="50" cy="50" rx="40" ry="14" />
        <ellipse cx="50" cy="50" rx="40" ry="28" />
        {/* Longitudes */}
        <ellipse cx="50" cy="50" rx="14" ry="40" />
        <ellipse cx="50" cy="50" rx="28" ry="40" />
        {/* Polar axis */}
        <line x1="50" y1="10" x2="50" y2="90" />
      </g>

      {showWordmark && (
        <g fontFamily="Arial, Helvetica, sans-serif" fontWeight="800">
          <text x="115" y="55" fontSize="42" fill={text} letterSpacing="2">
            NDT
          </text>
          <text x="115" y="86" fontSize="24" fill={subtext} letterSpacing="1">
            Connect
          </text>
        </g>
      )}
    </svg>
  );
}
