// src/domain/pagos/estado-alumno.service.ts
import { PagoRepository } from "./repository";

export class EstadoAlumnoService {
  private ventanaMoraDias: number;

  constructor(private pagoRepository: PagoRepository, ventanaDias?: number) {
    this.ventanaMoraDias = ventanaDias ?? 15;
  }

  async determinarEstado(alumnoId: string): Promise<"Al día" | "Pendiente" | "Vencido"> {
    const ultimoPago = await this.pagoRepository.ultimoPago(alumnoId);

    if (!ultimoPago) {
      return "Pendiente";
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaUltimoPago = new Date(ultimoPago.fechaPago);
    fechaUltimoPago.setHours(0, 0, 0, 0);

    const diferenciaDias = Math.floor(
      (hoy.getTime() - fechaUltimoPago.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diferenciaDias < this.ventanaMoraDias) {
      return "Al día";
    }

    return "Vencido";
  }

  async tieneMora(alumnoId: string): Promise<boolean> {
    const estado = await this.determinarEstado(alumnoId);
    return estado === "Vencido";
  }
}
