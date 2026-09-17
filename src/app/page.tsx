// src/app/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Shield, Scroll, Users, Calendar, MapPin, Phone, Mail, Menu, X,
  ChevronRight, Star, Zap, Award, Clock, CheckCircle2, AlertTriangle,
  Target, Dumbbell, Flame, Trophy, Send, ChevronDown,
} from "lucide-react";

/* =================================================================== */
/*   SVG COMPONENTS PARA REDES SOCIALES (lucide-react no tiene          */
/*   Instagram ni Facebook)                                              */
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

/* =================================================================== */
/*   HOOKS                                                               */
/* =================================================================== */

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useActiveSection() {
  const [active, setActive] = useState("inicio");
  useEffect(() => {
    const ids = ["inicio","disciplinas","sobre","entrenadores","horarios","precios","comentarios","noticias","contacto"];
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return active;
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

/* =================================================================== */
/*   COMPONENTES REUTILIZABLES                                           */
/* =================================================================== */

function BrandLogo({ size = 56, glow = true }: { size?: number; glow?: boolean }) {
  return (
    <div
      className={glow ? "logo-pulse" : ""}
      style={{
        width: size, height: size, borderRadius: "18px",
        background: "linear-gradient(135deg, #fb2c30 0%, #a10012 100%)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-bebas), Arial Black, sans-serif",
        fontSize: size * 0.38, color: "#fff", letterSpacing: "0.04em", flexShrink: 0,
      }}
      aria-label="Logo Wukong"
    >WUK</div>
  );
}

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-zinc-600"}`} />
      ))}
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-16 reveal">
      <span className="text-xs font-bold tracking-[0.35em] uppercase text-red-500 mb-3 block">{eyebrow}</span>
      <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">{title}</h2>
      <div className="w-20 h-0.5 bg-gradient-to-r from-red-600 to-transparent mx-auto mt-5" />
    </div>
  );
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
      <div className="font-display text-4xl sm:text-5xl text-white tracking-wide">{started ? count : 0}{suffix}</div>
      <div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
}

/* =================================================================== */
/*   HERO SECTION                                                        */
/* =================================================================== */

function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src="/hero-dojo.jpg" alt="Dojo Wukong" fill className="object-cover object-center" priority quality={85} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-[#08080A]" />
        <div className="absolute inset-0 bg-gradient-to-r from-red-950/30 via-transparent to-transparent" />
      </div>
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-red-500/40 pointer-events-none" />
      <div className="absolute bottom-24 right-6 w-16 h-16 border-b-2 border-r-2 border-red-500/20 pointer-events-none" />
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
          <BrandLogo size={96} glow />
          <div className="space-y-2">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide leading-none">Artes Marciales <span className="text-red-500">Wukong</span> &</h1>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl text-white uppercase tracking-wide leading-none">Jujutsu <span className="text-red-500">Aquiles</span></h1>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Flame className="w-3.5 h-3.5" />
          Boxeo, Jiu Jitsu, MMA y más
        </div>
        <p className="text-zinc-300 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
          Forja tu disciplina con los mejores. Wukong representa el Boxeo y Striking, mientras Aquiles lidera el Jiu Jitsu y Grappling.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a href="/auth/register" className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl shadow-2xl shadow-red-900/40 hover:bg-red-500 active:scale-95 transition-all duration-200">
            <Award className="w-5 h-5" />Reservar clase gratis<ChevronRight className="w-4 h-4" />
          </a>
          <a href="#disciplinas" className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/15 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-white/10 hover:border-white/25 transition-all duration-200">
            Ver disciplinas
          </a>
        </div>
        <div className="grid grid-cols-3 gap-8 sm:gap-16 px-4 py-8 rounded-3xl bg-black/40 backdrop-blur-sm border border-white/5 w-full max-w-lg">
          <StatItem value={200} label="Alumnos" />
          <StatItem value={15} label="Anos" suffix="+" />
          <StatItem value={3} label="Disciplinas" suffix="" />
        </div>
      </div>
      <a href="#disciplinas" className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-zinc-500 hover:text-zinc-300 transition-colors animate-bounce">
        <span className="text-xs tracking-widest uppercase font-medium">Explorar</span>
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
}

