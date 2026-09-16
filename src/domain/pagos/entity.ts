// src/domain/pagos/entity.ts
import { Alumno } from "../alumnos/entity";
import { ReciboDigital } from "./recibo";

export class Pago {
  constructor(
    public readonly id: string,
    public readonly alumnoId: string,
    public readonly monto: number,
    public readonly fechaPago: Date,
    public readonly metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
    public readonly fechaRegistro: Date = new Date(),
  ) {
    if (monto <= 0) throw new Error("El monto debe ser mayor a 0");
    if (isNaN(fechaPago.getTime())) throw new Error("La fecha de pago es inválida");
    if (fechaPago > new Date()) throw new Error("La fecha de pago no puede ser futura");
    this.monto = Math.round(monto);
  }

  get fechaPagoDisplay(): string {
    return this.fechaPago.toLocaleDateString("esAR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  generarRecibo(alumno: Alumno): ReciboDigital {
    return new ReciboDigital(alumno, this.monto, this.metodo, "Al día", `Pago registrado el ${this.fechaPagoDisplay}`);
  }

  toWhatsappText(alumno: Alumno): string {
    return this.generarRecibo(alumno).toWhatsappText();
  }

  toWhatsappCompact(alumno: Alumno): string {
    return this.generarRecibo(alumno).toWhatsappCompact();
  }
}
