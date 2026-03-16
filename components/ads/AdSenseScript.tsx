import Script from 'next/script';

export const AdSenseScript = () => {
  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4713278078667871"
      strategy="afterInteractive"
      crossOrigin="anonymous"
    />
  );
};

export default AdSenseScript;
