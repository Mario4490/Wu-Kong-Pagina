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
  const [// eslint-disable-next-line react-hooks/exhaustive-deps
    isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
          <p className="text-zinc-500 font-medium animate-pulse">Cargando tu perfil de guerrero...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex relative overflow-hidden">
      {/* MOBILE HEADER - Solo visible en móvil */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-900/80 backdrop-blur-md border-b border-zinc-800 z-40 flex items-center justify-between px-4">
        <h1 className="text-lg font-black italic uppercase tracking-tighter">
          Wu Kong <span className="text-red-600">Alumno</span>
        </h1>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-zinc-800 rounded-lg active:scale-95 transition-transform"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* OVERLAY - Oscurece la pantalla cuando el menú está abierto en móvil */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR - Responsive Drawer */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 flex items-center justify-between">
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
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

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all active:scale-95"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 pt-20 lg:pt-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Bienvenido, {alumno?.nombre}</h2>
            <p className="text-zinc-400 text-sm md:text-base">Sigue entrenando duro en {alumno?.disciplina}, guerrero</p>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Estado de Pago - Semáforo Dinámico */}
          <div className={`bg-zinc-900 border p-6 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:border-zinc-700 ${
            alumno?.estado === 'Al día' ? 'border-green-900/50' : 'border-red-900/50'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 transition-all ${
              alumno?.estado === 'Al día' ? 'bg-green-500/20 text-green-500 border-green-500' : 'bg-red-500/20 text-red-500 border-red-500'
            }`}>
              <CreditCard size={32} />
            </div>
            <h3 className="font-bold text-xl">Estado de Cuenta</h3>
            <p className={`font-black uppercase text-sm mt-1 ${
              alumno?.estado === 'Al día' ? 'text-green-500' : 'text-red-500'
            }`}>
              {alumno?.estado}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:border-zinc-700">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4 border-4 border-red-500">
              <Award size={32} />
            </div>
            <h3 className="font-bold text-xl">Grado Actual</h3>
            <p className="text-zinc-400 font-medium mt-1">{alumno?.cinturon}</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl flex flex-col items-center justify-center text-center transition-all hover:border-zinc-700">
            <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center mb-4 border-4 border-zinc-700">
              <Bell size={32} />
            </div>
            <h3 className="font-bold text-xl">Notificaciones</h3>
            <p className="text-zinc-400 font-medium mt-1">Cargando avisos...</p>
          </div>
        </div>

        <div className="mt-8 p-12 border-2 border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-500 text-center">
          <p className="text-sm md:text-base">Próximamente: Gestión de comprobantes de pago y calendario de clases.</p>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
  return (
    <a href={href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium active:scale-95 ${active ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </a>
  );
}
