"use client";

import React, { useState } from "react";
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
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Instagram,
  Facebook,
} from "lucide-react";

/* --------------------------------------------------------------------------
   Logo de marca (reemplazar con img real de public/)
   -------------------------------------------------------------------------- */
function BrandLogo({
  size = 56,
  className,
  glow = true,
}: {
  size?: number;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "20px",
        background: "linear-gradient(135deg, #fb2c30 0%, #a10012 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: size * 0.38,
        color: "#fff",
        letterSpacing: "-0.03em",
        boxShadow: glow
          ? "0 8px 32px rgba(251,44,48,0.45), 0 0 0 1px rgba(251,44,48,0.2)"
          : "none",
        position: "relative",
      }}
      aria-label="Logo Wukong"
    >
      <span style={{ position: "relative", zIndex: 1 }}>WUK</span>
      {glow && (
        <span
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "20px",
            background:
              "linear-gradient(135deg, rgba(251,44,48,0.4) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Placeholder de foto de entrenador
   -------------------------------------------------------------------------- */
function TrainerAvatar({
  initials,
  className,
}: {
  initials: string;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        width: 96,
        height: 96,
        borderRadius: "50%",
        background:
          "linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)",
        border: "2px solid rgba(251,44,48,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 36,
        fontWeight: 700,
        color: "#fff",
        boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
        transition: "transform 0.3s ease",
      }}
      aria-label={`Foto de ${initials}`}
    >
      {initials}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Placeholder galería
   -------------------------------------------------------------------------- */
function GalleryImage({ label }: { label: string }) {
  return (
    <div
      className="w-full h-56 sm:h-64 rounded-2xl bg-zinc-800 border border-white/5 flex items-center justify-center overflow-hidden group"
      aria-label={label}
    >
      <span className="text-zinc-500 text-sm font-medium tracking-wide group-hover:text-zinc-400 transition-colors">
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
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
        onClick={() => setOpen(false)}
      />
      <nav
        className={`absolute right-4 top-20 w-80 max-h-[75vh] overflow-y-auto rounded-3xl bg-[#0f0f12] border border-white/10 p-7 shadow-2xl transition-all duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Menú principal"
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BrandLogo size={36} glow={false} />
            <span className="text-xl font-black tracking-widest uppercase text-white">
              Wukong
            </span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="space-y-1">
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
        </nav>

        <div className="mt-8 pt-6 border-t border-white/10">
          <p className="text-xs text-zinc-500 mb-4 font-medium uppercase tracking-widest">
            Acceso rápido
          </p>
          <div className="flex flex-col gap-3">
            <LinkButton href="/auth/login" variant="ghost">
              <Phone className="w-4 h-4 mr-2" />
              <span className="flex items-center gap-2">
                Ingresar
                <span className="text-zinc-600 text-xs">/login</span>
              </span>
            </LinkButton>
            <LinkButton href="/auth/register" variant="solid">
              <Award className="w-4 h-4 mr-2" />
              <span className="flex items-center gap-2">
                Registrarse
                <ChevronRight className="w-4 h-4" />
              </span>
            </LinkButton>
          </div>
        </div>
      </nav>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Link helper
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
      className={`flex items-center justify-center px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all active:scale-95 ${
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
      <Icon className="w-4 h-4 text-red-500" />
      {label}
    </a>
  );
}

/* --------------------------------------------------------------------------
   Sección: Hero / Splash
   -------------------------------------------------------------------------- */
function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-24 px-4"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/15 via-[#08080A] to-[#08080A] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,44,48,0.12)_0%,transparent_60%)] pointer-events-none" />

      {/* Decoración de bordes */}
      <div className="absolute top-6 left-6 w-28 h-28 border-t-2 border-l-2 border-red-600/50 rounded-none pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-36 h-36 border-b-2 border-r-2 border-red-600/25 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
        {/* Logo + título */}
        <div className="mb-10 flex items-center justify-center gap-8">
          <BrandLogo size={100} />
          <div className="space-y-3">
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-none bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
              Wukong
            </h1>
            <p className="text-base font-black tracking-[0.35em] uppercase text-red-500">
              Artes Marciales
            </p>
          </div>
        </div>

        {/* Subtítulo */}
        <p className="text-zinc-400 text-xl sm:text-2xl max-w-2xl mb-12 leading-relaxed font-light">
          Entrenamiento en Karate, Boxeo, MMA y más. Disciplina, técnica y
          comunidad en un solo lugar.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          <a
            href="/auth/register"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-red-900/30 hover:bg-red-700 hover:shadow-red-900/40 active:scale-95 transition-all duration-200"
          >
            <Award className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>Inscribirse</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/auth/login"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-transparent border border-white/25 text-zinc-300 font-bold text-sm uppercase tracking-widest rounded-2xl hover:border-white/50 hover:text-white transition-all duration-200"
          >
            <Phone className="w-5 h-5 text-red-500" />
            <span>Ingresar</span>
          </a>
        </div>

        {/* Indicadores rápidos */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-zinc-500">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Disciplinas</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Comunidad</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium">Graduaciones</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sección: Sobre el Lugar
   -------------------------------------------------------------------------- */
function SobreLugarSection() {
  return (
    <section
      id="sobre"
      className="relative py-28 px-4 bg-white/[0.015]"
      aria-labelledby="sobre-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-18">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4">
            <Shield className="w-3 h-3" />
            Conoce el Dojo
          </span>
          <h2
            id="sobre-heading"
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-3"
          >
            Sobre el Lugar
          </h2>
          <div className="w-28 h-1 bg-red-600 rounded-full mx-auto mt-5" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Galería */}
          <div className="grid grid-cols-2 gap-4">
            <GalleryImage label="Entrenamiento general" />
            <GalleryImage label="Cancha de MMA" />
            <GalleryImage label="Clases de Karate" />
            <GalleryImage label="Evento comunitario" />
          </div>

          {/* Descripción */}
          <div className="space-y-7">
            <p className="text-zinc-300 text-xl leading-relaxed">
              Un espacio diseñado para quienes buscan desarrollar técnica,
              disciplina y mentalidad competitiva en un ambiente de respeto y
              acompañamiento.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <FeatureCard
                icon={Shield}
                title="Entrenamiento técnico"
                desc="Programas estructurados por nivel y disciplina"
              />
              <FeatureCard
                icon={Users}
                title="Clases grupales"
                desc="Grupos reducidos para atención personalizada"
              />
              <FeatureCard
                icon={Calendar}
                title="Horarios flexibles"
                desc="Mañana, tarde y noche según disponibilidad"
              />
              <FeatureCard
                icon={TrendingUp}
                title="Progreso medible"
                desc="Seguimiento de asistencia y avance técnico"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}) {
  return (
    <div className="p-5 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-red-900/20 transition-all duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-red-600/10 border border-red-900/20">
          <Icon className="w-4 h-4 text-red-500" />
        </div>
        <div>
          <h3 className="font-bold text-white text-sm uppercase tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-zinc-500 mt-1.5">{desc}</p>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Sección: Entrenadores
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
      className="relative py-28 px-4 bg-white/[0.02]"
      aria-labelledby="entrenadores-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-18">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4">
            <Users className="w-3 h-3" />
            Nuestro Equipo
          </span>
          <h2
            id="entrenadores-heading"
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-3"
          >
            Entrenadores
          </h2>
          <div className="w-28 h-1 bg-red-600 rounded-full mx-auto mt-5" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {TRAINERS.map((trainer) => (
            <article
              key={trainer.id}
              className="group relative rounded-3xl bg-zinc-900/40 border border-white/5 p-7 flex flex-col items-center text-center hover:border-red-900/30 hover:shadow-xl hover:shadow-red-900/10 transition-all duration-400"
            >
              {/* Placeholder avatar (reemplazar con img real) */}
              <div className="relative mb-6">
                <TrainerAvatar
                  initials={trainer.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-red-600 border-2 border-[#0f0f12] flex items-center justify-center">
                  <Award className="w-2.5 h-2.5 text-white" />
                </div>
              </div>

              <div className="space-y-1.5 mb-5">
                <h3 className="text-xl font-bold text-white uppercase tracking-tight">
                  {trainer.name}
                </h3>
                <p className="text-xs font-bold tracking-widest text-red-500 uppercase">
                  {trainer.discipline}
                </p>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                {trainer.bio}
              </p>

              <button
                className="mt-6 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-white/30 transition-all uppercase tracking-wider flex items-center gap-2 group/btn"
                aria-label={`Contactar a ${trainer.name}`}
              >
                <Mail className="w-3.5 h-3.5 group-hover/btn:text-red-500 transition-colors" />
                Contactar
              </button>
            </article>
          ))}
        </div>

        <p className="text-center text-zinc-500 text-sm mt-10 border-t border-white/5 pt-8">
          + instructores disponibles según disciplina. Contáctenos para más información.
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
      className="relative py-28 px-4"
      aria-labelledby="comentarios-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-18">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4">
            <Star className="w-3 h-3" />
            Opiniones
          </span>
          <h2
            id="comentarios-heading"
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-3"
          >
            Comentarios
          </h2>
          <div className="w-28 h-1 bg-red-600 rounded-full mx-auto mt-5" />
        </div>

        <div className="space-y-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="flex gap-5 p-6 rounded-2xl bg-zinc-900/30 border border-white/5 hover:border-red-900/15 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-800 border border-white/10 flex-shrink-0 flex items-center justify-center font-bold text-lg text-zinc-400">
                {t.name[0]}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm uppercase tracking-tight">
                    {t.name}
                  </h4>
                  <span className="text-xs text-zinc-500 font-medium">
                    {t.discipline}
                  </span>
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

        <p className="text-center text-zinc-500 text-sm mt-8 border-t border-white/5 pt-6">
          ¿Querés dejar tu opinión? Contanos tu experiencia.
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   Sección: Noticias
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
      className={`relative py-28 px-4 bg-white/[0.015] ${
        hasNews ? "block" : "hidden"
      }`}
      aria-labelledby="noticias-heading"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-14">
          <Zap className="w-6 h-6 text-red-500" />
          <h2
            id="noticias-heading"
            className="text-3xl md:text-4xl font-black tracking-tight text-white uppercase"
          >
            Información Importante
          </h2>
        </div>

        <div className="space-y-4">
          {NEWS.map((news) => (
            <article
              key={news.id}
              className="flex gap-5 p-6 rounded-2xl bg-zinc-900/40 border border-red-900/20 hover:border-red-900/40 transition-all duration-300"
            >
              <div className="mt-1">
                <span className="text-xs font-bold tracking-widest text-red-500 uppercase bg-red-600/10 px-3 py-1 rounded-full">
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
   Sección: Contacto
   -------------------------------------------------------------------------- */
function ContactoSection() {
  return (
    <section
      id="contacto"
      className="relative py-28 px-4"
      aria-labelledby="contacto-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-18">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] uppercase text-red-500 mb-4">
            <Mail className="w-3 h-3" />
            Contacto
          </span>
          <h2
            id="contacto-heading"
            className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase mt-3"
          >
            Contacto
          </h2>
          <div className="w-28 h-1 bg-red-600 rounded-full mx-auto mt-5" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Izquierda: redes + ubicación + contacto */}
          <div className="space-y-8">
            {/* Redes sociales */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Redes Sociales
              </h3>
              <div className="flex items-center gap-5">
                <a
                  href="https://instagram.com/wukong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-red-500 hover:border-red-900/30 hover:shadow-lg hover:shadow-red-900/10 transition-all duration-300"
                  aria-label="Instagram Wukong"
                >
                  <Instagram className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                </a>
                <a
                  href="https://facebook.com/wukong"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-4 rounded-2xl bg-zinc-900/50 border border-white/5 text-zinc-400 hover:text-red-500 hover:border-red-900/30 hover:shadow-lg hover:shadow-red-900/10 transition-all duration-300"
                  aria-label="Facebook Wukong"
                >
                  <Facebook className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Ubicación */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Ubicación
              </h3>
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-lg bg-red-600/10 border border-red-900/20">
                    <MapPin className="w-5 h-5 text-red-500" />
                  </div>
                  <div>
                    <p className="text-white text-base font-medium">Dirección a completar</p>
                    <p className="text-zinc-500 text-sm mt-1">Ver en Google Maps</p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-red-500 hover:text-red-600 hover:underline uppercase tracking-wider transition-colors"
                >
                  <MapPin className="w-3 h-3" />
                  Abrir mapa
                </a>
              </div>
            </div>

            {/* Contacto directo */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-400">
                Contacto directo
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href="tel:+549****0000"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-zinc-300">Teléfono a completar</span>
                </a>
                <a
                  href="mailto:info@wukong.com"
                  className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-300"
                >
                  <Mail className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-zinc-300">info@wukong.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Derecha: CTA inscripción */}
          <div className="flex flex-col justify-center rounded-3xl bg-gradient-to-br from-red-950/40 via-[#08080A] to-[#08080A] border border-red-900/20 p-10">
            <div className="flex items-center justify-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-900/30 flex items-center justify-center">
                <Award className="w-7 h-7 text-red-500" />
              </div>
            </div>
            <p className="text-center text-zinc-400 text-base mb-3">
              ¿Querés ser parte del Dojo?
            </p>
            <h3 className="text-2xl font-black text-white uppercase text-center mb-8">
              Inscribite ahora
            </h3>
            <a
              href="/auth/register"
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-red-900/20 hover:bg-red-700 hover:shadow-red-900/30 transition-all duration-200 active:scale-95"
            >
              <span>Comenzar inscripción</span>
              <ChevronRight className="w-4 h-4" />
            </a>
            <p className="text-center text-zinc-500 text-xs mt-5">
              El formulario de registro guía paso a paso: datos básicos, disciplina y modalidad.
            </p>

            {/* Indicadores RRSS */}
            <div className="mt-8 flex items-center justify-center gap-6 text-zinc-600">
              <span className="text-xs font-medium">Seguí nuestras redes</span>
              <Instagram className="w-4 h-4" />
              <Facebook className="w-4 h-4" />
            </div>
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
    <footer className="py-10 px-4 border-t border-white/5 bg-[#08080A]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <BrandLogo size={36} glow={false} />
          <span className="text-base font-black tracking-widest uppercase text-zinc-500">
            Wukong Artes Marciales
          </span>
        </div>
        <div className="flex items-center gap-6 text-zinc-600">
          <p className="text-xs">© 2026 Wukong. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://instagram.com/wukong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-red-500 transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://facebook.com/wukong"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-red-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------------------------------------------------
   Navegación principal
   -------------------------------------------------------------------------- */
function HeaderNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

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
      <header className="sticky top-0 z-40 bg-[#08080A]/85 backdrop-blur-xl border-b border-white/5">
        <nav
          className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between"
          aria-label="Navegación principal"
          onClick={(e) => {
            const target = (e.target as HTMLElement).closest("a")?.getAttribute("href");
            if (target?.startsWith("#")) {
              setMobileOpen(false);
            }
          }}
        >
          <a href="/" className="flex items-center gap-4 group" aria-label="Inicio">
            <BrandLogo size={44} glow={false} />
            <span className="text-xl font-black tracking-widest uppercase text-white group-hover:text-red-400 transition-colors duration-300">
              Wukong
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a
              href="/auth/login"
              className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 border border-white/10 hover:border-white/30 hover:text-white transition-all duration-200"
            >
              <Phone className="w-3.5 h-3.5 mr-1.5" />
              Ingresar
            </a>
            <a
              href="/auth/register"
              className="px-6 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-900/20 hover:shadow-red-900/30 duration-200"
            >
              <Award className="w-3.5 h-3.5 mr-1.5" />
              Registrarse
            </a>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
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
   Página principal
   -------------------------------------------------------------------------- */
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#08080A] text-white flex flex-col">
      <HeaderNav />
      <main>
        <HeroSection />
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
