// src/infrastructure/supabase/alumnos.repository.ts
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoId } from "../../domain/shared";
import { AlumnoRepository } from "../../domain/alumnos/repository";
import { supabase } from "./client";

export class SupabaseAlumnoRepository implements AlumnoRepository {
  async buscarPorId(id: AlumnoId): Promise<Alumno | null> {
    const { data, error } = await supabase
      .from("alumnos")
      .select("*")
      .eq("id", id.valor)
      .single();

    if (error || !data) return null;
    return this.mapearDesdeFila(data);
  }

  async listarTodos(): Promise<Alumno[]> {
    const { data, error } = await supabase.from("alumnos").select("*").order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async buscarPorDisciplina(disciplina: string): Promise<Alumno[]> {
    const { data, error } = await supabase
      .from("alumnos")
      .select("*")
      .ilike("disciplina", disciplina)
      .order("created_at", { ascending: false });
    if (error || !data) return [];
    return data.map((fila) => this.mapearDesdeFila(fila));
  }

  async crear(alumno: Alumno): Promise<void> {
    const { error } = await supabase.from("alumnos").insert(this.mapearAHilo(alumno));
    if (error) throw new Error(`Error al crear alumno: ${error.message}`);
  }

  async actualizar(alumno: Alumno): Promise<void> {
    const { error } = await supabase
      .from("alumnos")
      .update(this.mapearAHilo(alumno))
      .eq("id", alumno.id.valor);
    if (error) throw new Error(`Error al actualizar alumno: ${error.message}`);
  }

  async eliminar(id: AlumnoId): Promise<void> {
    const { error } = await supabase.from("alumnos").delete().eq("id", id.valor);
    if (error) throw new Error(`Error al eliminar alumno: ${error.message}`);
  }

  private mapearDesdeFila(fila: any): Alumno {
    return new Alumno(
      new AlumnoId(fila.id),
      fila.nombre,
      fila.disciplina,
      new Date(fila.created_at),
    );
  }

  private mapearAHilo(alumno: Alumno): Record<string, any> {
    return {
      id: alumno.id.valor,
      nombre: alumno.nombre,
      disciplina: alumno.disciplina,
      created_at: alumno.createdAt.toISOString(),
    };
  }
}
