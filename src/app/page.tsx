"use client";

import React from "react";
import {
  Shield,
  Scroll,
  Users,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Menu,
  X,
  ChevronRight,
  Star,
  Zap,
  Award,
} from "lucide-react";

/* --------------------------------------------------------------------------
   Logo de marca (reemplazar src con los archivos reales de public/)
   -------------------------------------------------------------------------- */
function BrandLogo({
  size = 56,
  className,
}: {
  size?: number;
  className?: string;
}) {
  // Placeholder: cuadrado estilo branding. Reemplazar con <img src="/wukong-logo.png" />
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "18px",
        background:
          "linear-gradient(135deg, #fb2c30 0%, #a10012 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 800,
        fontSize: size * 0.36,
        color: "#fff",
        boxShadow: "0 8px 24px rgba(251,44,48,0.35)",
        letterSpacing: "-0.02em",
      }}
      aria-label="Logo Wukong"
    >
      WUK
    </div>
  );
}

/* --------------------------------------------------------------------------
   Placeholder de foto de entrenador (reemplazar con img real)
   -------------------------------------------------------------------------- */
function TrainerAvatar({ initials, className }: { initials: string; className?: string }) {
  return (
    <div
      className={className}
      style={{
        width: 88,
        height: 88,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)",
        border: "2px solid rgba(251,44,48,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: 700,
        color: "#fff",
        boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
      }}
      aria-label={`Foto de ${initials}`}
    >
      {initials}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Placeholder galería (reemplazar con imagenes reales)
   -------------------------------------------------------------------------- */
function GalleryImage({ label }: { label: string }) {
  return (
    <div
      className="w-full h-48 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center"
      aria-label={label}
    >
      <span className="text-zinc-500 text-sm font-medium tracking-wide">
        {label}
      </span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Menú hamburguesa móvil
   -------------------------------------------------------------------------- */
function MobileMenu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />
      {/* panel */}
      <nav
        className={`absolute right-4 top-16 w-72 max-h-[70vh] overflow-y-auto rounded-3xl bg-[#0f0f12] border border-white/10 p-6 shadow-2xl transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menú principal"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <BrandLogo size={32} />
            <span className="text-lg font-black tracking-widest uppercase">Wukong</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-1">
          <MobileNavLink
            href="#inicio"
            onClick={() => setOpen(false)}
            label="Inicio"
            icon={Scroll}
          />
          <MobileNavLink
            href="#sobre"
            onClick={() => setOpen(false)}
            label="Sobre el Lugar"
            icon={Shield}
          />
          <MobileNavLink
            href="#entrenadores"
            onClick={() => setOpen(false)}
            label="Entrenadores"
            icon={Users}
          />
          <MobileNavLink
            href="#comentarios"
            onClick={() => setOpen(false)}
            label="Comentarios"
            icon={Star}
          />
          <MobileNavLink
            href="#noticias"
            onClick={() => setOpen(false)}
            label="Noticias"
            icon={Zap}
          />
          <MobileNavLink
            href="#contacto"
            onClick={() => setOpen(false)}
            label="Contacto"
            icon={Mail}
          />
        </div>

        <div className="mt-8 pt-6 border-t border-white/5">
          <p className="text-xs text-zinc-500 mb-3 font-medium uppercase tracking-wider">
            Acceso rapido
          </p>
          <div className="flex flex-col gap-2">
            <LinkButton href="/auth/login" variant="ghost">
              <Phone className="w-4 h-4 mr-2" />
              Ingresar
            </LinkButton>
            <LinkButton href="/auth/register" variant="solid">
              <Award className="w-4 h-4 mr-2" />
              Registrarse
              <ChevronRight className="w-4 h-4 ml-2" />
            </LinkButton>
          </div>
        </div>
      </nav>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Link helper (SPA sin reload, estilo coherente)
   -------------------------------------------------------------------------- */
function LinkButton({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost";
}) {
  const isSolid = variant === "solid";
  return (
    <a
      href={href}
      className={`flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wider transition-all active:scale-95 ${
        isSolid
          ? "bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-900/20"
          : "text-zinc-300 hover:text-white hover:bg-white/5"
      }`}
    >
      {children}
    </a>
  );
}

function MobileNavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
    >
      <Icon className="w-4 h-4" />
      {label}
    </a>
  );
}

/* --------------------------------------------------------------------------
   Sección: Splash / Bienvenida
   -------------------------------------------------------------------------- */
function SplashSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[88vh] flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* fondo degradado sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-[#08080A] to-[#08080A] pointer-events-none" />
      {/* decoración de esquinas */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-red-600/40 rounded-none pointer-events-none" />
      <div className="absolute bottom-8 right-8 w-32 h-32 border-b-2 border-r-2 border-red-600/20 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        {/* logo grande */}
        <div className="mb-8 flex items-center gap-6">
          <BrandLogo size={96} />
          <div className="space-y-2">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight uppercase leading-none bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              Wukong
            </h1>
            <p className="text-sm font-bold tracking-[0.3em] uppercase text-red-500">
              Artes Marciales
            </p>
          </div>
        </div>

        <p className="text-zinc-400 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
          Entrenamiento en Karate, Boxeo, MMA y más. Disciplina, técnica y
          comunidad en un solo lugar.
        </p>

        {/* CTA de inscripción (no WhatsApp — registro) */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/auth/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-red-900/30 hover:bg-red-700 active:scale-95 transition-all"
          >
            <Award className="w-5 h-5" />
            Inscribirse
            <ChevronRight className="w-4 h-4" />
          </a>
          <a
            href="/auth/login"
            className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border border-white/20 text-zinc-300 font-bold text-sm uppercase tracking-widest rounded-2xl hover:border-white/40 hover:text-white transition-all"
          >
            <Phone className="w-5 h-5" />
            Ingresar
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sección: Sobre el Lugar (galería + descripción)
   -------------------------------------------------------------------------- */
function SobreLugarSection() {
  return (
    <section
      id="sobre"
      className="relative py-24 px-4"
      aria-labelledby="sobre-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-3 block">
            Conoce el Dojo
          </span>
          <h2
            id="sobre-heading"
            className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase"
          >
            Sobre el Lugar
          </h2>
          <div className="w-24 h-1 bg-red-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* galería */}
          <div className="grid grid-cols-2 gap-3">
            <GalleryImage label="Entrenamiento general" />
            <GalleryImage label="Cancha de MMA" />
            <GalleryImage label="Clases de Karate" />
            <GalleryImage label="Evento comunitario" />
          </div>

          {/* descripción */}
          <div className="space-y-6">
            <p className="text-zinc-300 text-lg leading-relaxed">
              Un espacio diseñado para quienes buscan desarrollar técnica,
              disciplina y mentalidad competitiva en un ambiente de respeto y
              acompañamiento.
            </p>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Instalaciones equipadas con tatamis, ring de boxeo, ring de MMA y
              zonas de recuperación. Clases para diferentes niveles y edades,
              con programas estructurados por disciplina.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <FeatureBadge icon={Shield} text="Entrenamiento técnico" />
              <FeatureBadge icon={Users} text="Clases grupales y particulares" />
              <FeatureBadge icon={Calendar} text="Horarios flexibles" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Badge de feature pequeño
   -------------------------------------------------------------------------- */
function FeatureBadge({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
      <Icon className="w-4 h-4 text-red-500" />
      <span className="text-sm font-medium text-zinc-300">{text}</span>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Sección: Entrenadores (tarjetas con placeholder)
   -------------------------------------------------------------------------- */
const TRAINERS = [
  {
    id: 1,
    name: "Nombre Apellido",
    discipline: "Karate Do Shotokan",
    bio: "Responsable de la División de Karate. +10 años de experiencia en enseñanza y formación de instructores.",
  },
  {
    id: 2,
    name: "Nombre Apellido",
    discipline: "Boxeo",
    bio: "Entrenador principal de Boxeo. Especialista en técnica de guantes y estrategia de combate.",
  },
  {
    id: 3,
    name: "Nombre Apellido",
    discipline: "MMA",
    bio: "Ex-fighter con background en artes marciales mixtas. Impulsa la división de MMA y entrenamiento integrado.",
  },
];

function EntrenadoresSection() {
  return (
    <section
      id="entrenadores"
      className="relative py-24 px-4 bg-white/[0.02]"
      aria-labelledby="entrenadores-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-3 block">
            Nuestro Equipo
          </span>
          <h2
            id="entrenadores-heading"
            className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase"
          >
            Entrenadores
          </h2>
          <div className="w-24 h-1 bg-red-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TRAINERS.map((trainer) => (
            <article
              key={trainer.id}
              className="group relative rounded-3xl bg-zinc-900/40 border border-white/5 p-6 flex flex-col items-center text-center hover:border-red-900/30 transition-all duration-300"
            >
              {/* placeholder avatar */}
              <TrainerAvatar initials={trainer.name.split(" ").map((w) => w[0]).join("")} />

              <div className="mt-5 space-y-1.5">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  {trainer.name}
                </h3>
                <p className="text-xs font-bold tracking-widest text-red-500 uppercase">
                  {trainer.discipline}
                </p>
              </div>

              <p className="text-sm text-zinc-400 mt-3 leading-relaxed flex-1">
                {trainer.bio}
              </p>

              {/* botón de contacto (puede apuntar a WhatsApp o formulario después) */}
              <button
                className="mt-5 px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-white/30 transition-all uppercase tracking-wider flex items-center gap-2"
                aria-label={`Contactar a ${trainer.name}`}
              >
                <Mail className="w-3.5 h-3.5" />
                Contactar
              </button>
            </article>
          ))}
        </div>

        {/* placeholder para más entrenadores */}
        <p className="text-center text-zinc-500 text-sm mt-8 border-t border-white/5 pt-8">
          + instructores disponibles según disciplina. Contáctenos para más info.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sección: Comentarios
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Alumno X",
    discipline: "Karate",
    text: "Ambiente excelente, los instructores ponen mucha dedicación. Noté mejora desde los primeros meses.",
    rating: 5,
  },
  {
    id: 2,
    name: "Alumno Y",
    discipline: "Boxeo",
    text: "El entrenamiento es muy completo. Me ayudó a mejorar mi condición física y confianza.",
    rating: 5,
  },
];

function ComentariosSection() {
  return (
    <section
      id="comentarios"
      className="relative py-24 px-4"
      aria-labelledby="comentarios-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-3 block">
            Opiniones
          </span>
          <h2
            id="comentarios-heading"
            className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase"
          >
            Comentarios
          </h2>
          <div className="w-24 h-1 bg-red-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="space-y-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex gap-4 p-5 rounded-2xl bg-zinc-900/30 border border-white/5"
            >
              {/* avatar placeholder */}
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 flex-shrink-0 flex items-center justify-center font-bold text-sm text-zinc-400">
                {t.name[0]}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm uppercase tracking-tight">
                    {t.name}
                  </h4>
                  <span className="text-xs text-zinc-500">{t.discipline}</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-8 border-t border-white/5 pt-8">
          ¿Querés dejar tu opinión? Contanos tu experiencia.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sección: Noticias (oculta dinámicamente si no hay noticias)
   -------------------------------------------------------------------------- */
const NEWS: { id: number; title: string; date: string; kicker: string }[] = [
  {
    id: 1,
    title: "Cierre por feriado nacional",
    date: "12 de noviembre",
    kicker: "Aviso",
  },
  {
    id: 2,
    title: "Examen de grado — Karate",
    date: "20 de noviembre",
    kicker: "Evento",
  },
];

function NoticiasSection() {
  const hasNews = NEWS.length > 0;

  return (
    <section
      id="noticias"
      className={`relative py-24 px-4 bg-white/[0.02] ${
        hasNews ? "block" : "hidden"
      }`}
      aria-labelledby="noticias-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <Zap className="w-6 h-6 text-red-500" />
          <h2
            id="noticias-heading"
            className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase"
          >
            Información Importante
          </h2>
        </div>

        <div className="space-y-4">
          {NEWS.map((news) => (
            <article
              key={news.id}
              className="flex gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-red-900/20"
            >
              <div className="mt-1">
                <span className="text-xs font-bold tracking-widest text-red-500 uppercase">
                  {news.kicker}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-white text-lg uppercase tracking-tight">
                  {news.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1 font-mono">{news.date}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-xs mt-8">
          No hay avisos activos en este momento.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sección: Contacto + redes
   -------------------------------------------------------------------------- */
function ContactoSection() {
  return (
    <section
      id="contacto"
      className="relative py-24 px-4"
      aria-labelledby="contacto-heading"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-3 block">
            Contacto
          </span>
          <h2
            id="contacto-heading"
            className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase"
          >
            Contacto
          </h2>
          <div className="w-24 h-1 bg-red-600 rounded-full mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* redes + ubicación */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Redes Sociales
              </h3>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com/wukong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-red-500 hover:border-red-900/30 transition-all"
                  aria-label="Instagram Wukong"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.844 0 3.204-.012 3.584-.069 4.844-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.844-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.844 0-3.204.013-3.584.07-4.844.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.844-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.667.072 4.947.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.667-.014 4.947-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" fill="currentColor"/></svg>
                </a>
                <a
                  href="https://facebook.com/wukong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-red-500 hover:border-red-900/30 transition-all"
                  aria-label="Facebook Wukong"
                >
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.9 10.125-5.864 10.125-11.854z"/></svg>
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Ubicación
              </h3>
              <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-zinc-300">Dirección a completar</p>
                    <p className="text-xs text-zinc-500 mt-1">Ver en Google Maps</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-red-500 hover:underline uppercase tracking-wider"
                >
                  <MapPin className="w-3 h-3" />
                  Abrir mapa
                </a>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Contacto directo
              </h3>
              <div className="space-y-3">
                <a
                  href="tel:+5491100000000"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-zinc-300">Teléfono a completar</span>
                </a>
                <a
                  href="mailto:info@wukong.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all"
                >
                  <Mail className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-zinc-300">info@wukong.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* CTA inscripción */}
          <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-red-950/40 to-[#08080A] border border-red-900/20 p-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-900/30 flex items-center justify-center">
                <Award className="w-6 h-6 text-red-500" />
              </div>
            </div>
            <p className="text-center text-zinc-300 text-sm mb-2">
              ¿Querés ser parte del Dojo?
            </p>
            <h3 className="text-xl font-black text-white uppercase text-center mb-6">
              Inscribite ahora
            </h3>
            <a
              href="/auth/register"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all"
            >
              Comenzar inscripción
              <ChevronRight className="w-4 h-4" />
            </a>
            <p className="text-center text-zinc-500 text-xs mt-4">
              El formulario de registro guía paso a paso: datos básicos, disciplina
              y modalidad.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Footer
   -------------------------------------------------------------------------- */
function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-white/5 bg-[#08080A]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BrandLogo size={32} />
          <span className="text-sm font-black tracking-widest uppercase text-zinc-500">
            Wukong Artes Marciales
          </span>
        </div>
        <p className="text-xs text-zinc-600">
          2026 Wukong. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------------------
   Navegación principal (desktop + tablet)
   -------------------------------------------------------------------------- */
function HeaderNav() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const navLinks = [
    { href: "#inicio", label: "Inicio", icon: Scroll },
    { href: "#sobre", label: "Sobre el Lugar", icon: Shield },
    { href: "#entrenadores", label: "Entrenadores", icon: Users },
    { href: "#comentarios", label: "Comentarios", icon: Star },
    { href: "#noticias", label: "Noticias", icon: Zap },
    { href: "#contacto", label: "Contacto", icon: Mail },
  ];

  return (
    <>
      {/* nav desktop */}
      <header className="sticky top-0 z-40 bg-[#08080A]/80 backdrop-blur-xl border-b border-white/5">
        <nav
          className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between"
          aria-label="Navegación principal"
          onClick={(e) => {
            const target = (e.target as HTMLElement).closest("a")?.getAttribute("href");
            if (target?.startsWith("#")) {
              setMobileOpen(false);
            }
          }}
        >
          <a href="/" className="flex items-center gap-3 group" aria-label="Inicio">
            <BrandLogo size={40} />
            <span className="text-lg font-black tracking-widest uppercase text-white group-hover:text-red-400 transition-colors">
              Wukong
            </span>
          </a>

          {/* links desktop */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* acciones login/registro */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="/auth/login"
              className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white transition-all"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              Ingresar
            </a>
            <a
              href="/auth/register"
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-900/20"
            >
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Registrarse
            </a>
          </div>

          {/* hamburguesa móvil */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} setOpen={setMobileOpen} />
    </>
  );
}

/* --------------------------------------------------------------------------
   Página principal (Landing)
   -------------------------------------------------------------------------- */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08080A] text-white flex flex-col">
      <HeaderNav />
      <main>
        <SplashSection />
        <SobreLugarSection />
        <EntrenadoresSection />
        <ComentariosSection />
        <NoticiasSection />
        <ContactoSection />
      </main>
      <Footer />
    </div>
  );
}
