import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getNavigationSettings } from "@/lib/cms";
import { buildAlternates } from "@/lib/seo";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Elektro-Tel | Elektroinstallationen & Telekommunikation",
  description: "Elektro-Tel: Elektroinstallationen und Telekommunikation in Winterthur, Tägerwilen und Schaffhausen. Professionell, zuverlässig, nah.",
  metadataBase: new URL('https://elektro-tel.ch'),
  alternates: buildAlternates('/'),
  openGraph: {
    title: "Elektro-Tel | Ihr Partner für Elektro und Telekommunikation",
    description: "Ihr Experte für Elektroinstallationen und Telekommunikation in Winterthur, Tägerwilen und Schaffhausen.",
    url: 'https://elektro-tel.ch',
    siteName: 'Elektro-Tel AG',
    locale: 'de_CH',
    type: 'website',
    images: [
      {
        url: 'https://elektro-tel.ch/images/smart-home-elektroinstallation-gebaeudeautomation-elektro-tel-schweiz.webp',
        width: 1200,
        height: 630,
        alt: 'Elektro-Tel AG - Elektroinstallation und Gebäudeautomation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elektro-Tel | Ihr Partner für Elektro und Telekommunikation",
    description: "Ihr Experte für Elektroinstallationen und Telekommunikation in Winterthur, Tägerwilen und Schaffhausen.",
    images: ['https://elektro-tel.ch/images/smart-home-elektroinstallation-gebaeudeautomation-elektro-tel-schweiz.webp'],
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch navigation settings from CMS
  const navigationSettings = getNavigationSettings();

  return (
    <html lang="de">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col font-sans`}>
        <JsonLd />
        <Header headerMenu={navigationSettings?.headerMenu} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer footerMenu={navigationSettings?.footerMenu} />
      </body>
    </html>
  );
}
