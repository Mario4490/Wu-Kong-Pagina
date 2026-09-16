// pagos/estado-alumno.service.ts
import { AlumnoId } from "../shared";
import { PagoRepository } from "./repository";

/**
 * Domain Service para determinar el estado actual de un alumno
 * basado en sus pagos registrados.
 *
 * Reglas:
 * - Sin pagos → "Pendiente"
 * - Último pago dentro de la ventana de mora (15 días por defecto) → "Al día"
 * - Último pago fuera de la ventana de mora → "Vencido"
 *
 * La ventana de mora es configurable (15 días por defecto, según reglas del proyecto).
 */
export class EstadoAlumnoService {
  private ventanaMoraDias: number;

  constructor(
    private pagoRepository: PagoRepository,
    ventanaDias?: number,
  ) {
    this.ventanaMoraDias = ventanaDias ?? 15;
  }

  /**
   * Determina el estado actual de un alumno.
   */
  async determinarEstado(alumnoId: AlumnoId): Promise<"Al día" | "Pendiente" | "Vencido"> {
    const ultimoPago = await this.pagoRepository.ultimoPago(alumnoId);

    if (!ultimoPago) {
      return "Pendiente";
    }

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaUltimoPago = ultimoPago.fechaPago.toDateOnly();
    const diferenciaDias = Math.floor(
      (hoy.getTime() - fechaUltimoPago.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diferenciaDias < this.ventanaMoraDias) {
      return "Al día";
    }

    return "Vencido";
  }

  /**
   * Retorna true si el alumno está al día.
   */
  async estaAlDia(alumnoId: AlumnoId): Promise<boolean> {
    const estado = await this.determinarEstado(alumnoId);
    return estado === "Al día";
  }

  /**
   * Obtiene los alumnos vencidos de una lista (para alertas del profesor).
   */
  async alumnosVencidos(alumnos: { id: AlumnoId; nombre: string; disciplina: string }[]): Promise<{
    id: AlumnoId;
    nombre: string;
    disciplina: string;
    diasVencido: number;
  }[]> {
    const vencidos: { id: AlumnoId; nombre: string; disciplina: string; diasVencido: number }[] = [];

    for (const alumno of alumnos) {
      const estado = await this.determinarEstado(alumno.id);
      if (estado === "Vencido") {
        const ultimoPago = await this.pagoRepository.ultimoPago(alumno.id);
        let diasVencido = 0;
        if (ultimoPago) {
          const hoy = new Date();
          hoy.setHours(0, 0, 0, 0);
          diasVencido = Math.floor(
            (hoy.getTime() - ultimoPago.fechaPago.toDateOnly().getTime()) / (1000 * 60 * 60 * 24),
          ) - this.ventanaMoraDias;
        }
        vencidos.push({ id: alumno.id, nombre: alumno.nombre, disciplina: alumno.disciplina, diasVencido });
      }
    }

    return vencidos;
  }

  /**
   * Cambia la ventana de mora (para pruebas o configuración).
   */
  setVentanaMoraDias(dias: number): void {
    if (dias < 1) throw new Error("La ventana de mora debe ser al menos 1 día");
    this.ventanaMoraDias = dias;
  }
}
