import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wukong | Academia de Artes Marciales",
  description:
    "Entrenamiento en Karate, Boxeo, MMA y más. Dojo Wukong: disciplina, técnica y comunidad.",
  keywords: ["artes marciales", "karate", "boxeo", "MMA", "dojo", "entrenamiento"],
  authors: [{ name: "Wukong" }],
  openGraph: {
    title: "Wukong | Academia de Artes Marciales",
    description:
      "Entrenamiento en Karate, Boxeo, MMA y más. Dojo Wukong: disciplina, técnica y comunidad.",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Wukong" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wukong | Academia de Artes Marciales",
    description:
      "Entrenamiento en Karate, Boxeo, MMA y más. Dojo Wukong: disciplina, técnica y comunidad.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        {/* Apple touch icon placeholder — reemplazar con logo real */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#08080A] text-white">
        {children}
      </body>
    </html>
  );
}
