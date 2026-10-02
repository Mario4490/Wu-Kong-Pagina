"use client";

import React from 'react';
import { LayoutDashboard, Users, CreditCard, Bell, Settings, LogOut } from 'lucide-react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
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
            Wu Kong <span className="text-red-600">Admin</span>
          </h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
          <NavItem icon={<Users size={20} />} label="Gestión Usuarios" />
          <NavItem icon={<CreditCard size={20} />} label="Tarifas y Pagos" />
          <NavItem icon={<Bell size={20} />} label="Notificaciones" />
          <NavItem icon={<Settings size={20} />} label="Configuración" />
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
            <h2 className="text-3xl font-bold">Panel de Control</h2>
            <p className="text-zinc-400">Bienvenido, Super Administrador</p>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Alumnos Activos" value="124" change="+12%" />
          <StatCard label="Recaudación Mes" value="$450,000" change="+5%" />
          <StatCard label="Alertas de Pago" value="18" change="-2%" />
        </div>

        <div className="mt-8 p-12 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
          <p>El contenido detallado del panel Admin se implementará en la siguiente fase.</p>
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

function StatCard({ label, value, change }: { label: string, value: string, change: string }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
      <p className="text-zinc-500 text-sm font-medium">{label}</p>
      <div className="flex items-end justify-between mt-2">
        <h3 className="text-3xl font-bold">{value}</h3>
        <span className="text-green-500 text-xs font-bold">{change}</span>
      </div>
    </div>
  );
}
