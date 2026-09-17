"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Menu, X, ChevronRight, Star, Clock, MapPin, Phone, Mail, CheckCircle2, Award, ArrowRight
} from "lucide-react";

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

/* =================================================================== */
/*   UI COMPONENTS                                                       */
/* =================================================================== */
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer">
            <Image src="/logo1.png" alt="Wukong Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" />
            <Image src="/logo2.png" alt="Aquiles Logo" width={40} height={40} className="w-10 h-10 object-contain drop-shadow-[0_0_8px_rgba(255,0,0,0.5)] hidden sm:block" />
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Inicio", "Acerca", "Entrenadores", "Comentarios"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">
                {item}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a href="/auth/login" className="hidden sm:block text-sm font-bold uppercase tracking-widest text-zinc-400 hover:text-white transition-colors">Ingresar</a>
            <a href="/auth/register" className="hidden sm:inline-flex items-center justify-center px-6 py-2.5 bg-red-600 text-white text-sm font-bold uppercase tracking-widest rounded-full hover:bg-red-700 transition-colors animate-pulse-glow">
              Inscribirse
            </a>
            <button className="md:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsOpen(true)}>
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[60] bg-black/80 backdrop-blur-2xl transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute top-6 right-6">
          <button className="p-2 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          <Image src="/logo1.png" alt="Wukong" width={80} height={80} className="mb-8" />
          {["Inicio", "Acerca", "Entrenadores", "Comentarios"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl font-bebas tracking-wide text-zinc-400 hover:text-white transition-colors">
              {item}
            </a>
          ))}
          <div className="flex flex-col w-full max-w-xs gap-4 mt-8">
            <a href="/auth/login" className="py-4 text-center border border-white/20 rounded-2xl text-sm font-bold uppercase tracking-widest text-white hover:bg-white/5 transition-colors">Ingresar</a>
            <a href="/auth/register" className="py-4 text-center bg-red-600 rounded-2xl text-sm font-bold uppercase tracking-widest text-white hover:bg-red-700 transition-colors">Inscribirse</a>
          </div>
        </div>
      </div>
    </>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#050505] to-[#050505] z-10" />
        <div className="absolute inset-0 bg-[url('/instalacion-mma.jpg')] bg-cover bg-center opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="flex items-center gap-6 mb-12 reveal">
          <Image src="/logo1.png" alt="Wukong Logo" width={160} height={160} className="w-32 h-32 md:w-48 md:h-48 object-contain animate-float drop-shadow-[0_0_30px_rgba(229,26,34,0.3)]" priority />
          <Image src="/logo2.png" alt="Aquiles Logo" width={160} height={160} className="w-32 h-32 md:w-48 md:h-48 object-contain animate-float drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] delay-1" priority />
        </div>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bebas text-white tracking-wider leading-none mb-6 reveal delay-1 text-glow">
          WUKONG <span className="text-red-600">&</span> AQUILES
        </h1>
        <p className="text-lg md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-12 reveal delay-2 font-medium">
          La máxima expresión del Striking y el Grappling. Forja tu disciplina en el centro de entrenamiento más avanzado.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto reveal delay-3">
          <a href="/auth/register" className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 bg-red-600 overflow-hidden rounded-2xl text-white font-bold uppercase tracking-widest transition-transform hover:scale-105 shadow-[0_0_40px_-10px_rgba(229,26,34,0.6)]">
            <span className="relative z-10">Comenzar Entrenamiento</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <a href="#acerca" className="inline-flex items-center justify-center px-8 py-5 glass border-white/20 rounded-2xl text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Descubrir Dojo
          </a>
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const images = [
    { src: "/instalacion-general.jpg", label: "Área de Entrenamiento", size: "md:col-span-2 md:row-span-2" },
    { src: "/instalacion-jiujitsu.jpg", label: "Tatami de Jiu Jitsu (Aquiles)", size: "md:col-span-1 md:row-span-1" },
    { src: "/instalacion-mma.jpg", label: "Octágono de MMA", size: "md:col-span-1 md:row-span-1" },
    { src: "/instalacion-boxeo.jpg", label: "Ring de Boxeo (Wukong)", size: "md:col-span-2 md:row-span-1" },
  ];

  return (
    <section id="acerca" className="relative py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 reveal">
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wide text-white mb-4">El Dojo</h2>
          <div className="w-24 h-1 bg-red-600" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-none md:grid-rows-2 gap-4 h-auto md:h-[600px] reveal delay-1">
          {images.map((img, i) => (
            <div key={i} className={`relative group overflow-hidden rounded-3xl ${img.size} min-h-[250px]`}>
              <div className="absolute inset-0 bg-zinc-900 animate-pulse" /> {/* Placeholder loading state */}
              <Image src={img.src} alt={img.label} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <div className="w-10 h-10 rounded-full bg-red-600/20 border border-red-600/50 flex items-center justify-center mb-3 backdrop-blur-md">
                  <MapPin className="w-5 h-5 text-red-500" />
                </div>
                <h3 className="text-2xl font-bebas tracking-wide text-white">{img.label}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Coaches() {
  const coaches = [
    { id: "mg", name: "Marcos García", role: "Head Coach Wukong", discipline: "Boxeo", img: "/logo1.png", color: "from-red-900 to-black", text: "Especialista en striking y estrategia de ring. +10 años de experiencia." },
    { id: "da", name: "Mestre Diego", role: "Líder Aquiles", discipline: "Jiu Jitsu", img: "/logo2.png", color: "from-zinc-800 to-black", text: "Faixa Preta enfocado en control absoluto y sumisiones de alto nivel." },
    { id: "lr", name: "Luis Romero", role: "Coach MMA", discipline: "MMA", img: null, color: "from-red-950 to-zinc-900", text: "Ex-luchador profesional. Integración perfecta de grappling y striking." },
  ];

  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section id="entrenadores" className="relative py-32 bg-[#08080a] overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 text-center reveal">
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wide text-white mb-4">Líderes de Disciplina</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">Selecciona un entrenador para ver sus credenciales de combate.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20">
          {coaches.map((coach, i) => {
            const isActive = activeId === coach.id;
            return (
              <div 
                key={coach.id} 
                className={`reveal delay-${i+1} relative cursor-pointer group`}
                onMouseEnter={() => setActiveId(coach.id)}
                onMouseLeave={() => setActiveId(null)}
              >
                {/* Burbuja Principal */}
                <div className={`w-48 h-48 md:w-64 md:h-64 rounded-full p-1 transition-all duration-500 ease-out transform ${isActive ? 'scale-110 shadow-[0_0_50px_rgba(229,26,34,0.3)]' : 'scale-100 opacity-70 hover:opacity-100'} bg-gradient-to-br ${coach.color} border border-white/10`}>
                  <div className="w-full h-full rounded-full overflow-hidden bg-[#050505] flex items-center justify-center relative">
                    {coach.img ? (
                      <Image src={coach.img} alt={coach.name} width={120} height={120} className="w-1/2 h-1/2 object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <span className="text-5xl font-bebas text-zinc-700">{coach.name.charAt(0)}</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-6 left-0 right-0 text-center">
                      <h3 className="text-2xl font-bebas text-white tracking-wider">{coach.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-widest text-red-500">{coach.discipline}</p>
                    </div>
                  </div>
                </div>

                {/* Popover Detalle (Desktop) */}
                <div className={`absolute top-1/2 left-full ml-8 w-64 glass-card rounded-2xl p-6 transition-all duration-500 origin-left hidden md:block z-20 ${isActive ? 'opacity-100 scale-100 translate-x-0' : 'opacity-0 scale-95 -translate-x-4 pointer-events-none'}`}>
                  <h4 className="text-xl font-bebas text-white tracking-wide mb-1">{coach.role}</h4>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">{coach.text}</p>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-red-500 hover:border-red-500/50 transition-colors"><Mail className="w-4 h-4" /></button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-red-500 hover:border-red-500/50 transition-colors"><Phone className="w-4 h-4" /></button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    { text: "El nivel de exigencia técnica en Jiu Jitsu es increíble. Mestre Diego realmente se enfoca en los detalles.", author: "Santiago V.", role: "Faixa Azul" },
    { text: "Instalaciones de primer nivel. El ring de boxeo y el área de pesas están impecables. El mejor dojo de la ciudad.", author: "Lucas M.", role: "Boxeo Amateur" },
    { text: "Entrenar MMA aquí cambió mi perspectiva. La integración de disciplinas que enseña Luis es brutal.", author: "Camila R.", role: "Competidora" },
  ];

  return (
    <section id="comentarios" className="py-32 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center reveal">
          <h2 className="text-5xl md:text-7xl font-bebas tracking-wide text-white mb-4">La Comunidad</h2>
          <p className="text-zinc-500 font-medium tracking-wide uppercase text-sm">Lo que dicen los guerreros</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <div key={i} className={`glass-card rounded-3xl p-8 relative overflow-hidden reveal delay-${i+1} group`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-red-600/10 transition-colors" />
              <Star className="w-8 h-8 text-red-600 mb-6" />
              <p className="text-zinc-300 text-lg leading-relaxed font-medium mb-8">"{r.text}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center">
                  <span className="font-bebas text-xl text-zinc-500">{r.author.charAt(0)}</span>
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

function Footer() {
  return (
    <footer className="py-12 bg-black border-t border-white/5 text-center">
      <Image src="/logo1.png" alt="Wukong" width={48} height={48} className="mx-auto mb-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
      <p className="text-zinc-500 text-sm font-medium">© {new Date().getFullYear()} Wukong & Aquiles Academy. Todos los derechos reservados.</p>
    </footer>
  );
}

export default function HomePage() {
  useScrollReveal();

  return (
    <div className="min-h-screen bg-[#050505]">
      <Nav />
      <Hero />
      <Gallery />
      <Coaches />
      <Testimonials />
      <Footer />
    </div>
  );
}
