// src/infrastructure/supabase/avisos.repository.ts
import { HermesAviso } from "../../domain/avisos/entity";
import { AvisoId, AlumnoId, EstadoAviso, TipoAviso } from "../../domain/avisos/value-objects";
import { HermesAvisoRepository } from "../../domain/avisos/repository";
import { supabase } from "./client";

export class SupabaseHermesAvisoRepository implements HermesAvisoRepository {
  async guardar(aviso: HermesAviso): Promise<void> {
    const { error } = await supabase.from("hermes_avisos").insert(this.mapearAHilo(aviso));
    if (error) throw new Error(`Error al guardar aviso: ${error.message}`);
  }

  async buscarPorId(id: AvisoId): Promise<HermesAviso | null> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .eq("id", id.valor)
      .single();
    if (error || !data) return null;
    return this.mapearDesdeFila(data);
  }

  async buscarPorAlumno(alumnoId: AlumnoId): Promise<HermesAviso[]> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .eq("alumno_id", alumnoId.valor)
      .order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async buscarPorAlumnoYEstado(alumnoId: AlumnoId, estado: EstadoAviso): Promise<HermesAviso[]> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .eq("alumno_id", alumnoId.valor)
      .eq("estado", estado)
      .order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async buscarAvisosCriticosPendientes(): Promise<HermesAviso[]> {
    const tiposCriticos: TipoAviso[] = ["aviso_vencimiento", "suspension_clase", "recordatorio_cobro"];

    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .in("tipo_aviso", tiposCriticos)
      .eq("estado", "pendiente")
      .order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async buscarPorTipo(alumnoId: AlumnoId, tipo: TipoAviso): Promise<HermesAviso[]> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .eq("alumno_id", alumnoId.valor)
      .eq("tipo_aviso", tipo)
      .order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async contarPendientes(alumnoId: AlumnoId): Promise<number> {
    const { count, error } = await supabase
      .from("hermes_avisos")
      .select("*", { count: "exact", head: true })
      .eq("alumno_id", alumnoId.valor)
      .eq("estado", "pendiente");
    if (error) return 0;
    return (count as number) ?? 0;
  }

  async contarCriticosNoLeidos(alumnoId?: AlumnoId): Promise<number> {
    const tiposCriticos: TipoAviso[] = ["aviso_vencimiento", "suspension_clase", "recordatorio_cobro"];

    const query = supabase
      .from("hermes_avisos")
      .select("*", { count: "exact", head: true })
      .in("tipo_aviso", tiposCriticos)
      .not("estado", "eq", "leido");

    if (alumnoId) query.eq("alumno_id", alumnoId.valor);

    const { count, error } = await query;
    if (error) return 0;
    return (count as number) ?? 0;
  }

  async actualizarEstado(id: AvisoId, nuevoEstado: EstadoAviso): Promise<void> {
    const { error } = await supabase.from("hermes_avisos").update({ estado: nuevoEstado }).eq("id", id.valor);
    if (error) throw new Error(`Error al actualizar estado del aviso: ${error.message}`);
  }

  async ultimoAvisoEnviado(alumnoId: AlumnoId): Promise<HermesAviso | null> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .eq("alumno_id", alumnoId.valor)
      .eq("estado", "enviado")
      .order("fecha_envio", { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return null;
    return this.mapearDesdeFila(data);
  }

  private mapearDesdeFila(fila: any): HermesAviso {
    const aviso = new HermesAviso(
      new AvisoId(fila.id),
      new AlumnoId(fila.alumno_id),
      fila.tipo_aviso,
      fila.estado,
      new Date(fila.fecha_envio),
      fila.contenido,
      fila.fecha_visto ? new Date(fila.fecha_visto) : undefined,
    );

    if (fila.fecha_visto) {
      aviso["_fechaVisto"] = new Date(fila.fecha_visto);
      aviso["_estado"] = { valor: fila.estado };
    }

    return aviso;
  }

  private mapearAHilo(aviso: HermesAviso): Record<string, any> {
    return {
      id: aviso.id.valor,
      alumno_id: aviso.alumnoId.valor,
      tipo_aviso: aviso.tipo.valor,
      estado: aviso.estado.valor,
      fecha_envio: aviso.fechaEnvio.valor.toISOString(),
      contenido: aviso.contenido,
      fecha_visto: aviso.fechaVisto?.toISOString() ?? null,
    };
  }
}
