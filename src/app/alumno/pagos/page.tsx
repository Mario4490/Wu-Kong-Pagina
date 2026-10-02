"use client";

import React, { useEffect, useState } from 'react';
import { CreditCard, Upload, FileText, CheckCircle, Clock, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';

interface Pago {
  id: string;
  monto: number;
  fecha_pago: string;
  metodo_pago: string;
  estado: 'confirmado' | 'pendiente' | 'rechazado';
}

export default function PagosPage() {
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchPagos();
  }, []);

  async function fetchPagos() {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No hay sesión activa');

      const { data, error: fetchError } = await supabase
        .from('pagos')
        .select('*')
        .eq('alumno_id', user.id)
        .order('fecha_pago', { ascending: false });

      if (fetchError) throw fetchError;
      setPagos(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const handleUploadPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Sesión no válida');

      const fileName = `pagos/${user.id}/${Date.now()}-${file.name}`;
      const { error: uploadError } = await supabase.storage
        .from('comprobantes')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { error: dbError } = await supabase
        .from('pagos')
        .insert([
          {
            alumno_id: user.id,
            monto: 0,
            fecha_pago: new Date().toISOString(),
            metodo_pago: 'Comprobante Subido',
            comprobante_url: fileName,
            estado: 'pendiente'
          },
        ]);

      if (dbError) throw dbError;

      alert('Comprobante enviado con éxito. El profesor lo validará pronto.');
      setFile(null);
      fetchPagos();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex">
      <aside className="w-64 bg-[#08080a] border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bebas tracking-wider uppercase">
            Wu Kong <span className="text-red-600">Alumno</span>
          </h1>
        </div>
        <div className="p-4">
          <button
            onClick={() => router.push('/alumno/dashboard')}
            className="flex items-center gap-3 px-4 py-3 text-zinc-500 hover:text-white hover:bg-white/5 rounded-xl transition-all w-full text-xs uppercase tracking-widest font-bold"
          >
            <ArrowLeft size={20} />
            <span>Volver al Panel</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8">
        <header className="mb-12 flex items-center gap-4 reveal">
          <div className="p-3 bg-red-600 rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.4)]">
            <CreditCard className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-4xl font-bebas tracking-wide">Mis Pagos y Cuotas</h2>
            <p className="text-zinc-500 text-xs uppercase tracking-widest font-bold">Gestión de mensualidades y comprobantes</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulario de Carga */}
          <div className="lg:col-span-1">
            <div className="glass-card border border-white/5 p-6 rounded-3xl sticky top-8">
              <h3 className="text-xl font-bebas tracking-wide mb-6 flex items-center gap-2 text-white">
                <Upload size={20} className="text-red-600" />
                Subir Comprobante
              </h3>
              <form onSubmit={handleUploadPayment} className="space-y-4">
                <div className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center hover:border-red-600/50 transition-all cursor-pointer relative group bg-white/[0.02]">
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center gap-3">
                    <FileText className="text-zinc-600 group-hover:text-red-500 transition-colors" size={40} />
                    <p className="text-xs text-zinc-500 tracking-wide">
                      {file ? <span className="text-red-400 font-bold">{file.name}</span> : 'Sube tu comprobante aquí'}
                    </p>
                  </div>
                </div>
                {error && (
                  <div className="flex items-center gap-2 text-red-500 text-xs bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                    <AlertCircle size={14} />
                    <p>{error}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={!file || uploading}
                  className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 uppercase text-xs tracking-widest shadow-[0_0_20px_rgba(220,38,38,0.3)] active:scale-95"
                >
                  {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Enviar al Dojo'}
                </button>
              </form>
            </div>
          </div>

          {/* Historial de Pagos */}
          <div className="lg:col-span-2 space-y-6">
            <h3 className="text-2xl font-bebas tracking-wide text-white">Historial de Transacciones</h3>
            {loading ? (
              <div className="flex justify-center p-12"><Loader2 className="animate-spin text-red-600" size={40} /></div>
            ) : pagos.length === 0 ? (
              <div className="glass-card border border-white/5 p-12 rounded-3xl text-center text-zinc-500">
                <p className="text-sm uppercase tracking-widest font-bold">No hay registros de pagos encontrados.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {pagos.map((pago) => (
                  <div key={pago.id} className="glass-card border border-white/5 p-5 rounded-2xl flex items-center justify-between hover:border-red-600/30 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full transition-colors ${
                        pago.estado === 'confirmado' ? 'bg-green-500/10 text-green-500' :
                        pago.estado === 'pendiente' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {pago.estado === 'confirmado' ? <CheckCircle size={20} /> : <Clock size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-white uppercase text-xs tracking-wider">{pago.metodo_pago}</p>
                        <p className="text-xs text-zinc-500">{new Date(pago.fecha_pago).toLocaleDateString()} - ${pago.monto}</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full transition-all ${
                      pago.estado === 'confirmado' ? 'bg-green-500/20 text-green-500' :
                      pago.estado === 'pendiente' ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
                    }`}>
                      {pago.estado}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
