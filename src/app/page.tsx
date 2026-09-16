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
