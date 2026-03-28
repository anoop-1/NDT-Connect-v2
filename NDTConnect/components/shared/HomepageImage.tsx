// src/components/shared/HomepageImage.tsx
"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

const DEFAULT_HOMEPAGE_IMAGE = "https://images.unsplash.com/photo-1632395627760-72e6eca7f9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxN3x8ZWFydGh8ZW58MHx8fHwxNzQ4NDM3Mjc0fDA&ixlib=rb-4.1.0&q=80&w=1080";

export function HomepageImage() {
  const [imageSrc, setImageSrc] = useState(DEFAULT_HOMEPAGE_IMAGE);

  useEffect(() => {
    const fetchHomepageImage = async () => {
      try {
        const response = await fetch('/api/systemwide');
        if (response.ok) {
          const { data } = await response.json();
          const homepageImage = data?.find((n: any) => n.id === 'homepage_image');
          if (homepageImage) {
            setImageSrc(`data:image/jpeg;base64,${homepageImage.data}`);
          }
        }
      } catch (error: any) {
        console.error('Failed to fetch homepage image:', error);
      }
    };

    fetchHomepageImage();
  }, []);

  return (
    <Image
      src={imageSrc}
      alt="NDT Connect - The leading marketplace for non-destructive testing services worldwide"
      width={700}
      height={450}
      className="rounded-lg shadow-xl object-cover"
      priority
    />
  );
}
