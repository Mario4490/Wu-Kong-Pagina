// src/application/avisos/marcar-como-leido.use-case.ts
import { GenerarAvisoService } from "../../domain/avisos/generar-aviso.service";
import { AvisoId } from "../../domain/avisos/value-objects";

export class MarcarAvisoLeidoUseCase {
  constructor(private generarService: GenerarAvisoService) {}

  async ejecutar(avisoId: string): Promise<{ success: boolean; error?: string }> {
    const id = new AvisoId(avisoId);
    try {
      await this.generarService.marcarComoLeido(id);
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al marcar como leído" };
    }
  }
}
