// src/domain/avisos/index.ts
export { AvisoId, AlumnoId, TipoAvisoValue, EstadoAvisoValue, FechaEnvio } from "./value-objects";
export type { TipoAviso, EstadoAviso } from "./value-objects";
export { HermesAviso } from "./entity";
export type { HermesAvisoRepository } from "./repository";
export { GenerarAvisoService } from "./generar-aviso.service";
