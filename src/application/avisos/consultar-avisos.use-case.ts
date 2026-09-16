// src/application/avisos/consultar-avisos.use-case.ts
import { HermesAvisoRepository } from "../../domain/avisos/repository";
import { AlumnoId } from "../../domain/avisos/value-objects";
import { HermesAviso } from "../../domain/avisos/entity";

export class ConsultarAvisosAlumnoUseCase {
  constructor(private avisoRepository: HermesAvisoRepository) {}

  async ejecutar(alumnoId: string): Promise<{
    success: boolean;
    avisos?: HermesAviso[];
    resumen?: { total: number; pendientes: number; enviados: number; leidos: number; criticosPendientes: number };
    error?: string;
  }> {
    const id = new AlumnoId(alumnoId);
    try {
      const avisos = await this.avisoRepository.buscarPorAlumno(id);
      const criticosPendientes = avisos.filter((a) => a.esCritico() && a.estado.valor === "pendiente").length;
      const resumen = {
        total: avisos.length,
        pendientes: avisos.filter((a) => a.estado.valor === "pendiente").length,
        enviados: avisos.filter((a) => a.estado.valor === "enviado").length,
        leidos: avisos.filter((a) => a.estado.valor === "leido").length,
        criticosPendientes,
      };
      return { success: true, avisos, resumen };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : "Error al consultar avisos" };
    }
  }
}
