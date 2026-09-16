"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Shield, Scroll, Users, Calendar, MapPin, Phone, Mail, Menu, X,
  ChevronRight, Star, Zap, Award, Clock, CheckCircle2, AlertTriangle,
  Instagram, Facebook, Target, Dumbbell, Flame, Trophy, Send, ChevronDown,
} from "lucide-react";

/* --- HOOK: Scroll Reveal --- */
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

/* --- HOOK: Active Section --- */
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

/* --- HOOK: Counter --- */
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

/* --- BrandLogo --- */
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

/* --- StarRating --- */
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < count ? "text-amber-400 fill-amber-400" : "text-zinc-600"}`} />
      ))}
    </div>
  );
}

/* --- SectionHeader --- */
function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="text-center mb-16 reveal">
      <span className="text-xs font-bold tracking-[0.35em] uppercase text-red-500 mb-3 block">{eyebrow}</span>
      <h2 className="font-display text-4xl sm:text-5xl text-white uppercase tracking-wide">{title}</h2>
      <div className="w-20 h-0.5 bg-gradient-to-r from-red-600 to-transparent mx-auto mt-5" />
    </div>
  );
}

/* --- StatItem --- */
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

/* =====================================================================
   HERO SECTION
   ===================================================================== */
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
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl text-white uppercase tracking-wide leading-none">Wukong</h1>
            <p className="text-sm font-bold tracking-[0.35em] uppercase text-red-400">Academia de Artes Marciales</p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/15 border border-red-600/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-8">
          <Flame className="w-3.5 h-3.5" />
          Buenos Aires · Desde 2010
        </div>
        <p className="text-zinc-300 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
          Forja tu disciplina con los mejores. Karate, Boxeo y MMA para todos los niveles — desde principiante hasta competicion.
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

/* =====================================================================
   DISCIPLINAS SECTION (NUEVA)
   ===================================================================== */
const disciplinas = [
  { icon: Target,   nombre: "Karate Do",  estilo: "Shotokan",              descripcion: "Arte marcial japones tradicional. Desarrolla tecnica, katas y kumite en un ambiente de respeto y disciplina.", niveles: ["Principiante","Intermedio","Avanzado","Competicion"], color: "from-red-950/60 to-transparent",    accent: "text-red-400",   border: "border-red-900/30"  },
  { icon: Dumbbell, nombre: "Boxeo",       estilo: "Tecnico y Combate",     descripcion: "Aprende los fundamentos del noble arte: jab, cross, gancho, esquivas y estrategia de ring.",                   niveles: ["Fitness","Tecnico","Sparring","Amateur"],           color: "from-amber-950/40 to-transparent", accent: "text-amber-400", border: "border-amber-900/30"},
  { icon: Flame,    nombre: "MMA",         estilo: "Artes Marciales Mixtas",descripcion: "La disciplina mas completa: striking, clinch, grappling y ground-and-pound integrados en un solo sistema.",    niveles: ["Bases","Integrado","Avanzado","Competicion"],       color: "from-zinc-900/80 to-transparent",  accent: "text-zinc-300",  border: "border-white/10"    },
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

/* =====================================================================
   SOBRE EL LUGAR
   ===================================================================== */
function SobreLugarSection() {
  const fotos = [
    { src: "/instalacion-general.jpg", label: "Area general de entrenamiento" },
    { src: "/instalacion-mma.jpg",     label: "Octagono de MMA"               },
    { src: "/instalacion-karate.jpg",  label: "Clases de Karate"              },
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

/* =====================================================================
   ENTRENADORES
   ===================================================================== */
const entrenadores = [
  { foto:"/entrenador-karate.jpg", iniciales:null, nombre:"Sensei Hiroshi Tanaka", disciplina:"Karate Do Shotokan",      cinturon:"5 Dan",    descripcion:"Responsable de la Division de Karate. +12 anos formando instructores en tecnica Shotokan.", logros:["Medallista nacional 2018","Instructor certificado JKA"] },
  { foto:null, iniciales:"MG",                    nombre:"Prof. Marcos Garcia",   disciplina:"Boxeo Profesional",        cinturon:"Ex-amateur",descripcion:"Entrenador principal de Boxeo. Especialista en tecnica de guantes y estrategia de ring.",   logros:["8 anos de carrera amateur","Campeon Provincial 2015"]   },
  { foto:null, iniciales:"LR",                    nombre:"Coach Luis Romero",     disciplina:"MMA Artes Marciales Mixtas",cinturon:"Ex-fighter",descripcion:"Ex-luchador con background BJJ y Muay Thai. Lidera la division MMA y entrenamiento integrado.", logros:["10 peleas profesionales","Cinturon azul BJJ"]           },
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
              <span className="inline-block px-3 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">{t.cinturon}</span>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1 mb-4">{t.descripcion}</p>
              <div className="w-full space-y-1.5 mb-5">
                {t.logros.map((l) => (
                  <div key={l} className="flex items-center gap-2 text-xs text-zinc-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />{l}
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

/* =====================================================================
   HORARIOS (NUEVA)
   ===================================================================== */
const horarios = [
  {dia:"Lunes",    karate:"8:00 / 19:00", boxeo:"10:00 / 20:00", mma:"—"},
  {dia:"Martes",   karate:"—",             boxeo:"9:00 / 19:00",  mma:"20:30"},
  {dia:"Miercoles",karate:"8:00 / 19:00", boxeo:"10:00 / 20:00", mma:"—"},
  {dia:"Jueves",   karate:"—",             boxeo:"9:00 / 19:00",  mma:"20:30"},
  {dia:"Viernes",  karate:"8:00 / 18:00", boxeo:"10:00 / 19:00", mma:"20:00"},
  {dia:"Sabado",   karate:"9:00",          boxeo:"10:00",         mma:"11:30"},
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
                <th className="text-left p-5 text-xs font-bold uppercase tracking-widest text-zinc-500">Dia</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-red-400">Karate</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-amber-400">Boxeo</th>
                <th className="text-center p-5 text-xs font-bold uppercase tracking-widest text-zinc-300">MMA</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((row, i) => (
                <tr key={row.dia} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i%2===0?"":"bg-white/[0.015]"}`}>
                  <td className="p-5 text-sm font-bold text-white">{row.dia}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.karate}</td>
                  <td className="p-5 text-sm text-center text-zinc-400 font-mono">{row.boxeo}</td>
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

