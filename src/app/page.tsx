"use client";

import React, { useState } from "react";
import { 
  Users, Send, CalendarCheck, CreditCard, Flame, 
  Bell, ChevronRight, Shield, Zap, Clock 
} from "lucide-react";

export default function AntigravityDashboard() {
  const [activeTeam, setActiveTeam] = useState<"wukong" | "aquiles">("wukong");
  const [activeTab, setActiveTab] = useState<"resumen" | "alumnos" | "hermes" | "pagos">("resumen");

  const alumnos = [
    { id: 1, nombre: "Lucas Benítez", disciplina: "MMA", cinturon: "Azul", estado: "Al día" },
    { id: 2, nombre: "Marcos Silva", disciplina: "Jiu Jitsu", cinturon: "Morado", estado: "Vencido" },
    { id: 3, nombre: "Camila Torres", disciplina: "Boxeo", cinturon: "Blanco", estado: "Al día" },
  ];

  const hermesAvisos = [
    { id: 1, tipo: "Aviso Vencimiento", destinatario: "Marcos Silva", estado: "Pendiente", hora: "18:00 HS" },
    { id: 2, tipo: "Recibo Digital", destinatario: "Lucas Benítez", estado: "Enviado", hora: "Hace 10m" },
  ];

  return (
    <div className="min-h-screen bg-[#08080A] text-white font-sans selection:bg-red-600 pb-24 overflow-x-hidden">
      
      {/* CABECERA ANTIGRAVITY - CAMBIO DE MARCA FLUÍDO */}
      <header className="sticky top-0 z-50 bg-[#08080A]/80 backdrop-blur-xl border-b border-white/5 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl tracking-tighter shadow-lg transition-all duration-500 ${
              activeTeam === "wukong" 
                ? "bg-gradient-to-br from-red-600 to-red-900 text-white shadow-red-900/30" 
                : "bg-gradient-to-br from-zinc-800 to-black text-red-500 border border-red-900/50"
            }`}>
              {activeTeam === "wukong" ? "WK" : "AQ"}
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-widest uppercase leading-none bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {activeTeam === "wukong" ? "WUKONG" : "AQUILES"}
              </h1>
              <p className="text-xs text-red-500 font-bold tracking-widest uppercase mt-1">
                {activeTeam === "wukong" ? "MMA • Box • BJJ" : "Jiu Jitsu"}
              </p>
            </div>
          </div>

          <div className="flex bg-zinc-900/90 p-1 rounded-xl border border-white/5">
            <button onClick={() => setActiveTeam("wukong")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTeam === "wukong" ? "bg-red-600 text-white" : "text-zinc-500"}`}>WK</button>
            <button onClick={() => setActiveTeam("aquiles")} className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${activeTeam === "aquiles" ? "bg-zinc-800 text-white" : "text-zinc-500"}`}>AQ</button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-6 space-y-6">

        {/* MÉTRICAS GLASSMORPHISM */}
        <section className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-white/5 p-5 rounded-3xl relative overflow-hidden">
            <Users className="w-5 h-5 text-red-500 mb-2 opacity-80" />
            <p className="text-3xl font-black text-white">124</p>
            <p className="text-xs text-zinc-400 font-medium">Alumnos Activos</p>
          </div>
          <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-white/5 p-5 rounded-3xl relative overflow-hidden">
            <CalendarCheck className="w-5 h-5 text-emerald-500 mb-2 opacity-80" />
            <p className="text-3xl font-black text-white">38</p>
            <p className="text-xs text-zinc-400 font-medium">Presentes Hoy</p>
          </div>
        </section>

        {/* NAVEGACIÓN POR GESTOS (SWIPE UI) */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-2 snap-x">
          {[
            { id: "resumen", label: "Inicio", icon: Flame },
            { id: "alumnos", label: "Alumnos", icon: Users },
            { id: "hermes", label: "Hermes", icon: Send },
            { id: "pagos", label: "Caja", icon: CreditCard },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`snap-start flex items-center gap-2 px-6 py-3.5 font-bold text-sm rounded-2xl transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg shadow-red-900/20"
                    : "bg-zinc-900/50 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* VISTAS DINÁMICAS CON ANIMACIÓN DE ENTRADA */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          
          {activeTab === "resumen" && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-red-950/40 to-black border border-red-900/30 p-6 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="flex items-center gap-2 text-[10px] font-black text-red-500 uppercase tracking-widest mb-2">
                    <Zap className="w-3 h-3" /> Hermes Activado
                  </span>
                  <h3 className="text-lg font-bold text-white">Recordatorio de Cuotas</h3>
                  <p className="text-sm text-zinc-400">5 alumnos vencen hoy.</p>
                </div>
                <button onClick={() => setActiveTab("hermes")} className="bg-red-600 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-all">
                  Ejecutar <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6">
                <h3 className="font-bold text-sm mb-5 text-white flex items-center gap-2">
                  <Clock className="w-4 h-4 text-red-500" /> Movimientos Recientes
                </h3>
                <div className="space-y-4">
                  {alumnos.map((alumno) => (
                    <div key={alumno.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center font-bold text-sm text-zinc-300">
                          {alumno.nombre.substring(0,2).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">{alumno.nombre}</p>
                          <p className="text-xs text-zinc-500">{alumno.disciplina}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
                        alumno.estado === "Al día" ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"
                      }`}>
                        {alumno.estado}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "hermes" && (
            <div className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 space-y-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-500/10 rounded-2xl">
                  <Send className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Hermes Bot</h3>
                  <p className="text-xs text-zinc-400">Registro de automatizaciones</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {hermesAvisos.map((aviso) => (
                  <div key={aviso.id} className="p-4 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-white">{aviso.tipo}</p>
                      <p className="text-xs text-zinc-400 mt-1">Para: {aviso.destinatario}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-mono text-zinc-500 mb-1">{aviso.hora}</p>
                      <span className="text-[10px] font-bold bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
                        {aviso.estado}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {(activeTab === "alumnos" || activeTab === "pagos") && (
            <div className="bg-zinc-900/30 border border-white/5 p-10 rounded-3xl text-center space-y-4">
              <Shield className="w-12 h-12 text-red-500 mx-auto opacity-50" />
              <h3 className="font-bold text-xl text-white capitalize">{activeTab}</h3>
              <p className="text-sm text-zinc-500">Módulo en construcción. Conexión con Supabase lista.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}