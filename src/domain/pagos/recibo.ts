// src/domain/pagos/recibo.ts
import { Monto } from "../shared";
import { Alumno } from "../alumnos/entity";

export class ReciboDigital {
  constructor(
    private _alumno: Alumno,
    private _monto: number,
    private _metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
    private _estado: "Al día" | "Pendiente" | "Vencido",
    private _observaciones: string,
    private _fechaEmision: Date = new Date(),
  ) {
    if (_estado !== "Al día" && _estado !== "Pendiente" && _estado !== "Vencido") {
      throw new Error(`Estado inválido: ${_estado}`);
    }
  }

  get alumno(): Alumno { return this._alumno; }
  get monto(): number { return this._monto; }
  get metodo(): string { return this._metodo; }
  get estado(): "Al día" | "Pendiente" | "Vencido" { return this._estado; }

  toWhatsappText(): string {
    const fecha = this._fechaEmision.toLocaleDateString("esAR", { day: "numeric", month: "long", year: "numeric" });
    return [
      "*RECIBO DIGITAL - TEAM WUKONG*",
      "",
      `Alumno: ${this._alumno.nombre}`,
      `Disciplina: ${this._alumno.disciplina}`,
      `Monto: $${this._monto.toLocaleString("esAR")} ARS`,
      `Método: ${this._metodo}`,
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
      `💰 $${this._monto.toLocaleString("esAR")} ARS`,
      `📱 ${metodoLabels[this._metodo] || this._metodo}`,
      `🟢 ${this._estado}`,
      "",
      "*Pago recibido! OSS*",
    ].join("\n");
  }
}
