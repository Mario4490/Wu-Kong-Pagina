// src/application/pagos/registrar-pago.use-case.ts
import { RegistrarPagoService } from "../../domain/pagos/registrar-pago.service";
import { Pago } from "../../domain/pagos/entity";
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoId } from "../../domain/shared";
import { AlumnoRepository } from "../../domain/alumnos/repository";

export class RegistrarPagoUseCase {
  constructor(
    private registrarService: RegistrarPagoService,
    private alumnoRepository: AlumnoRepository,
  ) {}

  async ejecutar(datos: {
    idAlumno: string;
    monto: number;
    fechaPago: string;
    metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro";
  }): Promise<{
    success: boolean;
    pago?: Pago;
    alumno?: Alumno;
    estadoResultante?: "Al día" | "Pendiente" | "Vencido";
    error?: string;
  }> {
    const alumnoId = new AlumnoId(datos.idAlumno);
    const alumno = await this.alumnoRepository.buscarPorId(alumnoId);

    if (!alumno) {
      return { success: false, error: `Alumno con ID ${datos.idAlumno} no encontrado` };
    }

    let fechaPago: Date;
    try {
      fechaPago = new Date(datos.fechaPago);
      if (isNaN(fechaPago.getTime())) throw new Error("Formato de fecha inválido");
    } catch {
      return { success: false, error: "La fecha de pago debe estar en formato YYYY-MM-DD" };
    }

    try {
      const resultado = await this.registrarService.registrar(alumnoId, datos.monto, fechaPago, datos.metodo);
      return { success: true, pago: resultado.pago, alumno, estadoResultante: resultado.estadoResultante };
    } catch (error) {
      return { success: false, alumno, error: error instanceof Error ? error.message : "Error al registrar el pago" };
    }
  }
}
