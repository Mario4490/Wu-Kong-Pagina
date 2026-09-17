"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Menu, X, ChevronRight, Star, Clock, MapPin, Phone, Mail, CheckCircle2,
  ArrowRight, Shield, Flame, Dumbbell, Send, Calendar, Users, Trophy,
  ChevronDown, Zap, Target
} from "lucide-react";

/* =================================================================== */
/*   SVG: Social Icons                                                   */
/* =================================================================== */
function InstagramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* =================================================================== */
/*   HOOKS                                                               */
/* =================================================================== */
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, label, suffix = "+" }: { value: number; label: string; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const count = useCounter(value, 1800, started);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl md:text-6xl font-bebas text-white tracking-wide">{started ? count : 0}{suffix}</div>
      <div className="text-xs text-zinc-500 font-bold uppercase tracking-[0.2em] mt-2">{label}</div>
    </div>
  );
}

/* =================================================================== */
/*   SECTION HEADER                                                      */
/* =================================================================== */
function SectionHead({ title, subtitle, align = "left" }: { title: string; subtitle?: string; align?: "left" | "center" }) {
  return (
    <div className={`mb-16 reveal ${align === "center" ? "text-center" : ""}`}>
      <h2 className="text-5xl md:text-7xl font-bebas tracking-wide text-white mb-4">{title}</h2>
      <div className={`w-24 h-1 bg-red-600 ${align === "center" ? "mx-auto" : ""}`} />
      {subtitle && <p className="text-zinc-500 mt-4 max-w-2xl font-medium tracking-wide uppercase text-sm">{align === "center" ? subtitle : ""}</p>}
      {subtitle && align !== "center" && <p className="text-zinc-400 mt-4 max-w-xl text-lg">{subtitle}</p>}
    </div>
  );
}

/* =================================================================== */
/*   NAV                                                                 */
/* =================================================================== */
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const sections = [
    { label: "Inicio", href: "#inicio" },
    { label: "Disciplinas", href: "#disciplinas" },
    { label: "El Dojo", href: "#acerca" },
    { label: "Equipo", href: "#entrenadores" },
    { label: "Horarios", href: "#horarios" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <Image src="/logo1.png" alt="Wukong" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
            <Image src="/logo2.png" alt="Aquiles" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] hidden sm:block" />
          </a>
          <div className="hidden lg:flex items-center gap-6">
            {sections.map((s) => (
              <a key={s.label} href={s.href} className="text-[13px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">{s.label}</a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="hidden md:block text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Ingresar</a>
            <a href="/auth/register" className="hidden sm:inline-flex px-6 py-2.5 bg-red-600 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-colors animate-pulse-glow">Inscribirse</a>
            <button className="lg:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div className={`fixed inset-0 z-[60] bg-black/90 backdrop-blur-3xl transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <button className="absolute top-6 right-6 p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors" onClick={() => setIsOpen(false)}>
          <X className="w-6 h-6" />
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
          <Image src="/logo1.png" alt="Wukong" width={64} height={64} className="mb-6" />
          {sections.map((s) => (
            <a key={s.label} href={s.href} onClick={() => setIsOpen(false)} className="text-3xl font-bebas tracking-widest text-zinc-400 hover:text-white transition-colors">{s.label}</a>
          ))}
          <div className="flex flex-col w-full max-w-xs gap-4 mt-8">
            <a href="/auth/login" onClick={() => setIsOpen(false)} className="py-4 text-center border border-white/20 rounded-2xl text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors">Ingresar</a>
            <a href="/auth/register" onClick={() => setIsOpen(false)} className="py-4 text-center bg-red-600 rounded-2xl text-sm font-bold uppercase tracking-widest text-white hover:bg-red-700 transition-colors">Inscribirse</a>
          </div>
        </div>
      </div>
    </>
  );
}

/* =================================================================== */
/*   HERO                                                                */
/* =================================================================== */
function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#050505] to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[url('/hero-dojo.jpg')] bg-cover bg-center opacity-15 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-8 mb-10 reveal">
          <Image src="/logo_wukong.png" alt="Wukong" width={180} height={180} className="w-28 h-28 md:w-44 md:h-44 object-contain animate-float drop-shadow-[0_0_40px_rgba(229,26,34,0.35)]" priority />
          <Image src="/logo_aquiles.png" alt="Aquiles" width={180} height={180} className="w-28 h-28 md:w-44 md:h-44 object-contain animate-float drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]" style={{ animationDelay: "1.5s" }} priority />
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas text-white tracking-wider leading-none mb-4 reveal delay-1 text-glow">
          WUKONG <span className="text-red-600">&</span> AQUILES
        </h1>
        <p className="text-lg md:text-xl text-zinc-500 uppercase tracking-[0.3em] font-bold mb-8 reveal delay-1">
          Artes Marciales · Boxeo · Jiu Jitsu · MMA
        </p>
        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 reveal delay-2 font-medium leading-relaxed">
          Forjá tu disciplina con los mejores. El centro de entrenamiento más completo y avanzado de la ciudad.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto reveal delay-3">
          <a href="/auth/register" className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-red-600 overflow-hidden rounded-2xl text-white font-bold uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_50px_-10px_rgba(229,26,34,0.6)]">
            <span className="relative z-10">Comenzar Ahora</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#disciplinas" className="inline-flex items-center justify-center gap-2 px-10 py-5 glass border-white/15 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Explorar <ChevronDown className="w-4 h-4" />
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 sm:gap-16 mt-20 px-6 py-8 glass rounded-3xl w-full max-w-lg reveal delay-3">
          <StatItem value={200} label="Alumnos" />
          <StatItem value={15} label="Años" suffix="+" />
          <StatItem value={3} label="Disciplinas" suffix="" />
        </div>
      </div>

      <a href="#disciplinas" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-zinc-600 hover:text-zinc-300 transition-colors animate-bounce">
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
}

