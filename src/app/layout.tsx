import type { Metadata } from "next";
import { Fredoka, Noto_Serif_Hebrew } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoHebrew = Noto_Serif_Hebrew({
  variable: "--font-noto-hebrew",
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nevi-sarfati.fr"),
  title: "Pydion de Névi Sarfati — Les Névitubbies vous invitent !",
  description:
    "Aaron, Néorah et les Névitubbies vous invitent au Pydion de Névi — Mercredi 8 juillet à 20h, Montmorency.",
  openGraph: {
    title: "Pydion de Névi Sarfati",
    description: "Mercredi 8 juillet · 20h · Montmorency",
    siteName: "nevi-sarfati.fr",
    locale: "fr_FR",
    type: "website",
    images: [{ url: "/images/nevitubbies.png", width: 800, height: 600, alt: "Les Névitubbies" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${fredoka.variable} ${notoHebrew.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
