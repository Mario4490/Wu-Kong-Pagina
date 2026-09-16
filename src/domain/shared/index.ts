// src/domain/shared/index.ts
// Value Objects compartidos entre contextos

export class AlumnoId {
  constructor(public readonly valor: string) {
    if (!valor || valor.trim().length === 0) {
      throw new Error("El ID de alumno no puede estar vacío");
    }
    this.valor = valor.trim();
  }
  equals(other: AlumnoId): boolean {
    return this.valor === other.valor;
  }
}

export class Monto {
  constructor(public readonly valor: number) {
    if (valor <= 0) throw new Error("El monto debe ser mayor a 0");
    this.valor = Math.round(valor);
  }
  toString(): string {
    return `$${this.valor.toLocaleString("esAR")}`;
  }
  toWhatsapp(): string {
    return `$${this.valor.toLocaleString("esAR")} ARS`;
  }
  equals(other: Monto): boolean {
    return this.valor === other.valor;
  }
}

export type MetodoPago =
  | "efectivo"
  | "transferencia"
  | "transferencia_bancaria"
  | "qr"
  | "otro";

export class MetodoPagoValue {
  constructor(public readonly metodo: MetodoPago) {
    if (
      ![
        "efectivo",
        "transferencia",
        "transferencia_bancaria",
        "qr",
        "otro",
      ].includes(metodo)
    ) {
      throw new Error(`Método de pago inválido: ${metodo}`);
    }
  }
  display(): string {
    const labels: Record<MetodoPago, string> = {
      efectivo: "Efectivo",
      transferencia: "Transferencia",
      transferencia_bancaria: "Trans. Bancaria",
      qr: "QR",
      otro: "Otro",
    };
    return labels[this.metodo];
  }
}