/* =================================================================== */
/*   DISCIPLINAS                                                         */
/* =================================================================== */
const disciplinas = [
  {
    icon: Dumbbell, nombre: "Boxeo", team: "Team Wukong", logo: "/logo_wukong.png",
    desc: "El noble arte del striking. Jab, cross, gancho, esquivas y estrategia de ring bajo la filosofía Wukong.",
    niveles: ["Fitness", "Técnico", "Sparring", "Amateur"],
    gradient: "from-red-900/40 to-transparent", accent: "text-red-500", border: "border-red-900/30",
  },
  {
    icon: Shield, nombre: "Jiu Jitsu", team: "Team Aquiles", logo: "/logo_aquiles.png",
    desc: "Dominá el arte de la lucha en el suelo. Palancas, estrangulaciones y control absoluto con la disciplina Aquiles.",
    niveles: ["Bases", "Integrado", "Avanzado", "Competición"],
    gradient: "from-zinc-800/60 to-transparent", accent: "text-zinc-300", border: "border-white/10",
  },
  {
    icon: Flame, nombre: "MMA", team: "Team Aquiles", logo: "/logo_aquiles.png",
    desc: "La disciplina más completa: striking, clinch, grappling y ground-and-pound integrados en un solo sistema.",
    niveles: ["Bases", "Integrado", "Avanzado", "Competición"],
    gradient: "from-red-950/30 to-transparent", accent: "text-red-400", border: "border-red-900/20",
  },
];

