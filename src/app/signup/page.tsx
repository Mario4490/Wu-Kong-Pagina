"use client";

import React, { useState } from 'react';
import { supabase } from '@/infrastructure/supabase/client';
import { useRouter } from 'next/navigation';
import { UserPlus, Mail, Lock, User, Phone, AlertCircle, Loader2 } from 'lucide-react';

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    telefono: '',
    disciplina: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Crear el usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // 2. Crear el perfil en la tabla 'profiles' con rol 'alumno'
        // Según la Nota Maestra y yop22.txt: id, nombre, telefono, rol, disciplina_principal
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              nombre: formData.nombre,
              telefono: formData.telefono,
              rol: 'alumno',
              disciplina_principal: formData.disciplina,
            },
          ]);

        if (profileError) throw new Error('Error al crear el perfil de alumno. Intenta contactar al administrador.');

        // 3. (Opcional) Podríamos crear también la entrada en la tabla 'alumnos'
        // para el seguimiento de cinturones y estado de pago.
        await supabase
          .from('alumnos')
          .insert([
            {
              nombre: formData.nombre,
              disciplina: formData.disciplina,
              estado: 'Al día', // Por defecto al inscribirse
            },
          ]);

        router.push('/alumno/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al registrar la cuenta.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white p-4">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
            Únete al <span className="text-red-600">Dojo</span>
          </h1>
          <p className="text-zinc-400 text-sm">Inicia tu camino en las artes marciales</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-red-600" />

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Nombre */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Nombre Completo</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    name="nombre"
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    placeholder="Tu nombre"
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Teléfono</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    name="telefono"
                    type="text"
                    required
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    placeholder="+54 ..."
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Disciplina */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Disciplina de Interés</label>
                <div className="relative">
                  <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    name="disciplina"
                    type="text"
                    required
                    value={formData.disciplina}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    placeholder="Ej. Boxeo, MMA, Jiu Jitsu"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-zinc-500 ml-1">Correo Electrónico</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-3 px-10 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-zinc-800 disabled:text-zinc-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Inscribiéndose...
                </>
              ) : (
                'Crear Cuenta de Guerrero'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-500 text-sm">
          ¿Ya tienes cuenta? <a href="/login" className="text-red-500 hover:underline font-bold">Inicia sesión aquí</a>
        </p>
      </div>
    </div>
  );
}
