// src/application/pagos/consultar-estado.use-case.ts
import { EstadoAlumnoService } from "../../domain/pagos/estado-alumno.service";
import { AlumnoRepository } from "../../domain/alumnos/repository";
import { Alumno } from "../../domain/alumnos/entity";

export class ConsultarEstadoAlumnoUseCase {
  constructor(private estadoService: EstadoAlumnoService, private alumnoRepository: AlumnoRepository) {}

  async ejecutar(alumnoId: string): Promise<{ success: boolean; alumno?: Alumno; estado?: "Al día" | "Pendiente" | "Vencido"; error?: string }> {
    try {
      const alumno = await this.alumnoRepository.buscarPorId(alumnoId);
      if (!alumno) return { success: false, error: `Alumno ${alumnoId} no encontrado` };
      const estado = await this.estadoService.determinarEstado(alumnoId);
      return { success: true, alumno, estado };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al consultar estado" };
    }
  }
}