function Disciplinas() {
  return (
    <section id="disciplinas" className="relative py-32 bg-[#050505]">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHead title="Disciplinas" subtitle="Tres caminos, un objetivo: la excelencia marcial." />

        <div className="grid md:grid-cols-3 gap-6">
          {disciplinas.map((d, i) => (
            <article key={d.nombre} className={`reveal delay-${i + 1} group relative rounded-3xl bg-gradient-to-b ${d.gradient} border ${d.border} p-8 flex flex-col overflow-hidden hover:border-red-600/40 transition-all duration-500`}>
              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-colors duration-700" />

              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white/5 border ${d.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {d.logo ? (
                    <Image src={d.logo} alt={d.team} width={32} height={32} className="w-8 h-8 object-contain" />
                  ) : (
                    <d.icon className={`w-7 h-7 ${d.accent}`} />
                  )}
                </div>
                <div>
                  <h3 className="text-3xl font-bebas text-white uppercase tracking-wide">{d.nombre}</h3>
                  <p className={`text-xs font-bold tracking-[0.2em] uppercase ${d.accent}`}>{d.team}</p>
                </div>
              </div>

              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{d.desc}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {d.niveles.map((n) => (
                  <span key={n} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">{n}</span>
                ))}
              </div>

              <a href="#horarios" className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${d.accent} hover:gap-3 transition-all`}>
                Ver horarios <ChevronRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   GALERÍA                                                             */
/* =================================================================== */
function Gallery() {
  const images = [
    { src: "/instalacion-general.jpg", label: "Área de Entrenamiento", size: "md:col-span-2 md:row-span-2" },
    { src: "/instalacion-jiujitsu.jpg", label: "Tatami Jiu Jitsu (Aquiles)", size: "" },
    { src: "/instalacion-mma.jpg", label: "Octágono MMA", size: "" },
    { src: "/instalacion-boxeo.jpg", label: "Ring de Boxeo (Wukong)", size: "md:col-span-2" },
  ];

  return (
    <section id="acerca" className="relative py-32 bg-[#08080a]">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead title="El Dojo" subtitle="Instalaciones equipadas con tatamis homologados, ring reglamentario, octágono y zona de recuperación." />

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px] reveal delay-1">
          {images.map((img, i) => (
            <div key={i} className={`relative group overflow-hidden rounded-3xl ${img.size} min-h-[220px]`}>
              <div className="absolute inset-0 bg-zinc-900" />
              <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-50 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/40 flex items-center justify-center mb-3 backdrop-blur-md">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-xl font-bebas tracking-wide text-white">{img.label}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 reveal delay-2">
          {[
            { icon: Shield, text: "Tatamis homologados" },
            { icon: Users, text: "Clases grupales y particulares" },
            { icon: Calendar, text: "Horarios mañana, tarde y noche" },
            { icon: Trophy, text: "Preparación para competencias" },
            { icon: CheckCircle2, text: "Vestuarios y duchas" },
            { icon: Clock, text: "Libre acceso en horarios" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-3 p-4 rounded-2xl glass-card">
              <Icon className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span className="text-sm text-zinc-300">{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   ENTRENADORES                                                        */
/* =================================================================== */
function Coaches() {
  const coaches = [
    { id: "mg", name: "Marcos García", role: "Head Coach Wukong", discipline: "Boxeo", img: "/logo_wukong.png", color: "from-red-900 to-black", text: "Especialista en striking y estrategia de ring. +10 años formando boxeadores bajo la filosofía Wukong." },
    { id: "da", name: "Mestre Diego", role: "Líder Aquiles / MMA", discipline: "Jiu Jitsu & MMA", img: "/logo_aquiles.png", color: "from-zinc-800 to-black", text: "Faixa Preta enfocado en control absoluto, sumisiones de alto nivel y la integración perfecta para MMA." },
  ];

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="entrenadores" className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionHead title="Líderes de Disciplina" subtitle="Seleccioná un entrenador para ver sus credenciales." align="center" />

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {coaches.map((coach, i) => {
            const isActive = activeId === coach.id;
            return (
              <div key={coach.id} className={`reveal delay-${i + 1} relative cursor-pointer group`}
                onMouseEnter={() => setActiveId(coach.id)} onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(isActive ? null : coach.id)}>

                <div className={`w-48 h-48 md:w-56 md:h-56 rounded-full p-1 transition-all duration-500 ease-out ${isActive ? "scale-110 shadow-[0_0_60px_rgba(229,26,34,0.35)]" : "scale-100 opacity-60 hover:opacity-100"} bg-gradient-to-br ${coach.color} border border-white/10`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#050505] flex items-center justify-center relative">
                    {coach.img ? (
                      <Image src={coach.img} alt={coach.name} width={100} height={100} className="w-1/2 h-1/2 object-contain opacity-40 group-hover:opacity-100 transition-opacity duration-500" />
                    ) : (
                      <span className="text-6xl font-bebas text-zinc-800 group-hover:text-zinc-600 transition-colors">{coach.name.charAt(0)}</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-5 left-0 right-0 text-center">
                      <h3 className="text-xl font-bebas text-white tracking-wider">{coach.name}</h3>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-500">{coach.discipline}</p>
                    </div>
                  </div>
                </div>

                {/* Popover */}
                <div className={`absolute top-1/2 left-full ml-6 w-56 glass-card rounded-2xl p-5 transition-all duration-500 origin-left hidden md:block z-20 -translate-y-1/2 ${isActive ? "opacity-100 scale-100 translate-x-0" : "opacity-0 scale-90 -translate-x-4 pointer-events-none"}`}>
                  <h4 className="text-lg font-bebas text-white tracking-wide mb-1">{coach.role}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{coach.text}</p>
                  <div className="flex items-center gap-2">
                    <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-500/40 transition-colors"><Mail className="w-4 h-4" /></button>
                    <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-500/40 transition-colors"><Phone className="w-4 h-4" /></button>
                    <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-green-500 hover:border-green-500/40 transition-colors"><WhatsAppIcon className="w-4 h-4" /></button>
                  </div>
                </div>

                {/* Mobile Expand */}
                {isActive && (
                  <div className="md:hidden mt-4 glass-card rounded-2xl p-5 text-center">
                    <h4 className="text-lg font-bebas text-white tracking-wide mb-1">{coach.role}</h4>
                    <p className="text-sm text-zinc-400 leading-relaxed mb-3">{coach.text}</p>
                    <div className="flex items-center justify-center gap-2">
                      <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400"><Mail className="w-4 h-4" /></button>
                      <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400"><Phone className="w-4 h-4" /></button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   HORARIOS                                                            */
/* =================================================================== */
const horarios = [
  { dia: "Lunes", boxeo: "10:00 / 20:00", jiujitsu: "8:00 / 19:00", mma: "—" },
  { dia: "Martes", boxeo: "9:00 / 19:00", jiujitsu: "—", mma: "20:30" },
  { dia: "Miércoles", boxeo: "10:00 / 20:00", jiujitsu: "8:00 / 19:00", mma: "—" },
  { dia: "Jueves", boxeo: "9:00 / 19:00", jiujitsu: "—", mma: "20:30" },
  { dia: "Viernes", boxeo: "10:00 / 19:00", jiujitsu: "8:00 / 18:00", mma: "20:00" },
  { dia: "Sábado", boxeo: "10:00", jiujitsu: "9:00", mma: "11:30" },
];

function Horarios() {
  return (
    <section id="horarios" className="relative py-32 bg-[#08080a]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHead title="Horarios" subtitle="Organizá tu semana de entrenamiento." align="center" />

        <div className="reveal overflow-x-auto rounded-3xl glass-card">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-5 text-xs font-bold uppercase tracking-widest text-zinc-600">Día</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-red-500">🥊 Boxeo</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-zinc-300">🥋 Jiu Jitsu</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-red-400">🔥 MMA</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((row, i) => (
                <tr key={row.dia} className={`border-b border-white/[0.03] hover:bg-white/[0.03] transition-colors ${i % 2 !== 0 ? "bg-white/[0.01]" : ""}`}>
                  <td className="p-5 text-sm font-bold text-white">{row.dia}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.boxeo}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.jiujitsu}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.mma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-8 reveal delay-1">
          <div className="flex items-center gap-2 text-sm text-zinc-600"><Clock className="w-4 h-4" />Horarios sujetos a cambios.</div>
          <a href="#contacto" className="inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors">Consultar disponibilidad <ChevronRight className="w-4 h-4" /></a>
        </div>
      </div>
    </section>
  );
}


/* =================================================================== */
/*   TESTIMONIOS                                                         */
/* =================================================================== */
function Testimonials() {
  const reviews = [
    { text: "El nivel de exigencia técnica en Jiu Jitsu es increíble. Mestre Diego realmente se enfoca en los detalles.", author: "Santiago V.", role: "Faixa Azul", stars: 5 },
    { text: "Instalaciones de primer nivel. El ring de boxeo y el área de pesas están impecables. El mejor dojo.", author: "Lucas M.", role: "Boxeo Amateur", stars: 5 },
    { text: "Entrenar MMA aquí cambió mi perspectiva. La integración de disciplinas que enseña Luis es brutal.", author: "Camila R.", role: "Competidora", stars: 5 },
  ];

  return (
    <section id="comentarios" className="py-32 bg-[#08080a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHead title="La Comunidad" subtitle="Lo que dicen los guerreros" align="center" />

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className={`glass-card rounded-3xl p-8 relative overflow-hidden reveal delay-${i + 1} group hover:border-red-900/30 transition-all duration-500`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors duration-500" />
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-8 relative z-10">&ldquo;{r.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 flex items-center justify-center border border-white/5">
                  <span className="font-bebas text-xl text-zinc-400">{r.author.charAt(0)}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">{r.author}</h4>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest">{r.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   NOTICIAS                                                            */
/* =================================================================== */
const noticias = [
  { cat: "Competencia", titulo: "Wukong en el Campeonato Provincial", fecha: "12 Sep 2026", destacado: true, texto: "Más de 15 representantes de Wukong compitieron en el Torneo Provincial, obteniendo 8 medallas en total." },
  { cat: "Clases", titulo: "Nuevo horario de Boxeo nocturno", fecha: "5 Sep 2026", destacado: false, texto: "A partir del próximo mes, habilitamos entrenamiento de Boxeo de 21:00 a 22:30 para trabajadores." },
  { cat: "Comunidad", titulo: "Clase gratuita para primeros ingresos", fecha: "28 Ago 2026", destacado: false, texto: "Si nunca entrenaste, te esperamos con una clase de 45 min sin compromiso los sábados a las 10:00hs." },
];

function Noticias() {
  return (
    <section id="noticias" className="py-32 bg-[#050505]">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHead title="Noticias" subtitle="Última hora de la academia." />
        <div className="space-y-4">
          {noticias.map((n, i) => (
            <article key={n.titulo} className={`reveal delay-${i + 1} group relative rounded-3xl border p-6 flex gap-5 transition-all duration-300 hover:border-red-900/40 ${n.destacado ? "border-red-600/30 bg-red-950/5" : "border-white/5 glass-card"}`}>
              {n.destacado && <span className="absolute top-4 right-4 px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Destacado</span>}
              <div className="flex flex-col items-center justify-center w-16 flex-shrink-0">
                <span className={`text-[10px] font-bold uppercase tracking-widest ${n.destacado ? "text-red-400" : "text-zinc-500"}`}>{n.cat}</span>
                <Zap className={`w-4 h-4 mt-2 ${n.destacado ? "text-red-400" : "text-zinc-700"}`} />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bebas text-white uppercase tracking-wide mb-1">{n.titulo}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{n.texto}</p>
                <p className="text-xs text-zinc-600 mt-2">{n.fecha}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   CONTACTO                                                            */
/* =================================================================== */
function Contacto() {
  const mapUrl = "https://maps.google.com/maps/search/Wukong%20team/@-25.60676274,-54.58111345,17z?hl=es";
  const embedUrl = "https://www.google.com/maps?q=-25.60676274,-54.58111345&z=17&output=embed";

  return (
    <section id="contacto" className="relative py-32 bg-[#08080a]">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <SectionHead title="Contacto" subtitle="Escribinos y comenzá tu camino." align="center" />

        <div className="grid md:grid-cols-2 gap-12">
          {/* Info + Mapa */}
          <div className="space-y-5 reveal">
            {[
              { icon: MapPin, label: "Ubicación", value: "Wukong Team — Puerto Iguazú, Misiones" },
              { icon: Phone, label: "WhatsApp", value: "+54 11 5555-5555" },
              { icon: Mail, label: "Email", value: "hola@wukong.com.ar" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-4 p-5 rounded-2xl glass-card">
                <div className="w-11 h-11 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">{label}</p>
                  <p className="text-sm text-zinc-300">{value}</p>
                </div>
              </div>
            ))}

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-white/5 h-[220px] relative">
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.85) contrast(1.1)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Wukong Team"
              />
              <a href={mapUrl} target="_blank" rel="noreferrer" className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg">
                Abrir en Maps
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/wukong" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-pink-400 hover:border-pink-500/30 transition-all"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://facebook.com/wukong" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-500/30 transition-all"><FacebookIcon className="w-5 h-5" /></a>
              <a href="https://wa.me/5411555555" target="_blank" rel="noreferrer" className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-green-400 hover:border-green-500/30 transition-all"><WhatsAppIcon className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Form */}
          <div className="reveal delay-2">
            <form className="rounded-3xl glass-card p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-600/40 transition-colors" />
                <input type="tel" placeholder="WhatsApp" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-600/40 transition-colors" />
              </div>
              <select className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-zinc-400 text-sm focus:outline-none focus:border-red-600/40 transition-colors appearance-none cursor-pointer">
                <option value="" disabled>Disciplina de interés</option>
                <option value="boxeo">Boxeo (Wukong)</option>
                <option value="jiujitsu">Jiu Jitsu (Aquiles)</option>
                <option value="mma">MMA</option>
              </select>
              <textarea rows={4} placeholder="Contame qué buscás..." className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-600/40 transition-colors resize-none" />
              <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-red-700 active:scale-[0.98] transition-all shadow-[0_0_30px_-8px_rgba(229,26,34,0.5)]">
                <Send className="w-4 h-4 inline mr-2" />Enviar Consulta
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   FOOTER                                                              */
/* =================================================================== */
function Footer() {
  return (
    <footer className="py-16 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <Image src="/logo1.png" alt="Wukong" width={36} height={36} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <Image src="/logo2.png" alt="Aquiles" width={36} height={36} className="opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all" />
            <span className="font-bebas text-zinc-600 text-lg tracking-wider">WUKONG & AQUILES</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600 uppercase tracking-widest font-bold">
            {["Inicio", "Disciplinas", "Horarios", "Contacto"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white transition-colors">{item}</a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <a href="https://instagram.com/wukong" target="_blank" rel="noreferrer" className="text-zinc-700 hover:text-pink-400 transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            <a href="https://facebook.com/wukong" target="_blank" rel="noreferrer" className="text-zinc-700 hover:text-blue-400 transition-colors"><FacebookIcon className="w-5 h-5" /></a>
          </div>
        </div>
        <div className="text-center mt-10 pt-8 border-t border-white/5">
          <p className="text-zinc-700 text-xs">© {new Date().getFullYear()} Wukong & Aquiles Academy — Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* =================================================================== */
/*   MAIN                                                                */
/* =================================================================== */
export default function HomePage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#050505]">
      <Nav />
      <Hero />
      <Disciplinas />
      <Gallery />
      <Coaches />
      <Horarios />
      <Testimonials />
      <Noticias />
      <Contacto />
      <Footer />
    </div>
  );
}