/* =====================================================================
   PRECIOS (NUEVA)
   ===================================================================== */
const planes = [
  { nombre:"Starter", precio:15000, descripcion:"Ideal para comenzar", features:["1 disciplina","Hasta 3 clases semanales","Vestuarios incluidos","Evaluacion inicial"], cta:"Comenzar", destacado:false, color:"border-white/10",       badge:null,        accentBtn:"bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10" },
  { nombre:"Fighter", precio:25000, descripcion:"El plan mas popular",  features:["2 disciplinas","Clases ilimitadas","Vestuarios incluidos","Evaluacion mensual","Acceso a sparring","Descuento en equipamiento"], cta:"Elegir Fighter", destacado:true, color:"border-red-600/40",  badge:"Mas popular", accentBtn:"bg-red-600 text-white hover:bg-red-500 shadow-lg shadow-red-900/30" },
  { nombre:"Elite",   precio:38000, descripcion:"Para competidores serios", features:["Todas las disciplinas","Clases ilimitadas","Clases particulares (2/mes)","Preparacion torneos","Nutricion basica","Kit de bienvenida"], cta:"Unirse a Elite", destacado:false, color:"border-amber-600/30", badge:"Incluye kit", accentBtn:"bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10" },
];

function PreciosSection() {
  return (
    <section id="precios" className="relative py-28 px-4 bg-[#08080A]" aria-labelledby="precios-heading">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Planes y tarifas" title="Precios" />
        <div className="grid md:grid-cols-3 gap-6">
          {planes.map((plan, i) => (
            <div key={plan.nombre} className={`reveal reveal-delay-${i+1} card-hover relative rounded-3xl border ${plan.color} p-7 flex flex-col ${plan.destacado ? "bg-gradient-to-b from-red-950/30 to-[#0f0f13]" : "bg-[#0f0f13]"}`}>
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${plan.destacado ? "bg-red-600 text-white" : "bg-amber-600/80 text-white"}`}>{plan.badge}</span>
                </div>
              )}
              <h3 className="font-display text-2xl text-white uppercase tracking-wide mb-0.5">{plan.nombre}</h3>
              <p className="text-xs text-zinc-500 mb-5">{plan.descripcion}</p>
              <div className="mb-6">
                <span className="font-display text-5xl text-white">${Math.floor(plan.precio/1000)}k</span>
                <span className="text-zinc-500 text-sm ml-1">/ mes</span>
              </div>
              <ul className="space-y-2.5 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-zinc-400">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.destacado ? "text-red-400" : "text-amber-500"}`} />{f}
                  </li>
                ))}
              </ul>
              <a href="/auth/register" className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold uppercase tracking-widest transition-all duration-200 ${plan.accentBtn}`}>{plan.cta}</a>
            </div>
          ))}
        </div>
        <p className="text-center text-zinc-600 text-xs mt-8 reveal reveal-delay-4">Precios en ARS. Consultar descuentos para estudiantes, menores y pago anual.</p>
      </div>
    </section>
  );
}

/* =====================================================================
   COMENTARIOS
   ===================================================================== */
const comentarios = [
  {inicial:"MF",nombre:"Martin F.",    disciplina:"Karate", rating:5, texto:"Ambiente excelente, los instructores ponen mucha dedicacion. Note mejora desde los primeros meses."},
  {inicial:"LS",nombre:"Laura S.",     disciplina:"Boxeo",  rating:5, texto:"Empece sin saber nada y en 3 meses ya entiendo todo. El profe Marcos es muy paciente y claro."},
  {inicial:"JR",nombre:"Jorge R.",     disciplina:"MMA",    rating:5, texto:"Llevo 2 anos entrenando MMA aca. La calidad es de primer nivel, te preparan bien para competir."},
  {inicial:"CA",nombre:"Camila A.",    disciplina:"Karate", rating:5, texto:"El Sensei Tanaka tiene un conocimiento increible. Las katas me abrieron puertas a competencias nacionales."},
  {inicial:"FP",nombre:"Fernando P.",  disciplina:"Boxeo",  rating:4, texto:"Muy buenas instalaciones y grupo humano. El ring esta en perfectas condiciones. Recomendado 100%."},
  {inicial:"VM",nombre:"Valentina M.", disciplina:"MMA",    rating:5, texto:"Como mujer me senti super bienvenida. El ambiente es respetuoso y los entrenamientos muy bien llevados."},
];

function ComentariosSection() {
  return (
    <section id="comentarios" className="relative py-28 px-4 bg-white/[0.02]" aria-labelledby="comentarios-heading">
      <div className="max-w-5xl mx-auto">
        <SectionHeader eyebrow="Opiniones" title="Testimonios" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {comentarios.map((c, i) => (
            <div key={c.nombre} className={`reveal reveal-delay-${(i%3)+1} card-hover p-6 rounded-2xl bg-[#0f0f13] border border-white/5 hover:border-white/10 flex flex-col gap-4`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-900/60 to-zinc-800 border border-red-900/30 flex-shrink-0 flex items-center justify-center font-bold text-sm text-zinc-300">{c.inicial}</div>
                <div>
                  <h4 className="font-bold text-white text-sm">{c.nombre}</h4>
                  <span className="text-xs text-red-400 font-semibold uppercase tracking-wider">{c.disciplina}</span>
                </div>
                <div className="ml-auto"><StarRating count={c.rating} /></div>
              </div>
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">"{c.texto}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
