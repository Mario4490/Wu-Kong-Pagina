// alumnos/repository.ts
import { Alumno } from "./entity";
import { AlumnoId } from "../shared";

/**
 * Puerto del repositorio de alumnos.
 * Implementado por infraestructura (Supabase).
 */
export interface AlumnoRepository {
  /**
   * Busca un alumno por su ID.
   * Retorna null si no existe.
   */
  buscarPorId(id: AlumnoId): Promise<Alumno | null>;

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
   * Regla: el alumno debe existir.
   */
  actualizar(alumno: Alumno): Promise<void>;

  /**
   * Elimina un alumno (soft o hard según decisión del proyecto).
   */
  eliminar(id: AlumnoId): Promise<void>;
}
