// src/domain/pagos/index.ts
export { Monto, MetodoPagoValue, PagoId, FechaPago, MetodoPago } from "./value-objects";
export { Pago } from "./entity";
export { ReciboDigital } from "./recibo";
export type { PagoRepository } from "./repository";
export { RegistrarPagoService } from "./registrar-pago.service";
export { EstadoAlumnoService } from "./estado-alumno.service";
