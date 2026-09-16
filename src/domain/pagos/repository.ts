// pagos/repository.ts
import { Pago } from "./entity";
import { PagoId } from "./value-objects";
import { AlumnoId } from "../shared";

/**
 * Puerto del repositorio de pagos.
 * Implementado por infraestructura (Supabase).
 */
export interface PagoRepository {
  /**
   * Guarda un pago nuevo.
   */
  guardar(pago: Pago): Promise<void>;

  /**
   * Busca un pago por su ID.
   */
  buscarPorId(id: PagoId): Promise<Pago | null>;

  /**
   * Lista los pagos de un alumno, ordenados por fecha de pago descendente.
   */
  buscarPorAlumno(alumnoId: AlumnoId): Promise<Pago[]>;

  /**
   * Lista los pagos de un determinado mes/año.
   */
  buscarPorMes(anio: number, mes: number): Promise<Pago[]>;

  /**
   * Obtiene el último pago registrado de un alumno.
   * (Para determinar si está al día, calcular próximo vencimiento)
   */
  ultimoPago(alumnoId: AlumnoId): Promise<Pago | null>;
}