/* =================================================================== */
/*   DISCIPLINAS SECTION                                                 */
/* =================================================================== */

const disciplinas = [
  { icon: Dumbbell, nombre: "Boxeo",      estilo: "Team Wukong",           descripcion: "Aprende los fundamentos del noble arte: jab, cross, gancho, esquivas y estrategia de ring bajo la filosofía Wukong.", niveles: ["Fitness","Técnico","Sparring","Amateur"], color: "from-red-950/60 to-transparent", accent: "text-red-400", border: "border-red-900/30"},
  { icon: Shield,   nombre: "Jiu Jitsu",  estilo: "Team Aquiles",          descripcion: "Domina el arte de la lucha en el suelo, palancas y estrangulaciones con la técnica y disciplina de Aquiles.", niveles: ["Bases","Integrado","Avanzado","Competición"], color: "from-zinc-900/80 to-transparent", accent: "text-zinc-300", border: "border-white/10"},
  { icon: Flame,    nombre: "MMA",        estilo: "Artes Marciales Mixtas",descripcion: "La disciplina más completa: striking, clinch, grappling y ground-and-pound integrados en un solo sistema.", niveles: ["Bases","Integrado","Avanzado","Competición"], color: "from-red-950/40 to-transparent", accent: "text-red-500", border: "border-red-900/20"},
];

