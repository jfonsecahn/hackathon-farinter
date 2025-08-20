// validaciones.js

function validarTarea(data, parcial = false) {
  const errores = [];
  if (!parcial || data.titulo !== undefined) {
    if (!data.titulo || typeof data.titulo !== 'string' || data.titulo.trim() === '') {
      errores.push('El título es requerido y no puede estar vacío.');
    }
  }
  if (!parcial || data.prioridad !== undefined) {
    if (typeof data.prioridad !== 'number' || data.prioridad < 1 || data.prioridad > 5) {
      errores.push('La prioridad debe ser un número entre 1 y 5.');
    }
  }
  if (data.completada !== undefined && typeof data.completada !== 'boolean') {
    errores.push('El campo completada debe ser booleano.');
  }
  return errores;
}

export { validarTarea };
