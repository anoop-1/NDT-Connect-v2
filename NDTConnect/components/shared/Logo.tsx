import Image from 'next/image';

export function Logo({ size = 'default' }: { size?: 'sm' | 'default' | 'lg' }) {
  const sizeClasses = {
    sm: 'h-16 sm:h-20 lg:h-24',
    default: 'h-20 sm:h-24 md:h-28 lg:h-32',
    lg: 'h-32 sm:h-40 md:h-48 lg:h-56',
  };

  return (
    <Image
      src="/logo.png"
      alt="NDT Connect Logo"
      width={640}
      height={160}
      className={`${sizeClasses[size]} w-auto`}
      priority
    />
  );
}
