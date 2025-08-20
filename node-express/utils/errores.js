// errores.js

function manejarErrorGrpc(error, res, notFoundMsg = 'Tarea no encontrada') {
  if (error.code === 5) {
    res.status(404).json({ error: notFoundMsg });
  } else {
    res.status(500).json({ error: error.message });
  }
}

export { manejarErrorGrpc };
