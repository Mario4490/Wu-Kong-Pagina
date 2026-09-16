// src/infrastructure/supabase/avisos.repository.ts
import { HermesAviso } from "../../domain/avisos/entity";
import { HermesAvisoRepository } from "../../domain/avisos/repository";
import { supabase } from "./client";
import { AvisoId, EstadoAvisoValue, FechaEnvio, TipoAvisoValue, TipoAviso, EstadoAviso } from "../../domain/avisos/value-objects";

export class SupabaseHermesAvisoRepository implements HermesAvisoRepository {
  async guardar(aviso: HermesAviso): Promise<void> {
    const { error } = await supabase.from("hermes_avisos").insert(this.toRow(aviso));
    if (error) throw new Error(`Error al guardar aviso: ${error.message}`);
  }

  async buscarPorId(id: string): Promise<HermesAviso | null> {
    const { data, error } = await supabase.from("hermes_avisos").select("*").eq("id", id).single();
    if (error || !data) return null;
    return this.fromRow(data);
  }

  async buscarPorAlumno(alumnoId: string): Promise<HermesAviso[]> {
    const { data, error } = await supabase.from("hermes_avisos").select("*").eq("alumno_id", alumnoId).order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.fromRow(fila));
  }

  async buscarPorAlumnoYEstado(alumnoId: string, estado: string): Promise<HermesAviso[]> {
    const { data, error } = await supabase.from("hermes_avisos").select("*").eq("alumno_id", alumnoId).eq("estado", estado).order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.fromRow(fila));
  }

  async buscarAvisosCriticosPendientes(): Promise<HermesAviso[]> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .in("tipo_aviso", ["aviso_vencimiento", "suspension_clase", "recordatorio_cobro"])
      .eq("estado", "pendiente")
      .order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.fromRow(fila));
  }

  async buscarPorTipo(alumnoId: string, tipo: string): Promise<HermesAviso[]> {
    const { data, error } = await supabase.from("hermes_avisos").select("*").eq("alumno_id", alumnoId).eq("tipo_aviso", tipo).order("fecha_envio", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.fromRow(fila));
  }

  async contarPendientes(alumnoId: string): Promise<number> {
    const { count, error } = await supabase.from("hermes_avisos").select("*", { count: "exact", head: true }).eq("alumno_id", alumnoId).eq("estado", "pendiente");
    if (error) return 0;
    return (count as number) ?? 0;
  }

  async contarCriticosNoLeidos(alumnoId?: string): Promise<number> {
    const query = supabase
      .from("hermes_avisos")
      .select("*", { count: "exact", head: true })
      .in("tipo_aviso", ["aviso_vencimiento", "suspension_clase", "recordatorio_cobro"])
      .not("estado", "eq", "leido");
    if (alumnoId) query.eq("alumno_id", alumnoId);
    const { count, error } = await query;
    if (error) return 0;
    return (count as number) ?? 0;
  }

  async actualizarEstado(id: string, nuevoEstado: string): Promise<void> {
    const { error } = await supabase.from("hermes_avisos").update({ estado: nuevoEstado }).eq("id", id);
    if (error) throw new Error(`Error al actualizar estado del aviso: ${error.message}`);
  }

  async ultimoAvisoEnviado(alumnoId: string): Promise<HermesAviso | null> {
    const { data, error } = await supabase
      .from("hermes_avisos")
      .select("*")
      .eq("alumno_id", alumnoId)
      .eq("estado", "enviado")
      .order("fecha_envio", { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return null;
    return this.fromRow(data);
  }

  private fromRow(fila: any): HermesAviso {
    return new HermesAviso(
      fila.id,
      fila.alumno_id,
      fila.tipo_aviso,
      fila.estado,
      new Date(fila.fecha_envio),
      fila.contenido,
      fila.fecha_visto ? new Date(fila.fecha_visto) : undefined,
    );
  }

  private toRow(aviso: HermesAviso): any {
    return {
      id: aviso.id,
      alumno_id: aviso.alumnoId,
      tipo_aviso: aviso.tipo.valor,
      estado: aviso.estado.valor,
      fecha_envio: aviso.fechaEnvio.valor.toISOString(),
      contenido: aviso.contenido,
      fecha_visto: aviso.fechaVisto?.toISOString() ?? null,
    };
  }
}
