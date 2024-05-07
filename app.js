import express from 'express';
import morgan from 'morgan'; // Middleware para registrar solicitudes HTTP
import { json, urlencoded } from 'body-parser'; // Middleware para parsear solicitudes JSON
import cors from 'cors'; // Middleware para habilitar CORS
import sequelize from './config/DataBase'; // Importar la configuración de la base de datos
import errorHandler from './middlewares/errorHandler';
import authenticate from './middlewares/authenticate';
import validateNews from './middlewares/validateNews';
import newsRoutes from './routes/newsRoutes';
import userRoutes from './routes/userRoutes'; 
const app = express();

// Configurar middlewares globales
app.use(morgan('dev')); // Registrar solicitudes HTTP
app.use(cors()); // Habilitar CORS
app.use(json()); // Parsear datos JSON
app.use(urlencoded({ extended: true })); // Manejar datos codificados en URL

// Rutas y middlewares específicos
app.use('/api/news', validateNews, newsRoutes); // Aplicar middleware de validación para rutas de noticias
app.use('/api/users', authenticate, userRoutes); // Aplicar middleware de autenticación para rutas de usuarios

// Middleware para manejo de errores
app.use(errorHandler); // Manejo de errores global
app.use(sequelize.errorHandler); // Manejo de errores de la base de datos

const PORT = process.env.PORT || 3000; // Puerto para el servidor

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
