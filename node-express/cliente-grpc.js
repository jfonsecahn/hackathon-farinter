import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

// Cargar el archivo .proto
const packageDefinition = protoLoader.loadSync(
  './protos/tareas.proto', // Ajusta la ruta si el archivo está en otra carpeta
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  }
);
const tareasProto = grpc.loadPackageDefinition(packageDefinition).tareas;

const clienteTareas = new tareasProto.ServicioTareas(
  '172.16.2.231:50051',
  grpc.credentials.createInsecure()
);

// Ejemplo de llamada para validar la conexión y el proto
clienteTareas.ListarTareas({}, (error, response) => {
  if (error) {
    console.error('Error al llamar a ListarTareas:', error);
  } else {
    console.log('Respuesta de ListarTareas:', response);
  }
});

// Exportar por defecto el cliente gRPC
export default clienteTareas;