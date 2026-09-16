// src/domain/pagos/value-objects.ts
import { Monto, MetodoPagoValue } from "../shared";

export class PagoId {
  constructor(public readonly valor: string) {
    if (!valor || valor.trim().length === 0) {
      throw new Error("El ID de pago no puede estar vacío");
    }
    this.valor = valor.trim();
  }
  equals(other: PagoId): boolean {
    return this.valor === other.valor;
  }
}

export class FechaPago {
  constructor(public readonly valor: Date) {
    if (isNaN(valor.getTime())) {
      throw new Error("La fecha de pago es inválida");
    }
    if (valor > new Date()) {
      throw new Error("La fecha de pago no puede ser futura");
    }
    this.valor = new Date(valor);
  }
  display(): string {
    return this.valor.toLocaleDateString("esAR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  }
  toDateOnly(): Date {
    const d = new Date(this.valor);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
