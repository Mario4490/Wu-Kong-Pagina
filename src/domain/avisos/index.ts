// src/domain/avisos/index.ts
export { HermesAviso } from "./entity";
export type { HermesAvisoRepository } from "./repository";
export { generarAvisoRecordatorioVencimiento, generarAvisoCuotaVencida, generarReciboDigital, generarAvisoGeneral } from "./generar-aviso.service";
export type { AvisoState } from "./generar-aviso.service";
