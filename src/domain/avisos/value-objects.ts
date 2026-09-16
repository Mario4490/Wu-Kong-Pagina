// avisos/value-objects.ts
import { AlumnoId } from "../shared";

/**
 * AvisoId — Value Object
 */
export class AvisoId {
  constructor(public readonly valor: string) {
    if (!valor || valor.trim().length === 0) {
      throw new Error("El ID de aviso no puede estar vacío");
    }
    this.valor = valor.trim();
  }
  equals(other: AvisoId): boolean {
    return this.valor === other.valor;
  }
}

/**
 * TipoAviso — Value Object que restringe los tipos válidos.
 * Tipos definidos por las reglas del negocio:
 * - aviso_vencimiento: Alerta de próximo vencimiento de cuota
 * - aviso_cierre: Cierre por feriado / fecha no laboral
 * - aviso_examen: Información sobre próximo examen de grado
 * - aviso_general: Aviso institucional genérico
 * - recordatorio_cobro: Recordatorio de cobro pendiente
 * - suspension_clase: Suspensión de clase a último momento
 */
export type TipoAviso =
  | "aviso_vencimiento"
  | "aviso_cierre"
  | "aviso_examen"
  | "aviso_general"
  | "recordatorio_cobro"
  | "suspension_clase";

export class TipoAvisoValue {
  constructor(public readonly valor: TipoAviso) {
    const tiposValidos: TipoAviso[] = [
      "aviso_vencimiento",
      "aviso_cierre",
      "aviso_examen",
      "aviso_general",
      "recordatorio_cobro",
      "suspension_clase",
    ];
    if (!tiposValidos.includes(valor)) {
      throw new Error(`Tipo de aviso inválido: ${valor}`);
    }
  }

  display(): string {
    const labels: Record<TipoAviso, string> = {
      aviso_vencimiento: "Aviso Vencimiento",
      aviso_cierre: "Cierre",
      aviso_examen: "Examen de Grado",
      aviso_general: "Aviso General",
      recordatorio_cobro: "Recordatorio de Cobro",
      suspension_clase: "Suspensión de Clase",
    };
    return labels[this.valor];
  }

  esCritico(): boolean {
    return [
      "aviso_vencimiento",
      "suspension_clase",
      "recordatorio_cobro",
    ].includes(this.valor);
  }
}

/**
 * EstadoAviso — Value Object
 * Estados:
 * - pendiente: Aviso generado, aún no enviado
 * - enviado: Aviso enviado por WhatsApp/push/email
 * - leido: Confirmado como leído por el profesor/admin (check de visto)
 * - vencido: Aviso que ya no es relevante (ej. vencimiento que pasó)
 */
export type EstadoAviso = "pendiente" | "enviado" | "leido" | "vencido";

export class EstadoAvisoValue {
  constructor(public readonly valor: EstadoAviso) {
    const estadosValidos: EstadoAviso[] = ["pendiente", "enviado", "leido", "vencido"];
    if (!estadosValidos.includes(valor)) {
      throw new Error(`Estado de aviso inválido: ${valor}`);
    }
    this.valor = valor;
  }

  display(): string {
    const labels: Record<EstadoAviso, string> = {
      pendiente: "Pendiente",
      enviado: "Enviado",
      leido: "Leído",
      vencido: "Vencido",
    };
    return labels[this.valor];
  }

  esFinal(): boolean {
    return ["leido", "vencido"].includes(this.valor);
  }
}

/**
 * FechaEnvio — Value Object
 */
export class FechaEnvio {
  constructor(public readonly valor: Date) {
    if (isNaN(valor.getTime())) {
      throw new Error("La fecha de envío es inválida");
    }
    this.valor = new Date(valor);
  }

  display(): string {
    return this.valor.toLocaleString("esAR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  toDateOnly(): Date {
    const d = new Date(this.valor);
    d.setHours(0, 0, 0, 0);
    return d;
  }
}
