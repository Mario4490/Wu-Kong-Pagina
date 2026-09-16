// pagos/entity.ts
import { PagoId, FechaPago, Monto, MetodoPagoValue, AlumnoId } from "./value-objects";
import { Alumno } from "../alumnos/entity";
import { ReciboDigital } from "./recibo";

/**
 * Pago — Entidad que registra un pago real.
 * Reglas:
 * - El monto debe ser > 0 (validado por Monto)
 * - La fecha no puede ser futura (validado por FechaPago)
 * - El alumno debe existir (validado en caso de uso, no aquí)
 * - Al registrarse, genera un ReciboDigital automáticamente
 */
export class Pago {
  private _id: PagoId;
  private _alumnoId: AlumnoId;
  private _monto: Monto;
  private _fechaPago: FechaPago;
  private _metodo: MetodoPagoValue;
  private _fechaRegistro: Date;

  constructor(
    id: PagoId,
    alumnoId: AlumnoId,
    monto: number,
    fechaPago: Date,
    metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
    fechaRegistro?: Date,
  ) {
    this._id = id;
    this._alumnoId = alumnoId;
    this._monto = new Monto(monto);
    this._fechaPago = new FechaPago(fechaPago);
    this._metodo = new MetodoPagoValue(metodo);
    this._fechaRegistro = fechaRegistro ? new Date(fechaRegistro) : new Date();
  }

  get id(): PagoId {
    return this._id;
  }
  get alumnoId(): AlumnoId {
    return this._alumnoId;
  }
  get monto(): Monto {
    return this._monto;
  }
  get fechaPago(): FechaPago {
    return this._fechaPago;
  }
  get metodo(): MetodoPagoValue {
    return this._metodo;
  }
  get fechaRegistro(): Date {
    return this._fechaRegistro;
  }

  /**
   * Genera un ReciboDigital asociado a este pago.
   */
  generarRecibo(alumno: Alumno): ReciboDigital {
    return new ReciboDigital(
      alumno,
      this._monto,
      this._metodo.metodo,
      "Al día",
      `Pago registrado el ${this._fechaPago.display()}`,
    );
  }

  /**
   * Formatea para WhatsApp.
   */
  toWhatsappText(alumno: Alumno): string {
    const recibo = this.generarRecibo(alumno);
    return recibo.toWhatsappText();
  }

  toWhatsappCompact(alumno: Alumno): string {
    const recibo = this.generarRecibo(alumno);
    return recibo.toWhatsappCompact();
  }
}
