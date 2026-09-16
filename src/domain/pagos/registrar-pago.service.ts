// pagos/registrar-pago.service.ts
import { Pago } from "./entity";
import { PagoId, AlumnoId, Monto, MetodoPagoValue } from "./value-objects";
import { PagoRepository } from "./repository";
import { EstadoAlumnoService } from "./estado-alumno.service";

/**
 * Domain Service para registrar un pago.
 * Reglas:
 * - Valida que el monto sea > 0
 * - Valida que el método sea válido
 * - Crea el pago, lo persiste
 * - Recalcula el estado del alumno
 * - Genera el ReciboDigital asociado (pero no lo persiste — es un concepto derivado)
 */
export class RegistrarPagoService {
  constructor(
    private pagoRepository: PagoRepository,
    private estadoService: EstadoAlumnoService,
  ) {}

  async registrar(
    alumnoId: AlumnoId,
    monto: number,
    fechaPago: Date,
    metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
  ): Promise<{ pago: Pago; estadoResultante: "Al día" | "Pendiente" | "Vencido" }> {
    if (monto <= 0) {
      throw new Error("El monto del pago debe ser mayor a 0");
    }

    const metodosValidos = [
      "efectivo",
      "transferencia",
      "transferencia_bancaria",
      "qr",
      "otro",
    ] as const;
    if (!metodosValidos.includes(metodo)) {
      throw new Error(`Método de pago inválido: ${metodo}`);
    }

    const pago = new Pago(
      new PagoId(crypto.randomUUID()),
      alumnoId,
      monto,
      fechaPago,
      metodo,
    );

    await this.pagoRepository.guardar(pago);

    const estadoResultante = await this.estadoService.determinarEstado(alumnoId);

    return { pago, estadoResultante };
  }
}
