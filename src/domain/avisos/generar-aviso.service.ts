// src/domain/avisos/generar-aviso.service.ts
import { AlumnoId, Monto, MetodoPagoValue, EstadoAvisoValue, TipoAvisoValue } from "../shared";
import { AvisoId, TipoAviso, EstadoAviso } from "./value-objects";

/**
 * Servicio de generación de avisos para el sistema Hermes.
 * Responsable de generar los mensajes formateados para cada tipo de aviso
 * y devolver un objeto de estado listo para registrar en `hermes_avisos`.
 */

export type AvisoState = {
  alumno_id: string;
  tipo_aviso: string;
  texto_final: string;
};

/**
 * Genera un aviso de recordatorio de vencimiento (faltan 3 días).
 * Plantilla:
 * "Qué haces, {nombre}! Te aviso que tu cuota de {disciplina} en Team Wukong vence en 3 días ({fecha_vencimiento}). Mantené tu lugar asegurado para la próxima clase. Nos vemos en el tatami! OSS"
 */
export function generarAvisoRecordatorioVencimiento(
  alumnoId: string,
  nombre: string,
  disciplina: string,
  fechaVencimiento: string, // formato ISO "YYYY-MM-DD", se formatea como DD/MM
): AvisoState {
  const fechaFormateada = formatearFechaArgentina(fechaVencimiento);

  const texto = `Qué haces, ${nombre}! Te aviso que tu cuota de ${disciplina} en Team Wukong vence en 3 días (${fechaFormateada}). Mantené tu lugar asegurado para la próxima clase. Nos vemos en el tatami! OSS`;

  return {
    alumno_id: alumnoId,
    tipo_aviso: "aviso_vencimiento",
    texto_final: texto,
  };
}

/**
 * Genera un aviso de cuota vencida (hoy o días pasados).
 * Plantilla:
 * "Hola {nombre}. Te informamos que tu cuota de {disciplina} ya se encuentra vencida. Para seguir afilando la máquina y tener acceso a las clases, por favor regularizá tu estado hoy o envianos tu comprobante por acá. Abrazo de equipo!"
 */
export function generarAvisoCuotaVencida(
  alumnoId: string,
  nombre: string,
  disciplina: string,
): AvisoState {
  const texto = `Hola ${nombre}. Te informamos que tu cuota de ${disciplina} ya se encuentra vencida. Para seguir afilando la máquina y tener acceso a las clases, por favor regularizá tu estado hoy o envianos tu comprobante por acá. Abrazo de equipo!`;

  return {
    alumno_id: alumnoId,
    tipo_aviso: "aviso_vencimiento",
    texto_final: texto,
  };
}

/**
 * Genera un recibo digital de pago (confirmación).
 * Usa el formato ya definido en el dominio — no lo cambiamos por ahora.
 * Retorna el objeto de estado con el texto final listo para `hermes_avisos`.
 *
 * @param alumnoId ID del alumno
 * @param nombre Nombre del alumno
 * @param disciplina Disciplina
 * @param monto Monto en ARS (número)
 * @param metodoMetodo Valor del método de pago (ej: "efectivo", "transferencia_bancaria", "qr")
 * @param metodoDisplay Texto legible del método (ej: "Efectivo", "Trans. Bancaria", "QR")
 * @param fechaEmision Fecha de emisión (ISO)
 */
export function generarReciboDigital(
  alumnoId: string,
  nombre: string,
  disciplina: string,
  monto: number,
  metodoMetodo: string,
  metodoDisplay: string,
  fechaEmision: string,
): AvisoState {
  const montoFormatted = new Monto(monto).toWhatsapp();
  const fechaFormateada = formatearFechaArgentina(fechaEmision);

  const texto = [
    "*RECIBO DIGITAL - TEAM WUKONG*",
    "",
    `Alumno: ${nombre}`,
    `Disciplina: ${disciplina}`,
    `Monto: ${montoFormatted}`,
    `Método: ${metodoDisplay}`,
    `Estado: Al día`,
    "",
    `Fecha de emisión: ${fechaFormateada}`,
    "",
    "Pago recibido! A seguir metiéndole duro.",
  ].join("\n");

  return {
    alumno_id: alumnoId,
    tipo_aviso: "aviso_general", // recibo digital se registra como aviso general (confirmación)
    texto_final: texto,
  };
}

/**
 * Utilidades internas
 */

function formatearFechaArgentina(isoDate: string): string {
  if (!isoDate) return "Fecha inválida";

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Fecha inválida";

  return date.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Genera un aviso de tipo genérico (personalizable).
 * Útil para avisos institucionales, noticias, etc.
 */
export function generarAvisoGeneral(
  alumnoId: string,
  titulo: string,
  cuerpo: string,
): AvisoState {
  const texto = `${titulo}\n\n${cuerpo}`;

  return {
    alumno_id: alumnoId,
    tipo_aviso: "aviso_general",
    texto_final: texto,
  };
}
