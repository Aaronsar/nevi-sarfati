import type { Metadata } from "next";
import { Cormorant_Garamond, Noto_Serif_Hebrew } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const notoHebrew = Noto_Serif_Hebrew({
  variable: "--font-noto-hebrew",
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nevi-sarfati.fr"),
  title: "Pidyon Haben de Névi Baroukh Sarfati",
  description:
    "Vous êtes invités au Pidyon Haben de Névi Baroukh Sarfati — Mercredi 8 juillet, à partir de 20h, 10 rue de Groslay, Montmorency.",
  openGraph: {
    title: "Pidyon Haben de Névi Baroukh Sarfati",
    description:
      "Mercredi 8 juillet · À partir de 20h · 10 rue de Groslay, Montmorency",
    siteName: "nevi-sarfati.fr",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/baby.png", width: 800, height: 1200, alt: "Névi Baroukh Sarfati" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${notoHebrew.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
