"use client";

import React, { useEffect, useState } from 'react';
import { Bell, LogOut, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';

interface Aviso {
  id: string;
  tipo_aviso: 'cobro' | 'institucional' | 'urgente';
  contenido: string;
  estado: 'leido' | 'pendiente';
  fecha_creacion: string;
}

export default function AvisosPage() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchAvisos() {
      try {
        setLoading(true);

        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('Sesión no válida');

        // Consultamos la tabla 'hermes_avisos' filtrando por el alumno actual
        // Según yop22.txt, la tabla tiene: alumno_id, tipo_aviso, estado, fecha_visto
        const { data, error: fetchError } = await supabase
          .from('hermes_avisos')
          .select('*')
          .eq('alumno_id', user.id)
          .order('fecha_creacion', { ascending: false });

        if (fetchError) throw fetchError;
        setAvisos(data || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAvisos();
  }, []);

  const markAsRead = async (avisoId: string) => {
    try {
      const { error } = await supabase
        .from('hermes_avisos')
        .update({ estado: 'leido', fecha_visto: new Date().toISOString() })
        .eq('id', avisoId);

      if (error) throw error;

      setAvisos(prev => prev.map(a => a.id === avisoId ? { ...a, estado: 'leido' } : a));
    } catch (err: any) {
      console.error("Error marcando como leído:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar simplificado para subpágina */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
            Wu Kong <span className="text-red-600">Alumno</span>
          </h1>
        </div>
        <div className="p-4">
          <button
            onClick={() => router.push('/alumno/dashboard')}
            className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all w-full"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Volver al Panel</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-red-600 rounded-xl">
            <Bell className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold">Centro de Avisos</h2>
            <p className="text-zinc-400">Mensajes directos del Dojo y tus entrenadores</p>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-red-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-red-500 text-center">
            {error}
          </div>
        ) : avisos.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-12 rounded-2xl text-center space-y-4">
            <Bell className="mx-auto text-zinc-700" size={48} />
            <p className="text-zinc-500">No tienes avisos pendientes. ¡Sigue entrenando!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {avisos.map((aviso) => (
              <div
                key={aviso.id}
                className={`p-6 rounded-2xl border transition-all ${
                  aviso.estado === 'pendiente'
                    ? 'bg-zinc-900 border-red-600/50 shadow-lg shadow-red-600/5'
                    : 'bg-zinc-900/50 border-zinc-800 opacity-70'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    {aviso.tipo_aviso === 'cobro' ? (
                      <span className="px-2 py-1 rounded bg-amber-500/20 text-amber-500 text-[10px] font-bold uppercase">💰 Pago</span>
                    ) : aviso.tipo_aviso === 'urgente' ? (
                      <span className="px-2 py-1 rounded bg-red-500/20 text-red-500 text-[10px] font-bold uppercase">🚨 Urgente</span>
                    ) : (
                      <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-500 text-[10px] font-bold uppercase">📢 Info</span>
                    )}
                    <span className="text-zinc-500 text-xs">{new Date(aviso.fecha_creacion).toLocaleDateString()}</span>
                  </div>
                  {aviso.estado === 'pendiente' && (
                    <button
                      onClick={() => markAsRead(aviso.id)}
                      className="text-xs font-bold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                    >
                      <CheckCircle size={14} />
                      Marcar como leído
                    </button>
                  )}
                </div>
                <p className="text-zinc-200 leading-relaxed">{aviso.contenido}</p>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
