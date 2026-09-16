// src/domain/avisos/repository.ts
import { HermesAviso } from "./entity";

/**
 * Puerto del repositorio de avisos de Hermes.
 * Implementado por infraestructura (Supabase).
 */
export interface HermesAvisoRepository {
  guardar(aviso: HermesAviso): Promise<void>;
  buscarPorId(id: string): Promise<HermesAviso | null>;
  buscarPorAlumno(alumnoId: string): Promise<HermesAviso[]>;
  buscarPorAlumnoYEstado(alumnoId: string, estado: string): Promise<HermesAviso[]>;
  buscarAvisosCriticosPendientes(): Promise<HermesAviso[]>;
  buscarPorTipo(alumnoId: string, tipo: string): Promise<HermesAviso[]>;
  contarPendientes(alumnoId: string): Promise<number>;
  contarCriticosNoLeidos(alumnoId?: string): Promise<number>;
  actualizarEstado(id: string, nuevoEstado: string): Promise<void>;
  ultimoAvisoEnviado(alumnoId: string): Promise<HermesAviso | null>;
}
