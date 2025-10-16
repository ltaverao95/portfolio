import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { GoogleTagManager } from "@next/third-parties/google";

import { Toaster } from "@/components/ui/toaster";
import { AppHeader } from "@/components/app-header";
import { AppFooter } from "@/components/app-footer";
import { LanguageProvider } from "@/context/language-context";
import { ThemeProvider } from "@/context/theme-context";
import { AuthProvider } from "@/context/auth-context";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://taveralabs.com"),
  title: {
    template: "%s | Luis Felipe Tavera Orozco",
    default: "Home | Luis Felipe Tavera Orozco", // Fallback title
  },

  description:
    "Luis Felipe Tavera Orozco portfolio, Software Engineer with more than 8 years of experience. Expert in developing scalable applications with .Net, React, Angular, clean architectures, and SOLID principles.",
  keywords:
    "Software Engineer, .Net, React, Angular, Freelance, Portfolio, Luis Felipe Tavera Orozco",
  authors: [{ name: "Luis Felipe Tavera Orozco" }],
  openGraph: {
    title: "Luis Felipe Tavera Orozco - Software Engineer",
    description: "Luis Felipe Tavera Orozco portfolio, Software Engineer with more than 8 years of experience. Expert in developing scalable applications with .Net, React, Angular, clean architectures, and SOLID principles.",
    url: "https://taveralabs.com",
    siteName: "Luis Felipe Tavera Orozco",
    images: [{ url: "/assets/Logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Felipe Tavera Orozco - Software Engineer",
    description:
      "Luis Felipe Tavera Orozco portfolio, Software Engineer with more than 8 years of experience. Expert in developing scalable applications with .Net, React, Angular, clean architectures, and SOLID principles.",
    images: ["/assets/Logo.png"],
    creator: "@taveralabs",
  },
  icons: {
    icon: "/assets/Logo.png",
    shortcut: "/assets/Logo.png",
    apple: "/assets/Logo.png",
  },
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
        <link rel="canonical" href="https://taveralabs.com" />
      </head>
      <body className="font-body antialiased selection:bg-accent selection:text-accent-foreground">
        <SpeedInsights />
        <Analytics />
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <div className="flex flex-col min-h-screen">
                <AppHeader />
                <main className="flex-grow">{children}</main>
                <AppFooter />
              </div>
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID as string} />
      </body>
    </html>
  );
}
