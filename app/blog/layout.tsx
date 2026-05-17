// Per-post BreadcrumbList schema lives on each blog page (Home > Blog > Post Title).
// The layout-level partial was removed so each post emits the full canonical
// breadcrumb chain rather than a stub that competes with it in SERPs.
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
