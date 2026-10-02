"use client";

import React, { useState } from 'react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Autenticación con Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Obtener el Rol desde la tabla 'profiles'
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('rol')
          .eq('id', authData.user.id)
          .single();

        if (profileError) throw new Error('No se pudo obtener el perfil del usuario.');

        const role = profileData?.rol;

        // 3. Redirección Inteligente según el Rol
        switch (role) {
          case 'admin':
            router.push('/admin/dashboard');
            break;
          case 'coach':
            router.push('/coach/dashboard');
            break;
          case 'alumno':
            router.push('/alumno/dashboard');
            break;
          default:
            throw new Error('El usuario no tiene un rol asignado válido.');
        }
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al iniciar sesión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Wu Kong <span className="text-red-600">Portal</span>
          </h1>
          <p className="text-zinc-400 text-sm">Ingresa tus credenciales para acceder al Dojo</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Detalle decorativo rojo */}
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    placeholder="ejemplo@correo.com"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Contraseña</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Accediendo...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-zinc-500 text-xs">
          &copy; {new Date().getFullYear()} Wukong Dojo. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
