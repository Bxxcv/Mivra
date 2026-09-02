import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Mivra — Satu link. Seluruh bisnismu.',
    template: '%s · Mivra',
  },
  description:
    'Mivra adalah platform all-in-one untuk kreator dan bisnis digital — link-in-bio, katalog produk, gallery, checkout, dan analitik dalam satu halaman.',
  // Domain custom belum final (rencana: beli lewat Vercel). Sampai saat itu,
  // set NEXT_PUBLIC_SITE_URL di .env — fallback ke URL preview Vercel otomatis.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  ),
  openGraph: {
    title: 'Mivra — Satu link. Seluruh bisnismu.',
    description:
      'Link-in-bio, katalog produk, gallery, dan checkout dalam satu halaman.',
    siteName: 'Mivra',
    locale: 'id_ID',
    type: 'website',
  },
  icons: {
    icon: '/mascot/mascot-main.webp',
    apple: '/mascot/mascot-main.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
