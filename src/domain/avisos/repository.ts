// avisos/repository.ts
import { HermesAviso } from "./entity";
import { AvisoId, AlumnoId, TipoAviso, EstadoAviso } from "./value-objects";

/**
 * Puerto del repositorio de avisos de Hermes.
 * Implementado por infraestructura (Supabase).
 */
export interface HermesAvisoRepository {
  /**
   * Guarda un aviso nuevo.
   */
  guardar(aviso: HermesAviso): Promise<void>;

  /**
   * Busca un aviso por su ID.
   */
  buscarPorId(id: AvisoId): Promise<HermesAviso | null>;

  /**
   * Lista los avisos de un alumno, ordenados por fecha de envío descendente.
   */
  buscarPorAlumno(alumnoId: AlumnoId): Promise<HermesAviso[]>;

  /**
   * Lista los avisos de un alumno EN UN ESTADO específico.
   */
  buscarPorAlumnoYEstado(alumnoId: AlumnoId, estado: EstadoAviso): Promise<HermesAviso[]>;

  /**
   * Lista los avisos pendientes CRÍTICOS (para reportes de alertas).
   */
  buscarAvisosCriticosPendientes(): Promise<HermesAviso[]>;

  /**
   * Lista los avisos de un tipo específico para un alumno.
   */
  buscarPorTipo(alumnoId: AlumnoId, tipo: TipoAviso): Promise<HermesAviso[]>;

  /**
   * Cuenta los avisos pendientes de un alumno.
   */
  contarPendientes(alumnoId: AlumnoId): Promise<number>;

  /**
   * Cuenta los avisos críticos no leídos (para métricas del profesor).
   */
  contarCriticosNoLeidos(alumnoId?: AlumnoId): Promise<number>;

  /**
   * Actualiza el estado de un aviso.
   */
  actualizarEstado(id: AvisoId, nuevoEstado: EstadoAviso): Promise<void>;

  /**
   * Obtiene el último aviso enviado de un alumno (para evitar duplicados).
   */
  ultimoAvisoEnviado(alumnoId: AlumnoId): Promise<HermesAviso | null>;
}
