"use client";

import React, { useEffect, useState } from 'react';
import { User, CreditCard, Award, Bell, LogOut, Loader2, Menu, X } from 'lucide-react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';

interface AlumnoData {
  nombre: string;
  cinturon: string;
  estado: 'Al día' | 'Pendiente' | 'Vencido';
  disciplina: string;
}

export default function AlumnoDashboard() {
  const router = useRouter();
  const [alumno, setAlumno] = useState<AlumnoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    async function fetchAlumnoData() {
      try {
        setLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('No hay sesión activa.');

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (profileError) throw new Error('Perfil no encontrado.');

        const { data: alumnoData, error: alumnoError } = await supabase
          .from('alumnos')
          .select('nombre, cinturon, estado, disciplina')
          .eq('id', profile.id)
          .single();

        if (alumnoError) {
          setAlumno({
            nombre: user.email?.split('@')[0] || 'Guerrero',
            cinturon: 'Blanco',
            estado: 'Pendiente',
            disciplina: 'No asignada'
          });
        } else {
          setAlumno(alumnoData as unknown as AlumnoData);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAlumnoData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
          <p className="text-zinc-500 font-medium animate-pulse uppercase tracking-widest text-xs">Cargando perfil de guerrero...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex relative overflow-hidden">
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-black/80 backdrop-blur-md border-b border-white/5 z-40 flex items-center justify-between px-4">
        <h1 className="text-lg font-bebas tracking-wider uppercase">
          Wu Kong <span className="text-red-600">Alumno</span>
        </h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-white/5 rounded-lg active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#08080a] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-2xl font-bebas tracking-wider uppercase">
            Wu Kong <span className="text-red-600">Alumno</span>
          </h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-1 text-zinc-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<User size={20} />} label="Mi Perfil" active />
          <NavItem icon={<CreditCard size={20} />} label="Mis Pagos" href="/alumno/pagos" />
          <NavItem icon={<Award size={20} />} label="Mi Grado" />
          <NavItem icon={<Bell size={20} />} label="Avisos" href="/alumno/avisos" />
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all active:scale-95"
          >
            <LogOut size={20} />
            <span className="font-medium text-xs uppercase tracking-widest">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8 overflow-y-auto">
        <header className="mb-12 flex justify-between items-center reveal">
          <div>
            <h2 className="text-4xl md:text-6xl font-bebas tracking-wide">Bienvenido, {alumno?.nombre}</h2>
            <p className="text-zinc-500 text-xs md:text-sm uppercase tracking-widest font-bold mt-2">
              Entrenando en <span className="text-red-500">{alumno?.disciplina}</span>
            </p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estado de Pago - Glass Card */}
          <div className={`glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:border-red-600/40 border ${
            alumno?.estado === 'Al día' ? 'border-green-500/20' : 'border-red-500/20'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 border-4 transition-all ${
              alumno?.estado === 'Al día' ? 'bg-green-500/10 text-green-500 border-green-500' : 'bg-red-500/10 text-red-500 border-red-500'
            }`}>
              <CreditCard size={32} />
            </div>
            <h3 className="font-bebas text-2xl tracking-wide text-white">Estado de Cuenta</h3>
            <p className={`font-black uppercase text-sm mt-2 tracking-widest ${
              alumno?.estado === 'Al día' ? 'text-green-500' : 'text-red-500'
            }`}>
              {alumno?.estado}
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:border-red-600/40 border border-white/5">
            <div className="w-20 h-20 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center mb-6 border-4 border-red-600">
              <Award size={32} />
            </div>
            <h3 className="font-bebas text-2xl tracking-wide text-white">Grado Actual</h3>
            <p className="text-zinc-400 font-bold uppercase text-xs tracking-widest mt-2">{alumno?.cinturon}</p>
          </div>

          <div className="glass-card p-8 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:border-red-600/40 border border-white/5">
            <div className="w-20 h-20 rounded-full bg-white/5 text-zinc-500 flex items-center justify-center mb-6 border-4 border-white/10">
              <Bell size={32} />
            </div>
            <h3 className="font-bebas text-2xl tracking-wide text-white">Notificaciones</h3>
            <p className="text-zinc-500 font-medium text-xs uppercase tracking-widest mt-2">Cargando avisos...</p>
          </div>
        </div>

        <div className="mt-12 p-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-zinc-600 text-center bg-white/[0.02]">
          <p className="text-xs md:text-sm uppercase tracking-widest font-bold">Próximamente: Gestión de comprobantes de pago y calendario de clases.</p>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
  return (
    <a href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold uppercase tracking-widest active:scale-95 ${active ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-500 hover:bg-white/5 hover:text-white text-[10px]'}`}>
      {icon}
      <span className="text-[11px]">{label}</span>
    </a>
  );
}
