// src/domain/index.ts
export { AlumnoId, Monto, MetodoPagoValue } from "./shared";
export type { MetodoPago } from "./shared";
export { Alumno } from "./alumnos/entity";
export type { AlumnoRepository } from "./alumnos/repository";
export { Pago } from "./pagos/entity";
export { ReciboDigital } from "./pagos/recibo";
export type { PagoRepository } from "./pagos/repository";
export { RegistrarPagoService } from "./pagos/registrar-pago.service";
export { EstadoAlumnoService } from "./pagos/estado-alumno.service";
export { HermesAviso } from "./avisos/entity";
export type { HermesAvisoRepository } from "./avisos/repository";
export { generarAvisoRecordatorioVencimiento, generarAvisoCuotaVencida, generarReciboDigital, generarAvisoGeneral } from "./avisos/generar-aviso.service";
export type { AvisoState } from "./avisos/generar-aviso.service";
