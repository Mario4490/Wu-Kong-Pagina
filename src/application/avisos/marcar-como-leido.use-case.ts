// src/application/avisos/marcar-como-leido.use-case.ts
import { HermesAvisoRepository } from "../../domain/avisos/repository";

export class MarcarAvisoLeidoUseCase {
  constructor(private avisoRepository: HermesAvisoRepository) {}

  async ejecutar(avisoId: string): Promise<{ success: boolean; error?: string }> {
    try {
      await this.avisoRepository.actualizarEstado(avisoId, "leido");
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al marcar como leído" };
    }
  }
}
