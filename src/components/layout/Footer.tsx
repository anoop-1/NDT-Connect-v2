// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NDT Connect. All rights reserved.</p>
        <p className="mt-1">Connecting NDT Professionals and Clients Seamlessly.</p>
      </div>
    </footer>
  );
}
