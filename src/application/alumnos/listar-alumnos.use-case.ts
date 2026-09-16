// src/application/alumnos/listar-alumnos.use-case.ts
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoRepository } from "../../domain/alumnos/repository";

export class ListarAlumnosUseCase {
  constructor(private alumnoRepository: AlumnoRepository) {}
  async ejecutar(): Promise<{ success: boolean; alumnos?: Alumno[]; error?: string }> {
    try {
      const alumnos = await this.alumnoRepository.listarTodos();
      return { success: true, alumnos };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al listar alumnos" };
    }
  }
}
