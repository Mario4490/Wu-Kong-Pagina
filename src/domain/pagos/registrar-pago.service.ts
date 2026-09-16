// src/domain/pagos/registrar-pago.service.ts
import { Pago } from "./entity";
import { PagoRepository } from "./repository";

export class RegistrarPagoService {
  constructor(private pagoRepository: PagoRepository) {}

  async registrarPago(
    alumnoId: string,
    monto: number,
    fechaPago: Date,
    metodo: "efectivo" | "transferencia" | "transferencia_bancaria" | "qr" | "otro",
  ): Promise<Pago> {
    const id = crypto.randomUUID();
    const fechaRegistro = new Date();
    const pago = new Pago(id, alumnoId, monto, fechaPago, metodo, fechaRegistro);
    await this.pagoRepository.guardar(pago);
    return pago;
  }
}
