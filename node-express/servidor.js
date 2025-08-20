import express from 'express';
// Importa el cliente gRPC usando ES Modules

import tareasRouter from './rutas/tareas.js';

const aplicacion = express();
const PUERTO = process.env.PORT || 3000;

// Middleware para parsear JSON
aplicacion.use(express.json());

// Ruta de prueba básica
aplicacion.get('/', (peticion, respuesta) => {
  respuesta.json({ 
    mensaje: '¡Hola Mundo! Gateway de Tareas funcionando',
    timestamp: new Date().toISOString(),
    puerto: PUERTO
  });
});


// Usar el router de tareas para todos los endpoints /tareas
aplicacion.use('/tareas', tareasRouter);



aplicacion.listen(PUERTO, () => {
  console.log(`🚀 Servidor Express iniciado en puerto ${PUERTO}`);
  console.log(`📝 Visita http://localhost:${PUERTO} para verificar`);
  console.log(`💡 Implementa las rutas de tareas usando gRPC!`);
});