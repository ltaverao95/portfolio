import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from '@/components/app-header';
import { AppFooter } from '@/components/app-footer';
import { LanguageProvider } from '@/context/language-context';

export const metadata: Metadata = {
  title: 'Luis Felipe Tavera Orozco - Ingeniero de Software Senior (.Net, React, Angular)',
  description: 'Portfolio de Luis Felipe Tavera Orozco, Ingeniero de Software con más de 8 años de experiencia. Experto en desarrollo de aplicaciones escalables con .Net, React, Angular, arquitecturas limpias y principios SOLID.',
  keywords: 'Software Engineer, .Net, React, Angular, Freelance, Portfolio, Luis Felipe Tavera Orozco',
  authors: [{ name: 'Luis Felipe Tavera Orozco' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-accent-foreground">
        <LanguageProvider>
          <AppHeader />
          <main>{children}</main>
          <AppFooter />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}