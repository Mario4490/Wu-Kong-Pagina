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
  metadataBase: new URL('https://wu-kong-pagina.vercel.app'),
  title: "Wukong & Aquiles | Academia de Artes Marciales en Puerto Iguazú",
  description:
    "El centro de entrenamiento de Artes Marciales más completo en Puerto Iguazú. Clases de Boxeo, Jiu Jitsu y MMA para todos los niveles con Mestre Diego y Marcos García.",
  keywords: ["artes marciales", "boxeo", "jiu jitsu", "MMA", "Wukong", "Aquiles", "Puerto Iguazú", "Misiones", "entrenamiento", "defensa personal", "academia"],
  authors: [{ name: "Wukong & Aquiles Academy" }],
  openGraph: {
    title: "Wukong & Aquiles | Academia de Artes Marciales",
    description:
      "Entrenamiento avanzado en Boxeo, Jiu Jitsu y MMA en Puerto Iguazú. Forjá tu disciplina con los mejores.",
    type: "website",
    locale: "es_AR",
    url: "https://wu-kong-pagina.vercel.app",
    siteName: "Wukong & Aquiles Academy",
    images: [{ url: "/hero-dojo.jpg", width: 1200, height: 630, alt: "Dojo Wukong y Aquiles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wukong & Aquiles | Academia de Artes Marciales",
    description:
      "Forjá tu disciplina con los mejores entrenadores de Boxeo, Jiu Jitsu y MMA en Puerto Iguazú.",
    images: ["/hero-dojo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
