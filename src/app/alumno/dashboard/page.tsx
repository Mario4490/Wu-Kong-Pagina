import React, { useEffect, useState } from 'react';
import { User, CreditCard, Award, Bell, LogOut, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    async function fetchAlumnoData() {
      try {
        setLoading(true);

        // 1. Obtener el usuario autenticado
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) throw new Error('No hay sesión activa.');

        // 2. Buscar los datos en la tabla 'alumnos'
        // Asumiendo que la tabla 'alumnos' tiene una relación con el ID de auth.users
        // o que podemos buscar por el nombre/id vinculado a profiles.
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id')
          .eq('id', user.id)
          .single();

        if (profileError) throw new Error('Perfil no encontrado.');

        const { data: alumnoData, error: alumnoError } = await supabase
          .from('alumnos')
          .select('nombre, cinturon, estado, disciplina')
          .eq('id', profile.id) // O la columna que vincule con el profile
          .single();

        if (alumnoError) {
          console.warn("Error fetching alumno data, using fallback:", alumnoError);
          // Fallback si el alumno no tiene registro aún en la tabla 'alumnos'
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
        console.error("Error loading alumno dashboard:", err);
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

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-red-900 p-8 rounded-2xl text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Error de Acceso</h2>
          <p className="text-zinc-400 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-red-600 px-6 py-2 rounded-lg font-bold">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-black italic uppercase tracking-tighter">
            Wu Kong <span className="text-red-600">Alumno</span>
          </h1>
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
            <h2 className="text-3xl font-bold">Bienvenido, {alumno?.nombre}</h2>
            <p className="text-zinc-400">Sigue entrenando duro en {alumno?.disciplina}, guerrero</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Estado de Pago (El Semáforo Dinámico) */}
          <div className={`bg-zinc-900 border p-6 rounded-2xl flex flex-col items-center justify-center text-center transition-colors ${
            alumno?.estado === 'Al día' ? 'border-green-900/50' : 'border-red-900/50'
          }`}>
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border-4 transition-all ${
              alumno?.estado === 'Al día' ? 'bg-green-500/20 text-green-500 border-green-500' : 'bg-red-500/20 text-red-500 border-red-500'
            }`}>
              <CreditCard size={32} />
            </div>
            <h3 className="font-bold text-xl">Estado de Cuenta</h3>
            <p className={`font-bold uppercase text-sm mt-1 ${
              alumno?.estado === 'Al día' ? 'text-green-500' : 'text-red-500'
            }`}>
              {alumno?.estado}
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mb-4 border-4 border-red-500">
              <Award size={32} />
            </div>
            <h3 className="font-bold text-xl">Grado Actual</h3>
            <p className="text-zinc-400 font-medium mt-1">{alumno?.cinturon}</p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-zinc-800 text-zinc-500 flex items-center justify-center mb-4 border-4 border-zinc-700">
              <Bell size={32} />
            </div>
            <h3 className="font-bold text-xl">Notificaciones</h3>
            <p className="text-zinc-400 font-medium mt-1">Cargando avisos...</p>
          </div>
        </div>

        <div className="mt-8 p-12 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500">
          <p>Próximamente: Gestión de comprobantes de pago y calendario de clases.</p>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, href = '#' }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
  return (
    <a href={href} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${active ? 'bg-red-600 text-white' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>
      {icon}
      <span>{label}</span>
    </a>
  );
}

// Helper components to avoid errors if not imported
function AlertCircle(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
