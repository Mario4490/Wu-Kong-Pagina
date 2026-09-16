// src/application/pagos/historial-pagos.use-case.ts
import { Pago } from "../../domain/pagos/entity";
import { PagoRepository } from "../../domain/pagos/repository";

export class HistorialPagosUseCase {
  constructor(private pagoRepository: PagoRepository) {}

  async ejecutar(alumnoId: string): Promise<{ success: boolean; pagos?: Pago[]; error?: string }> {
    try {
      const pagos = await this.pagoRepository.buscarPorAlumno(alumnoId);
      pagos.sort((a, b) => b.fechaPago.getTime() - a.fechaPago.getTime());
      return { success: true, pagos };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al obtener historial" };
    }
  }
}
