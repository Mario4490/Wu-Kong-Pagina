// src/domain/alumnos/repository.ts
import { Alumno } from "./entity";

/**
 * Puerto del repositorio de alumnos.
 * Implementado por infraestructura (Supabase).
 */
export interface AlumnoRepository {
  /**
   * Busca un alumno por su ID (string).
   * Retorna null si no existe.
   */
  buscarPorId(id: string): Promise<Alumno | null>;

  /**
   * Lista todos los alumnos.
   */
  listarTodos(): Promise<Alumno[]>;

  /**
   * Lista alumnos por disciplina.
   */
  buscarPorDisciplina(disciplina: string): Promise<Alumno[]>;

  /**
   * Guarda un alumno nuevo (create).
   */
  crear(alumno: Alumno): Promise<void>;

  /**
   * Actualiza un alumno existente.
   */
  actualizar(alumno: Alumno): Promise<void>;

  /**
   * Elimina un alumno.
   */
  eliminar(id: string): Promise<void>;
}
