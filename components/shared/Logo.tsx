import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="150"
      height="38"
      aria-label="NDT Connect Logo"
      {...props}
    >
      <rect width="200" height="50" fill="transparent" />
      <text
        x="10"
        y="35"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="hsl(var(--primary))"
      >
        NDT
      </text>
      <text
        x="80"
        y="35"
        fontFamily="var(--font-geist-sans), Arial, sans-serif"
        fontSize="30"
        fill="hsl(var(--foreground))"
      >
        Connect
      </text>
      <path 
        d="M 5 45 Q 50 40 95 45" 
        stroke="hsl(var(--accent))" 
        fill="none" 
        strokeWidth="2" 
      />
    </svg>
  );
}
