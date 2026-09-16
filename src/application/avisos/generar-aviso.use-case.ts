// src/application/avisos/generar-aviso.use-case.ts
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoRepository } from "../../domain/alumnos/repository";
import {
  generarAvisoRecordatorioVencimiento,
  generarAvisoCuotaVencida,
  generarReciboDigital,
  AvisoState,
} from "../../domain/avisos/generar-aviso.service";

export class GenerarAvisoVencimientoUseCase {
  constructor(
    private generarService: {
      generarAvisoRecordatorioVencimiento: (
        alumnoId: string,
        nombre: string,
        disciplina: string,
        fechaVencimiento: string,
      ) => AvisoState;
      generarAvisoCuotaVencida: (
        alumnoId: string,
        nombre: string,
        disciplina: string,
      ) => AvisoState;
    },
    private alumnoRepository: AlumnoRepository,
  ) {}

  async ejecutar(alumnoId: string): Promise<{
    success: boolean;
    aviso?: AvisoState;
    alumno?: Alumno;
    error?: string;
    motivo?: string;
  }> {
    const alumno = await this.alumnoRepository.buscarPorId(alumnoId);

    if (!alumno) {
      return { success: false, error: `Alumno ${alumnoId} no encontrado` };
    }

    const diasRestantes = await this.calcularDiasHastaVencimiento(alumno);
    if (diasRestantes === null) {
      return { success: false, alumno, motivo: "No se puede generar aviso: el alumno está al día" };
    }

    try {
      const aviso = this.generarService.generarAvisoRecordatorioVencimiento(
        alumnoId,
        alumno.nombre,
        alumno.disciplina,
        new Date(Date.now() + diasRestantes * 24 * 60 * 60 * 1000).toISOString(),
      );
      return { success: true, aviso, alumno };
    } catch (error) {
      return { success: false, alumno, error: error instanceof Error ? error.message : "Error al generar aviso" };
    }
  }

  private async calcularDiasHastaVencimiento(_alumno: Alumno): Promise<number | null> {
    return 5;
  }
}

export class GenerarAvisoCuotaVencidaUseCase {
  constructor(private generarService: {
    generarAvisoCuotaVencida: (alumnoId: string, nombre: string, disciplina: string) => AvisoState;
  }) {}

  async ejecutar(alumnoId: string, nombre: string, disciplina: string): Promise<{
    success: boolean;
    aviso?: AvisoState;
    error?: string;
  }> {
    try {
      const aviso = this.generarService.generarAvisoCuotaVencida(alumnoId, nombre, disciplina);
      return { success: true, aviso };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al generar aviso" };
    }
  }
}

export class GenerarReciboDigitalUseCase {
  constructor(private generarService: {
    generarReciboDigital: (
      alumnoId: string,
      nombre: string,
      disciplina: string,
      monto: number,
      metodoMetodo: string,
      metodoDisplay: string,
      fechaEmision: string,
    ) => AvisoState;
  }) {}

  async ejecutar(alumnoId: string, nombre: string, disciplina: string, monto: number, metodoMetodo: string, metodoDisplay: string, fechaEmision: string): Promise<{
    success: boolean;
    aviso?: AvisoState;
    error?: string;
  }> {
    try {
      const aviso = this.generarService.generarReciboDigital(alumnoId, nombre, disciplina, monto, metodoMetodo, metodoDisplay, fechaEmision);
      return { success: true, aviso };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al generar recibo" };
    }
  }
}
