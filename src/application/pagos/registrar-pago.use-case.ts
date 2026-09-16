// src/application/pagos/registrar-pago.use-case.ts
import { Pago } from "../../domain/pagos/entity";
import { RegistrarPagoService } from "../../domain/pagos/registrar-pago.service";
import { Alumno } from "../../domain/alumnos/entity";
import { AlumnoRepository } from "../../domain/alumnos/repository";
import { EstadoAlumnoService } from "../../domain/pagos/estado-alumno.service";

export class RegistrarPagoUseCase {
  constructor(
    private registrarPagoService: RegistrarPagoService,
    private alumnoRepository: AlumnoRepository,
    private estadoAlumnoService: EstadoAlumnoService,
  ) {}

  async ejecutar(
    alumnoId: string,
    monto: number,
    fechaPago: Date,
    metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
  ): Promise<{ success: boolean; pago?: Pago; alumno?: Alumno | undefined; error?: string }> {
    try {
      const pago = await this.registrarPagoService.registrarPago(alumnoId, monto, fechaPago, metodo);
      const alumno = await this.alumnoRepository.buscarPorId(alumnoId);
      return { success: true, pago, alumno: alumno ?? undefined };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al registrar pago" };
    }
  }
}
