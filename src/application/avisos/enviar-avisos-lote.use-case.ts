// src/application/avisos/enviar-avisos-lote.use-case.ts
import { HermesAvisoRepository } from "../../domain/avisos/repository";
import { HermesAviso } from "../../domain/avisos/entity";

export class ObtenerAvisosParaEnviarUseCase {
  constructor(private avisoRepository: HermesAvisoRepository) {}

  async ejecutar(opciones?: { soloCriticos?: boolean; limit?: number }): Promise<{
    success: boolean;
    avisos: HermesAviso[];
    total: number;
  }> {
    let avisos: HermesAviso[];

    if (opciones?.soloCriticos) {
      avisos = await this.avisoRepository.buscarAvisosCriticosPendientes();
    } else {
      avisos = await this.avisoRepository.buscarPorAlumnoYEstado("", "pendiente");
    }

    if (opciones?.limit && avisos.length > opciones.limit) {
      avisos = avisos.slice(0, opciones.limit);
    }

    return { success: true, avisos, total: avisos.length };
  }
}
