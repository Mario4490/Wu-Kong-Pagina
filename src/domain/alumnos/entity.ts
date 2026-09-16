// alumnos/entity.ts
import { AlumnoId } from "../shared";

/**
 * Alumno — Entity del contexto de alumnos.
 * Reglas:
 * - El nombre y disciplina son obligatorios
 * - La entidad es inmutable en su identidad (el ID no cambia)
 * - Puede cambiar su nombre/disciplina (operaciones deliberadas, no seters sueltos)
 */
export class Alumno {
  constructor(
    public readonly id: AlumnoId,
    public nombre: string,
    public disciplina: string,
    public readonly createdAt: Date = new Date(),
  ) {
    if (!nombre || nombre.trim().length === 0) {
      throw new Error("El nombre del alumno es obligatorio");
    }
    this.nombre = nombre.trim();

    if (!disciplina || disciplina.trim().length === 0) {
      throw new Error("La disciplina es obligatoria");
    }
    this.disciplina = disciplina.trim();
  }

  /**
   * Actualiza el nombre del alumno.
   * Regla: no puede estar vacío.
   */
  actualizarNombre(nuevoNombre: string): void {
    if (!nuevoNombre || nuevoNombre.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío");
    }
    this.nombre = nuevoNombre.trim();
  }

  /**
   * Cambia la disciplina del alumno.
   */
  cambiarDisciplina(nuevaDisciplina: string): void {
    if (!nuevaDisciplina || nuevaDisciplina.trim().length === 0) {
      throw new Error("La disciplina no puede estar vacía");
    }
    this.disciplina = nuevaDisciplina.trim();
  }

  /**
   * Deriva un nombre corto para display (primer apellido + primer nombre si es posible)
   */
  get nombreCorto(): string {
    const partes = this.nombre.split(" ");
    if (partes.length >= 2) {
      return `${partes[0]} ${partes[partes.length - 1]}`;
    }
    return this.nombre;
  }
}
