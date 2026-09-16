// src/domain/alumnos/entity.ts
import { AlumnoRepository } from "./repository";

/**
 * Alumno — Entity del contexto de alumnos.
 */
export class Alumno {
  constructor(
    public readonly id: string,
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

  actualizarNombre(nuevoNombre: string): void {
    if (!nuevoNombre || nuevoNombre.trim().length === 0) {
      throw new Error("El nombre no puede estar vacío");
    }
    this.nombre = nuevoNombre.trim();
  }

  cambiarDisciplina(nuevaDisciplina: string): void {
    if (!nuevaDisciplina || nuevaDisciplina.trim().length === 0) {
      throw new Error("La disciplina no puede estar vacía");
    }
    this.disciplina = nuevaDisciplina.trim();
  }

  get nombreCorto(): string {
    const partes = this.nombre.split(" ");
    if (partes.length >= 2) {
      return `${partes[0]} ${partes[partes.length - 1]}`;
    }
    return this.nombre;
  }
}
