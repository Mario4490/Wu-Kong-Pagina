// src/application/alumnos/buscar-alumno.use-case.ts
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoId } from "../../domain/shared";
import { AlumnoRepository } from "../../domain/alumnos/repository";

export class BuscarAlumnoUseCase {
  constructor(private alumnoRepository: AlumnoRepository) {}
  async ejecutar(alumnoId: string): Promise<{ success: boolean; alumno?: Alumno; error?: string }> {
    const id = new AlumnoId(alumnoId);
    try {
      const alumno = await this.alumnoRepository.buscarPorId(id);
      if (!alumno) return { success: false, error: `Alumno ${alumnoId} no encontrado` };
      return { success: true, alumno };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al buscar alumno" };
    }
  }
}
