// pagos/recibo.ts
import { Monto } from "../shared";
import { Alumno } from "../alumnos/entity";

/**
 * ReciboDigital — Aggregate Root del contexto de pagos (concepto derivado).
 * Se genera automáticamente cuando se registra un pago.
 * No tiene ID propio ni persistencia directa — es un concepto de dominio para el documento comprobatorio.
 */
export class ReciboDigital {
  constructor(
    private _alumno: Alumno,
    private _monto: Monto,
    private _metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
    private _estado: "Al día" | "Pendiente" | "Vencido",
    private _observaciones: string,
    private _fechaEmision: Date = new Date(),
  ) {
    if (_estado !== "Al día" && _estado !== "Pendiente" && _estado !== "Vencido") {
      throw new Error(`Estado inválido: ${_estado}`);
    }
    this._fechaEmision = _fechaEmision;
  }

  get alumno(): Alumno {
    return this._alumno;
  }

  get monto(): Monto {
    return this._monto;
  }

  get metodo(): string {
    return this._metodo;
  }

  get estado(): "Al día" | "Pendiente" | "Vencido" {
    return this._estado;
  }

  get fechaEmision(): Date {
    return this._fechaEmision;
  }

  toWhatsappText(): string {
    const fecha = this._fechaEmision.toLocaleDateString("esAR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return [
      "*RECIBO DIGITAL - TEAM WUKONG*",
      "",
      `Alumno: ${this._alumno.nombre}`,
      `Disciplina: ${this._alumno.disciplina}`,
      `Monto: ${this._monto.toWhatsapp()}`,
      `Método: ${this.metodo}`,
      `Estado: ${this._estado}`,
      "",
      `Fecha de emisión: ${fecha}`,
      "",
      "Pago recibido! A seguir metiéndole duro.",
    ].join("\n");
  }

  toWhatsappCompact(): string {
    const metodoLabels: Record<string, string> = {
      efectivo: "Efectivo",
      transferencia: "Transferencia",
      transferencia_bancaria: "Trans. Bancaria",
      qr: "QR",
      otro: "Otro",
    };

    return [
      "*RECIBO DIGITAL - WUKONG*",
      `👤 ${this._alumno.nombre}`,
      `🥋 ${this._alumno.disciplina}`,
      `💰 ${this._monto.toWhatsapp()}`,
      `📱 ${metodoLabels[this._metodo] || this._metodo}`,
      `🟢 ${this._estado}`,
      "",
      "*Pago recibido! OSS*",
    ].join("\n");
  }
}
