const request = require('supertest');
const express = require('express');
const tareasRouter = require('./rutas/tareas.js');

// Configura la app para pruebas
const app = express();
app.use(express.json());
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Hola Mundo! Gateway de Tareas funcionando' });
});
app.use('/tareas', tareasRouter);

describe('Endpoints principales', () => {
  test('GET / responde con mensaje y status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensaje');
  });

  test('GET /tareas responde con status 200', async () => {
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(200);
    // Puedes agregar más validaciones según la respuesta esperada
  });

  test('PUT /tareas/:id edita una tarea y responde con status 200', async () => {
    const tareaEditada = { titulo: 'Tarea Editada', descripcion: 'Actualizada' };
    const res = await request(app)
      .put('/tareas/1')
      .send(tareaEditada);
    expect(res.statusCode).toBe(200);
    // Puedes validar el contenido de la respuesta según tu implementación
  });

  test('DELETE /tareas/:id elimina una tarea y responde con status 200', async () => {
    const res = await request(app)
      .delete('/tareas/1');
    expect(res.statusCode).toBe(200);
    // Puedes validar el contenido de la respuesta según tu implementación
  });

  test('POST /tareas crea una nueva tarea y responde con status 201', async () => {
    const nuevaTarea = { titulo: 'Tarea Nueva', descripcion: 'Descripción de la tarea' };
    const res = await request(app)
      .post('/tareas')
      .send(nuevaTarea);
    expect(res.statusCode).toBe(201);
    // Puedes validar el contenido de la respuesta según tu implementación
  });
});
