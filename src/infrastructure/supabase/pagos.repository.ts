// src/infrastructure/supabase/pagos.repository.ts
import { Pago } from "../../domain/pagos/entity";
import { PagoRepository } from "../../domain/pagos/repository";
import { supabase } from "./client";

export class SupabasePagoRepository implements PagoRepository {
  async guardar(pago: Pago): Promise<void> {
    const { error } = await supabase.from("pagos").insert(this.toRow(pago));
    if (error) throw new Error(`Error al registrar pago: ${error.message}`);
  }

  async buscarPorId(id: string): Promise<Pago | null> {
    const { data, error } = await supabase.from("pagos").select("*").eq("id", id).single();
    if (error || !data) return null;
    return this.fromRow(data);
  }

  async buscarPorAlumno(alumnoId: string): Promise<Pago[]> {
    const { data, error } = await supabase.from("pagos").select("*").eq("alumno_id", alumnoId).order("fecha_pago", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.fromRow(fila));
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
    return data.map((fila) => this.fromRow(fila));
  }

  async ultimoPago(alumnoId: string): Promise<Pago | null> {
    const { data, error } = await supabase
      .from("pagos")
      .select("*")
      .eq("alumno_id", alumnoId)
      .order("fecha_pago", { ascending: false })
      .limit(1)
      .single();
    if (error || !data) return null;
    return this.fromRow(data);
  }

  private fromRow(fila: any): Pago {
    return new Pago(
      fila.id,
      fila.alumno_id,
      fila.monto,
      new Date(fila.fecha_pago),
      fila.metodo_pago,
      fila.created_at ? new Date(fila.created_at) : undefined,
    );
  }

  private toRow(pago: Pago): any {
    return {
      id: pago.id,
      alumno_id: pago.alumnoId,
      monto: pago.monto,
      fecha_pago: pago.fechaPago.toISOString().split("T")[0],
      metodo_pago: pago.metodo,
    };
  }
}
