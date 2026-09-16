import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wukong | Academia de Artes Marciales",
  description:
    "Entrenamiento en Karate, Boxeo, MMA y más. Dojo Wukong: disciplina, técnica y comunidad en Buenos Aires.",
  keywords: ["artes marciales", "karate", "boxeo", "MMA", "dojo", "entrenamiento", "Buenos Aires"],
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
    <html lang="es" className={`${inter.variable} ${bebasNeue.variable} h-full`}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-full flex flex-col bg-[#08080A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
