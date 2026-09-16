// src/infrastructure/supabase/pagos.repository.ts
import { Pago } from "../../domain/pagos/entity";
import { PagoId, AlumnoId } from "../../domain/shared";
import { PagoRepository } from "../../domain/pagos/repository";
import { supabase } from "./client";

export class SupabasePagoRepository implements PagoRepository {
  async guardar(pago: Pago): Promise<void> {
    const { error } = await supabase.from("pagos").insert(this.mapearAHilo(pago));
    if (error) throw new Error(`Error al registrar pago: ${error.message}`);
  }

  async buscarPorId(id: PagoId): Promise<Pago | null> {
    const { data, error } = await supabase
      .from("pagos")
      .select("*")
      .eq("id", id.valor)
      .single();
    if (error || !data) return null;
    return this.mapearDesdeFila(data);
  }

  async buscarPorAlumno(alumnoId: AlumnoId): Promise<Pago[]> {
    const { data, error } = await supabase
      .from("pagos")
      .select("*")
      .eq("alumno_id", alumnoId.valor)
      .order("fecha_pago", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async buscarPorMes(anio: number, mes: number): Promise<Pago[]> {
    const inicio = new Date(anio, mes - 1, 1);
    const fin = new Date(anio, mes, 1);

    const { data, error } = await supabase
      .from("pagos")
      .select("*")
      .gte("fecha_pago", inicio.toISOString().split("T")[0])
      .lt("fecha_pago", fin.toISOString().split("T")[0])
      .order("fecha_pago", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async ultimoPago(alumnoId: AlumnoId): Promise<Pago | null> {
    const { data, error } = await supabase
      .from("pagos")
      .select("*")
      .eq("alumno_id", alumnoId.valor)
      .order("fecha_pago", { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return null;
    return this.mapearDesdeFila(data);
  }

  private mapearDesdeFila(fila: any): Pago {
    return new Pago(
      new PagoId(fila.id),
      new AlumnoId(fila.alumno_id),
      fila.monto,
      new Date(fila.fecha_pago),
      fila.metodo_pago,
      fila.created_at ? new Date(fila.created_at) : undefined,
    );
  }

  private mapearAHilo(pago: Pago): Record<string, any> {
    return {
      id: pago.id.valor,
      alumno_id: pago.alumnoId.valor,
      monto: pago.monto.valor,
      fecha_pago: pago.fechaPago.valor.toISOString().split("T")[0],
      metodo_pago: pago.metodo.metodo,
    };
  }
}
