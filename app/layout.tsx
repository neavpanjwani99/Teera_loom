import type { Metadata } from 'next';
import './globals.css';
import { ArtisanProvider } from '../context/ArtisanContext';

export const metadata: Metadata = {
  title: 'TeraLoom | Vocal for Local Artisan Platform',
  description: 'Empowering Indian Handloom & Handicraft Artisans with AI Photo Cleanup, Vernacular Voice Storytelling, and ONDC Commerce.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,300..900;1,300..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="bg-[#e8dec8]/30 min-h-screen flex justify-center items-start text-on-surface antialiased">
        <ArtisanProvider>
          {/* Main Container Frame: Fits 100% width on mobile, max-w-md (or full desktop width depending on screen) */}
          <div className="w-full max-w-[480px] min-h-screen bg-surface flex flex-col relative shadow-2xl border-x border-outline-variant/30">
            {children}
          </div>
        </ArtisanProvider>
      </body>
    </html>
  );
}
