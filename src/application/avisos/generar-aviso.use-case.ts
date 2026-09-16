// src/application/avisos/generar-aviso.use-case.ts
import { GenerarAvisoService } from "../../domain/avisos/generar-aviso.service";
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoRepository } from "../../domain/alumnos/repository";
import { HermesAviso } from "../../domain/avisos/entity";
import { AlumnoId as AvisoAlumnoId, AlumnoId } from "../../domain/shared";

export class GenerarAvisoVencimientoUseCase {
  constructor(
    private generarService: GenerarAvisoService,
    private alumnoRepository: AlumnoRepository,
  ) {}

  async ejecutar(alumnoId: string): Promise<{
    success: boolean;
    aviso?: HermesAviso;
    alumno?: Alumno;
    error?: string;
    motivo?: string;
  }> {
    const id = new AvisoAlumnoId(alumnoId);
    const alumno = await this.alumnoRepository.buscarPorId(id);

    if (!alumno) {
      return { success: false, error: `Alumno ${alumnoId} no encontrado` };
    }

    const diasRestantes = await this.calcularDiasHastaVencimiento(alumno);
    if (diasRestantes === null) {
      return { success: false, alumno, motivo: "No se puede generar aviso: el alumno está al día" };
    }

    try {
      const aviso = await this.generarService.generarAvisoVencimiento(alumno, diasRestantes);
      if (!aviso) {
        return { success: false, alumno, motivo: "No se generó aviso (evitar duplicado o no aplicable)" };
      }
      return { success: true, aviso, alumno };
    } catch (error) {
      return { success: false, alumno, error: error instanceof Error ? error.message : "Error al generar aviso" };
    }
  }

  private async calcularDiasHastaVencimiento(_alumno: Alumno): Promise<number | null> {
    // TODO: Implementar con servicio de cuotas. Por ahora: retorna 5 días como simulación.
    return 5;
  }
}
