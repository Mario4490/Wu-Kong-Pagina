"use client";

import React from 'react';
import { LayoutDashboard, Users, Calendar, CreditCard, LogOut } from 'lucide-react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';

export default function CoachDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
            Wu Kong <span className="text-red-600">Coach</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Mi Panel" active />
          <NavItem icon={<Users size={20} />} label="Mis Alumnos" />
          <NavItem icon={<Calendar size={20} />} label="Horarios" />
          <NavItem icon={<CreditCard size={20} />} label="Cobros" />
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all"
          >
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Panel del Instructor</h2>
            <p className="text-zinc-400">Gestión de alumnos y entrenamiento</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Próximas Clases</h3>
            <div className="space-y-3 text-zinc-400 text-sm">
              <p>18:00 - Boxeo Grupal (Salón A)</p>
              <p>19:30 - MMA Particular (Juan Pérez)</p>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4">Asistencia Pendiente</h3>
            <div className="space-y-3 text-zinc-400 text-sm">
              <p>Revisar asistencia de clase 17:00</p>
            </div>
          </div>
        </div>

        <div className="mt-8 p-12 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
          <p>El contenido detallado del panel Coach se implementará en la siguiente fase.</p>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${active ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}