function DisciplinasSection() {
  return (
    <section id="disciplinas" className="relative py-28 px-4 bg-[#08080A]" aria-labelledby="disciplinas-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Lo que ofrecemos" title="Disciplinas" />
        <div className="grid md:grid-cols-3 gap-6">
          {disciplinas.map((d, i) => (
            <article key={d.nombre} className={`reveal reveal-delay-${i+1} card-hover group relative rounded-3xl bg-gradient-to-b ${d.color} border ${d.border} p-8 flex flex-col overflow-hidden`}>
              <div className={`w-14 h-14 rounded-2xl bg-white/5 border ${d.border} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <d.icon className={`w-7 h-7 ${d.accent}`} />
              </div>
              <h3 className="font-display text-3xl text-white uppercase tracking-wide">{d.nombre}</h3>
              <p className={`text-xs font-bold tracking-widest uppercase ${d.accent} mt-1 mb-4`}>{d.estilo}</p>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{d.descripcion}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {d.niveles.map((nivel) => (
                  <span key={nivel} className="px-3 py-1 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-zinc-400 uppercase tracking-wide">{nivel}</span>
                ))}
              </div>
              <a href="#contacto" className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${d.accent} hover:gap-3 transition-all`}>
                Consultar horarios <ChevronRight className="w-4 h-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   SOBRE EL LUGAR                                                      */
/* =================================================================== */

function SobreLugarSection() {
  const fotos = [
    { src: "/instalacion-general.jpg", label: "Area general de entrenamiento" },
    { src: "/instalacion-mma.jpg",     label: "Octagono de MMA"               },
    { src: "/instalacion-jiujitsu.jpg",label: "Tatami de Jiu Jitsu"           },
    { src: "/instalacion-boxeo.jpg",   label: "Ring de Boxeo"                 },
  ];
  return (
    <section id="sobre" className="relative py-28 px-4 bg-white/[0.02]" aria-labelledby="sobre-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Conoce el Dojo" title="Sobre el Lugar" />
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="grid grid-cols-2 gap-3 reveal">
            {fotos.map((foto) => (
              <div key={foto.src} className="relative rounded-2xl overflow-hidden group" style={{height:"200px"}}>
                <Image src={foto.src} alt={foto.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-xs font-semibold text-white">{foto.label}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-5 reveal reveal-delay-2">
            <p className="text-zinc-300 text-lg leading-relaxed">Un espacio disenado para quienes buscan desarrollar tecnica, disciplina y mentalidad competitiva en un ambiente de respeto real.</p>
            <p className="text-zinc-500 text-sm leading-relaxed">Instalaciones equipadas con tatamis homologados, ring de boxeo reglamentario, octagono de MMA y zona de recuperacion. Programas estructurados por nivel y objetivo.</p>
            <div className="grid grid-cols-1 gap-3 pt-2">
              {[
                {icon:Shield,       text:"Tatamis homologados"             },
                {icon:Users,        text:"Clases grupales y particulares"  },
                {icon:Calendar,     text:"Horarios manana, tarde y noche"  },
                {icon:Trophy,       text:"Preparacion para competencias"   },
                {icon:CheckCircle2, text:"Vestuarios y duchas"             },
                {icon:Clock,        text:"Libre acceso en horario de apertura"},
              ].map(({icon:Icon,text}) => (
                <div key={text} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                  <Icon className="w-4 h-4 text-red-500 flex-shrink-0" /><span className="text-sm text-zinc-300">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   ENTRENADORES                                                        */
/* =================================================================== */

const entrenadores = [
  { foto:null, iniciales:"MG", nombre:"Prof. Marcos Garcia",   disciplina:"Boxeo (Wukong)",    cinturon:"Ex-amateur",descripcion:"Entrenador principal de Boxeo. Especialista en tecnica de guantes y estrategia de ring.",   logros:["8 anos de carrera amateur","Campeon Provincial 2015"]   },
  { foto:null, iniciales:"DA", nombre:"Mestre Diego",          disciplina:"Jiu Jitsu (Aquiles)", cinturon:"Faixa Preta", descripcion:"Lider de la division Aquiles. Enfocado en sumisiones de alto nivel y control absoluto en el suelo.", logros:["Campeon Nacional BJJ","Instructor Black Belt"] },
  { foto:null, iniciales:"LR", nombre:"Coach Luis Romero",     disciplina:"MMA",                 cinturon:"Ex-fighter",descripcion:"Ex-luchador con background BJJ y Muay Thai. Lidera la division MMA y entrenamiento integrado.", logros:["10 peleas profesionales","Especialista striking-grappling"]           },
];

function EntrenadoresSection() {
  return (
    <section id="entrenadores" className="relative py-28 px-4 bg-[#08080A]" aria-labelledby="entrenadores-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Nuestro Equipo" title="Entrenadores" />
        <div className="grid md:grid-cols-3 gap-6">
          {entrenadores.map((t, i) => (
            <article key={t.nombre} className={`reveal reveal-delay-${i+1} card-hover group relative rounded-3xl bg-[#0f0f13] border border-white/5 hover:border-red-900/30 p-6 flex flex-col items-center text-center transition-all duration-300`}>
              <div className="relative w-24 h-24 rounded-full mb-5 overflow-hidden border-2 border-red-600/40 flex-shrink-0">
                {t.foto ? (
                  <Image src={t.foto} alt={t.nombre} fill className="object-cover object-top" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center">
                    <span className="font-display text-2xl text-zinc-300 tracking-wide">{t.iniciales}</span>
                  </div>
                )}
              </div>
              <h3 className="font-display text-xl text-white uppercase tracking-wide leading-tight">{t.nombre}</h3>
              <p className="text-xs font-bold tracking-widest text-red-400 uppercase mt-1 mb-1">{t.disciplina}</p>
              <span className="inline-block px-3 py-0.5 rounded-full bg-zinc-500/10 border border-zinc-500/20 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">{t.cinturon}</span>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">{t.descripcion}</p>
              <div className="w-full space-y-1.5 mb-5">
                {t.logros.map((l) => (
                  <div key={l} className="flex items-center gap-2 text-xs text-zinc-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />{l}
                  </div>
                ))}
              </div>
              <a href="#contacto" className="flex items-center gap-2 px-5 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-zinc-400 hover:text-white hover:border-white/30 transition-all uppercase tracking-wider">
                <Mail className="w-3.5 h-3.5" />Contactar
              </a>
            </article>
          ))}
        </div>
        <p className="text-center text-zinc-600 text-sm mt-10">+ instructores auxiliares disponibles segun disciplina y nivel.</p>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   HORARIOS                                                            */
/* =================================================================== */

const horarios = [
  {dia:"Lunes",    boxeo:"10:00 / 20:00", jiujitsu:"8:00 / 19:00", mma:"—"},
  {dia:"Martes",   boxeo:"9:00 / 19:00",  jiujitsu:"—",             mma:"20:30"},
  {dia:"Miércoles",boxeo:"10:00 / 20:00", jiujitsu:"8:00 / 19:00", mma:"—"},
  {dia:"Jueves",   boxeo:"9:00 / 19:00",  jiujitsu:"—",             mma:"20:30"},
  {dia:"Viernes",  boxeo:"10:00 / 19:00", jiujitsu:"8:00 / 18:00", mma:"20:00"},
  {dia:"Sábado",   boxeo:"10:00",         jiujitsu:"9:00",          mma:"11:30"},
];

function HorariosSection() {
  return (
    <section id="horarios" className="relative py-28 px-4 bg-white/[0.02]" aria-labelledby="horarios-heading">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Organiza tu semana" title="Horarios" />
        <div className="reveal overflow-x-auto rounded-3xl border border-white/5 bg-[#0f0f13]">
          <table className="w-full min-w-[520px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left p-5 text-xs font-bold uppercase tracking-widest text-zinc-500">Día</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-red-400">Boxeo (Wukong)</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-zinc-300">Jiu Jitsu (Aquiles)</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-red-500">MMA</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((row, i) => (
                <tr key={row.dia} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i%2===0?"":"bg-white/[0.015]"}`}>
                  <td className="p-5 text-sm font-bold text-white">{row.dia}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.boxeo}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.jiujitsu}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.mma}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap justify-center gap-6 mt-8 reveal reveal-delay-2">
          <div className="flex items-center gap-2 text-sm text-zinc-500"><Clock className="w-4 h-4 text-zinc-600" />Horarios sujetos a cambios. Confirmar por WhatsApp.</div>
          <a href="#contacto" className="inline-flex items-center gap-2 text-sm font-bold text-red-500 hover:text-red-400 transition-colors">Consultar disponibilidad<ChevronRight className="w-4 h-4" /></a>
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   PRECIOS                                                             */
/* =================================================================== */

const planes = [
  { nombre:"Principiante",     precio:"$45.000", descripcion:"Clases introductorias, acceso a tatami y equipamiento basico.",       caracteristicas:["Clases grupales","Acceso a tatami","Equipo basico","Evaluaciones quincenales"], popular:false },
  { nombre:"Semi-Competicion", precio:"$65.000", descripcion:"Entrenamiento tecnico avanzado, preparacion fisica y sparring controlado.", caracteristicas:["Tres clases/semana","Sparring","Preparacion fisica","Dietas basicas","Acceso a ring"], popular:true  },
  { nombre:"Competicion",      precio:"$85.000", descripcion:"Preparacion completa para torneos. Sparring intensivo, sports science y seguimiento personalizado.", caracteristicas:["Clases ilimitadas","Preparacion competiciones","Sports science","Seguimiento 1:1","Acceso ring + octagono"], popular:false },
];

function PreciosSection() {
  return (
    <section id="precios" className="relative py-28 px-4 bg-[#08080A]" aria-labelledby="precios-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Inversion en tu progreso" title="Nuestros Planes" />
        <div className="grid md:grid-cols-3 gap-6">
          {planes.map((p, i) => (
            <article key={p.nombre} className={`reveal reveal-delay-${i+1} card-hover relative rounded-3xl border ${p.popular ? "border-red-600/50 bg-red-950/10" : "border-white/5 bg-[#0f0f13]"} p-8 flex flex-col ${p.popular ? "scale-105 z-10 shadow-2xl shadow-red-900/20" : ""}`}>
              {p.popular && (
                <span className="absolute top-4 right-4 px-3 py-0.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Mas popular</span>
              )}
              <h3 className="font-display text-xl text-white uppercase tracking-wide mb-2">{p.nombre}</h3>
              <div className="mb-6">
                <span className="font-display text-4xl text-white">{p.precio}</span>
                <span className="text-zinc-500 text-sm ml-2">/mes</span>
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">{p.descripcion}</p>
              <ul className="space-y-3 mb-8">
                {p.caracteristicas.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />{c}
                  </li>
                ))}
              </ul>
              <a href="#contacto" className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${p.popular ? "bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/30" : "bg-white/5 border border-white/10 text-zinc-300 hover:bg-white/10 hover:border-white/20"}`}>
                Elegir plan
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =================================================================== */
/*   COMENTARIOS                                                         */
/* =================================================================== */

const comentarios = [
  { inicial:"FP",nombre:"Fernando P.",  disciplina:"Boxeo",  rating:4, texto:"Muy buenas instalaciones y grupo humano. El ring esta en perfectas condiciones. Recomendado 100%." },
  { inicial:"ML",nombre:"Marcela L.",  disciplina:"Karate",  rating:5, texto:"Llevo 3 años y el progreso es impresionable. El Sensei Tanaka es excepcional enseñando katas." },
  { inicial:"CR",nombre:"Camila R.",   disciplina:"MMA",     rating:5, texto:"El entrenamiento integrado es lo que mas me gusta. Aprendí a conectar striking con grappling de verdad." },
];

function ComentariosSection() {
  return (
    <section id="comentarios" className="relative py-28 px-4 bg-white/[0.02]" aria-labelledby="comentarios-heading">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="Voces de nuestro tatami" title="Testimonios" />
        <div className="grid md:grid-cols-3 gap-6">
          {comentarios.map((c, i) => (
            <article key={c.inicial} className={`reveal reveal-delay-${i+1} card-hover group relative rounded-3xl bg-[#0f0f13] border border-white/5 p-6 flex flex-col transition-all duration-300`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center border border-white/5">
                  <span className="font-display text-sm text-zinc-300 tracking-wide">{c.inicial}</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{c.nombre}</p>
                  <p className="text-xs text-zinc-500">{c.disciplina}</p>
                </div>
              </div>
              <StarRating count={c.rating} />
              <p className="text-zinc-400 text-sm leading-relaxed mt-4 flex-1">"{c.texto}"</p>
            </article>
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
  { categoria:"Competencia",    titulo:"Wukong en el Campeonato Provincial",        fecha:"12 Sep 2026", destacado:true,  texto:"Mas de 15 representantes de Wukong compitieron en el Torneo San triglycerinas, obteniendo 8 medallas en total." },
  { categoria:"Clases",         titulo:"Nuevo horario de Boxeo nocturno",            fecha:"5 Sep 2026",  destacado:false, texto:"A partir del proximo mes, habilitamos entrenamiento de Boxeo de 21:00 a 22:30 para trabajadores." },
  { categoria:"Comunidad",      titulo:"Clase gratuita para primeros ingresos",      fecha:"28 Ago 2026", destacado:false, texto:"Si nunca entrenaste, te esperamos con una clase de 45 minutos sin compromiso los sabados a las 10:00hs." },
];

function NoticiasSection() {
  return (
    <section id="noticias" className="relative py-28 px-4 bg-[#08080A]" aria-labelledby="noticias-heading">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Última hora" title="Noticias" />
        <div className="space-y-4">
          {noticias.map((n, i) => (
            <article key={n.titulo} className={`reveal reveal-delay-${i+1} card-hover group relative rounded-3xl border ${n.destacado ? "border-red-600/40 bg-red-950/5" : "border-white/5 bg-[#0f0f13]"} p-6 flex gap-5 transition-all duration-300`}>
              {n.destacado && (
                <span className="absolute top-4 right-4 px-2 py-0.5 bg-red-600/80 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">Destacado</span>
              )}
              <div className="flex flex-col items-center justify-center w-16 flex-shrink-0">
                <span className={`text-xs font-bold uppercase tracking-widest ${n.destacado ? "text-red-400" : "text-zinc-500"}`}>{n.categoria}</span>
                <Clock className={`w-4 h-4 mt-2 ${n.destacado ? "text-red-400" : "text-zinc-600"}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-lg text-white uppercase tracking-wide mb-1">{n.titulo}</h3>
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

function ContactoSection() {
  return (
    <section id="contacto" className="relative py-28 px-4 bg-white/[0.02]" aria-labelledby="contacto-heading">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Escibenos" title="Contacto" />
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6 reveal">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0f0f13] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Ubicacion</p>
                <p className="text-sm text-zinc-300">Córdoba Ave. 1250, Buenos Aires</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0f0f13] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">WhatsApp</p>
                <p className="text-sm text-zinc-300">+54 11 5555-5555</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#0f0f13] border border-white/5">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/30 flex items-center justify-center">
                <Mail className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500 uppercase tracking-widest font-semibold">Email</p>
                <p className="text-sm text-zinc-300">hola@wukong.com.ar</p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/wukong" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-red-400 hover:border-red-600/30 transition-all">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://facebook.com/wukong" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-blue-400 hover:border-blue-600/30 transition-all">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <form className="rounded-3xl bg-[#0f0f13] border border-white/5 p-8 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Nombre" className="input-field" />
                <input type="tel" placeholder="WhatsApp" className="input-field" />
              </div>
              <select className="input-field cursor-pointer appearance-none bg-zinc-800/50">
                <option value="" disabled>Disciplina de interes</option>
                <option value="karate">Karate Do</option>
                <option value="boxeo">Boxeo</option>
                <option value="mma">MMA</option>
              </select>
              <textarea rows={4} placeholder="Contame que buscas..." className="input-field resize-none" />
              <button type="submit" className="w-full py-4 bg-red-600 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-red-500 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-red-900/30">
                <Send className="w-4 h-4 inline mr-2" />Enviar consulta
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
    <footer className="relative py-12 px-4 bg-[#08080A] border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <BrandLogo size={32} glow={false} />
          <span className="text-sm font-display text-zinc-400 uppercase tracking-wide">Wukong & Aquiles</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-zinc-500">
          <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
          <a href="#disciplinas" className="hover:text-white transition-colors">Disciplinas</a>
          <a href="#precios" className="hover:text-white transition-colors">Planes</a>
          <a href="#contacto" className="hover:text-white transition-colors">Contacto</a>
        </div>
        <p className="text-xs text-zinc-600">© {new Date().getFullYear()} Wukong Academy — Todos los derechos reservados</p>
      </div>
    </footer>
  );
}

/* =================================================================== */
/*   COMPONENTE PRINCIPAL                                                */
/* =================================================================== */

export default function HomePage() {
  useScrollReveal();
  const active = useActiveSection();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navLinks = [
    { id:"inicio",       label:"Inicio",       color:"text-white" },
    { id:"disciplinas",  label:"Disciplinas",   color:"text-red-400" },
    { id:"sobre",        label:"Sobre el Lugar",color:"text-white" },
    { id:"entrenadores", label:"Entrenadores",  color:"text-white" },
    { id:"horarios",     label:"Horarios",     color:"text-white" },
    { id:"precios",      label:"Planes",       color:"text-white" },
    { id:"comentarios",  label:"Testimonios",  color:"text-white" },
    { id:"noticias",     label:"Noticias",     color:"text-white" },
    { id:"contacto",     label:"Contacto",    color:"text-white" },
  ];

  return (
    <div className="min-h-screen bg-[#08080A] text-white">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#08080A]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer">
            <BrandLogo size={36} glow={false} />
            <span className="font-display text-sm text-white uppercase tracking-wide hidden sm:block">Wukong & Aquiles</span>
          </div>
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${active === link.id ? "bg-white/5 text-white" : "text-zinc-500 hover:text-white"}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="/auth/register" className="hidden sm:inline-flex px-5 py-2 bg-red-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-500 active:scale-95 transition-all">
              Inscribirse
            </a>
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
              {isMenuOpen ? <X className="w-6 h-6 text-zinc-300" /> : <Menu className="w-6 h-6 text-zinc-300" />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08080A]/95 backdrop-blur-xl pt-24 px-6 flex flex-col gap-6 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-display uppercase tracking-wide border-b border-white/5 pb-4 ${active === link.id ? link.color : "text-zinc-400"}`}
              >
                {link.label}
              </a>
            ))}
          </div>
          <a href="/auth/register" className="mt-auto mb-12 flex justify-center py-4 bg-red-600 text-white text-sm font-bold uppercase tracking-widest rounded-2xl">
            Inscribirse Ahora
          </a>
        </div>
      )}

      <HeroSection />
      <DisciplinasSection />
      <SobreLugarSection />
      <EntrenadoresSection />
      <HorariosSection />
      <PreciosSection />
      <ComentariosSection />
      <NoticiasSection />
      <ContactoSection />
      <Footer />
    </div>
  );
}
