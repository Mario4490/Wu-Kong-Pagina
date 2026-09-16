// src/domain/pagos/repository.ts
import { Pago } from "./entity";

/**
 * Puerto del repositorio de pagos.
 * Implementado por infraestructura (Supabase).
 */
export interface PagoRepository {
  guardar(pago: Pago): Promise<void>;
  buscarPorId(id: string): Promise<Pago | null>;
  buscarPorAlumno(alumnoId: string): Promise<Pago[]>;
  buscarPorMes(anio: number, mes: number): Promise<Pago[]>;
  ultimoPago(alumnoId: string): Promise<Pago | null>;
}
