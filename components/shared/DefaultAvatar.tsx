"use client";

interface DefaultAvatarProps {
  name?: string;
  imageUrl?: string;
  size?: number;
  className?: string;
}

export function DefaultAvatar({ name, imageUrl, size = 40, className = '' }: DefaultAvatarProps) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={name || 'Profile'}
        width={size}
        height={size}
        className={`rounded-full object-cover ${className}`}
        style={{ width: size, height: size }}
      />
    );
  }

  // Default blank human silhouette SVG
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`rounded-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="50" fill="#E5E7EB" />
      <circle cx="50" cy="38" r="16" fill="#9CA3AF" />
      <ellipse cx="50" cy="78" rx="28" ry="20" fill="#9CA3AF" />
    </svg>
  );
}
