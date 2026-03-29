import { BreadcrumbSchema } from '@/components/seo/SchemaMarkup';

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: 'https://ndt-connect.com' },
        { name: 'Blog', url: 'https://ndt-connect.com/blog' },
      ]} />
      {children}
    </>
  );
}
