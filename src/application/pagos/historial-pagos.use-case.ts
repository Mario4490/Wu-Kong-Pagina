// src/application/pagos/historial-pagos.use-case.ts
import { Pago } from "../../domain/pagos/entity";
import { PagoRepository } from "../../domain/pagos/repository";
import { AlumnoId } from "../../domain/shared";

export class HistorialPagosUseCase {
  constructor(private pagoRepository: PagoRepository) {}

  async ejecutar(alumnoId: string): Promise<{ success: boolean; pagos?: Pago[]; error?: string }> {
    const id = new AlumnoId(alumnoId);
    try {
      const pagos = await this.pagoRepository.buscarPorAlumno(id);
      pagos.sort((a, b) => b.fechaPago.valor.getTime() - a.fechaPago.valor.getTime());
      return { success: true, pagos };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al obtener historial" };
    }
  }
}
