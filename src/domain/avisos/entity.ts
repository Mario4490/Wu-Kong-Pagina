// avisos/entity.ts
import { AvisoId, AlumnoId, TipoAvisoValue, EstadoAvisoValue, FechaEnvio, TipoAviso, EstadoAviso } from "./value-objects";
import { Alumno } from "../alumnos/entity";

/**
 * HermesAviso — Aggregate Root del contexto de avisos.
 *
 * Representa un aviso/alerta que el sistema Hermes genera para un alumno
 * (vencimiento de cuota, cierre, suspensión, recordatorio, etc.)
 *
 * Reglas de negocio:
 * - El aviso siempre tiene un alumno destinatario
 * - El tipo de aviso determina si es crítico (requiere check de visto)
 * - El estado evoluciona: pendiente → enviado → leído/vencido
 * - Un aviso crítico sin confirmar de lectura es una alarma
 * - El aviso genera su propio contenido para WhatsApp
 */
export class HermesAviso {
  private _id: AvisoId;
  private _alumnoId: AlumnoId;
  private _tipo: TipoAvisoValue;
  private _estado: EstadoAvisoValue;
  private _fechaEnvio: FechaEnvio;
  private _contenido: string;
  private _fechaVisto?: Date;

  constructor(
    id: AvisoId,
    alumnoId: AlumnoId,
    tipo: TipoAviso,
    estado: EstadoAviso,
    fechaEnvio: Date,
    contenido: string,
    fechaVisto?: Date,
  ) {
    this._id = id;
    this._alumnoId = alumnoId;
    this._tipo = new TipoAvisoValue(tipo);
    this._estado = new EstadoAvisoValue(estado);
    this._fechaEnvio = new FechaEnvio(fechaEnvio);
    this._contenido = contenido.trim() || "";
    if (fechaVisto) {
      this._fechaVisto = new Date(fechaVisto);
    }
  }

  get id(): AvisoId {
    return this._id;
  }

  get alumnoId(): AlumnoId {
    return this._alumnoId;
  }

  get tipo(): TipoAvisoValue {
    return this._tipo;
  }

  get estado(): EstadoAvisoValue {
    return this._estado;
  }

  get fechaEnvio(): FechaEnvio {
    return this._fechaEnvio;
  }

  get contenido(): string {
    return this._contenido;
  }

  get fechaVisto(): Date | undefined {
    return this._fechaVisto;
  }

  esCritico(): boolean {
    return this._tipo.esCritico();
  }

  fueEnviado(): boolean {
    return this._estado.valor !== "pendiente";
  }

  fueVisto(): boolean {
    return this._estado.valor === "leido";
  }

  marcarComoEnviado(): void {
    if (this._estado.valor !== "pendiente") {
      throw new Error(
        `No se puede marcar como enviado un aviso que ya está en estado "${this._estado.display()}"`,
      );
    }
    this._estado = new EstadoAvisoValue("enviado");
  }

  marcarComoLeido(): void {
    if (this._estado.valor === "leido") {
      throw new Error("El aviso ya fue marcado como leído");
    }
    if (this._estado.valor !== "enviado") {
      throw new Error(
        `No se puede marcar como leído un aviso que aún no fue enviado (estado: ${this._estado.display()})`,
      );
    }
    this._estado = new EstadoAvisoValue("leido");
    this._fechaVisto = new Date();
  }

  vencer(): void {
    if (this._estado.valor === "vencido") {
      throw new Error("El aviso ya está vencido");
    }
    if (this._estado.valor === "leido") {
      throw new Error("No se puede vencer un aviso que ya fue confirmado como leído");
    }
    this._estado = new EstadoAvisoValue("vencido");
  }

  toWhatsappText(): string {
    const fecha = this._fechaEnvio.display();

    const encabezado = this.formatearEncabezado();

    return [
      encabezado,
      "",
      this._contenido,
      "",
      `estado: ${this._estado.display()}`,
      `tipo: ${this._tipo.display()}`,
      `fecha de envío: ${fecha}`,
    ].join("\n");
  }

  toWhatsappCompact(): string {
    const emoji = this._tipo.esCritico() ? "⚠️" : "ℹ️";

    return [
      `${emoji} ${this._tipo.display()}`,
      this._contenido,
    ].join("\n");
  }

  private formatearEncabezado(): string {
    const encabezados: Record<TipoAviso, string> = {
      aviso_vencimiento: "*⚠️ AVISO DE VENCIMIENTO*",
      aviso_cierre: "*📅 CIERRE DE ACTIVIDAD*",
      aviso_examen: "*🥋 EXAMEN DE GRADO*",
      aviso_general: "*ℹ️ AVISO INSTITUCIONAL*",
      recordatorio_cobro: "*💰 RECORDATORIO DE COBRO*",
      suspension_clase: "*🚨 SUSPENSIÓN DE CLASE*",
    };

    return encabezados[this._tipo.valor] || "*ℹ️ AVISO*";
  }
}
