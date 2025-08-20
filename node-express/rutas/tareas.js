import express from 'express';

import clienteTareas from '../cliente-grpc.js';
import { validarTarea } from '../utils/validaciones.js';
import { manejarErrorGrpc } from '../utils/errores.js';

const router = express.Router();

// GET /tareas?limite=10&desplazamiento=0
router.get('/', (req, res) => {
  const limite = parseInt(req.query.limite) || 10;
  const desplazamiento = parseInt(req.query.desplazamiento) || 0;
  clienteTareas.ListarTareas({ limite, desplazamiento }, (error, respuesta) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json(respuesta);
    }
  });
});

// GET /tareas/:id
router.get('/:id', (req, res) => {
  clienteTareas.ObtenerTarea({ id: req.params.id }, (error, respuesta) => {
    if (error) {
      manejarErrorGrpc(error, res);
    } else if (!respuesta || Object.keys(respuesta).length === 0) {
      res.status(404).json({ error: 'Tarea no encontrada' });
    } else {
      res.json(respuesta);
    }
  });
});

// POST /tareas
router.post('/', (req, res) => {
  const datos = {
    titulo: req.body.titulo,
    prioridad: req.body.prioridad,
    descripcion: req.body.descripcion,
    completada: req.body.completada === undefined ? false : req.body.completada
  };
  const errores = validarTarea(datos);
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Validaciones fallidas', detalles: errores });
  }
  clienteTareas.CrearTarea(datos, (error, respuesta) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(201).json(respuesta);
    }
  });
});

// PUT /tareas/:id
router.put('/:id', (req, res) => {
  const datos = {
    id: req.params.id,
    titulo: req.body.titulo,
    prioridad: req.body.prioridad,
    descripcion: req.body.descripcion,
    completada: req.body.completada === undefined ? false : req.body.completada
  };
  const errores = validarTarea(datos);
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Validaciones fallidas', detalles: errores });
  }
  clienteTareas.ActualizarTarea(datos, (error, respuesta) => {
    if (error) {
      manejarErrorGrpc(error, res);
    } else {
      res.json(respuesta);
    }
  });
});

// PATCH /tareas/:id
router.patch('/:id', (req, res) => {
  const datos = {
    id: req.params.id,
    ...req.body
  };
  const errores = validarTarea(datos, true);
  if (errores.length > 0) {
    return res.status(400).json({ error: 'Validaciones fallidas', detalles: errores });
  }
  clienteTareas.ActualizarTarea(datos, (error, respuesta) => {
    if (error) {
      manejarErrorGrpc(error, res);
    } else {
      res.json(respuesta);
    }
  });
});

// DELETE /tareas/:id
router.delete('/:id', (req, res) => {
  clienteTareas.EliminarTarea({ id: req.params.id }, (error, respuesta) => {
    if (error) {
      manejarErrorGrpc(error, res);
    } else {
      res.json(respuesta);
    }
  });
});

export default router;
