// src/domain/avisos/generar-aviso.service.ts
import { Monto } from "../shared";
import { MetodoPagoValue } from "../shared";

export type AvisoState = {
  alumno_id: string;
  tipo_aviso: string;
  texto_final: string;
};

export function generarAvisoRecordatorioVencimiento(
  alumnoId: string,
  nombre: string,
  disciplina: string,
  fechaVencimiento: string,
): AvisoState {
  const fechaFormateada = formatearFechaArgentina(fechaVencimiento);
  const texto = `Qué haces, ${nombre}! Te aviso que tu cuota de ${disciplina} en Team Wukong vence en 3 días (${fechaFormateada}). Mantené tu lugar asegurado para la próxima clase. Nos vemos en el tatami! OSS`;
  return {
    alumno_id: alumnoId,
    tipo_aviso: "aviso_vencimiento",
    texto_final: texto,
  };
}

export function generarAvisoCuotaVencida(
  alumnoId: string,
  nombre: string,
  disciplina: string,
): AvisoState {
  const texto = `Hola ${nombre}. Te informamos que tu cuota de ${disciplina} ya se encuentra vencida. Para seguir afilando la máquina y tener acceso a las clases, por favor regularizá tu estado hoy o envianos tu comprobante por acá. Abrazo de equipo!`;
  return {
    alumno_id: alumnoId,
    tipo_aviso: "aviso_cuota_vencida",
    texto_final: texto,
  };
}

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
    tipo_aviso: "aviso_general",
    texto_final: texto,
  };
}

function formatearFechaArgentina(isoDate: string): string {
  if (!isoDate) return "Fecha inválida";
  const date = new Date(isoDate);
  if (isNaN(date.getTime())) return "Fecha inválida";
  return date.toLocaleDateString("esAR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

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
