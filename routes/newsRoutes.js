import { Router } from 'express';
import { getAllNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/newsController'; // Importar el controlador de noticias
import validateNews from '../middlewares/validateNews'; // Middleware para validar datos

const router = Router();

// Rutas para noticias
router.get('/noticias', getAllNews); // Obtener todas las noticias
router.get('/noticias/:id', getNewsById); // Obtener una noticia por ID
router.post('/noticias', validateNews, createNews); // Crear una noticia, con validación
router.put('/noticias/:id', validateNews, updateNews); // Actualizar una noticia por ID
router.delete('/noticias/:id', deleteNews); // Eliminar una noticia por ID

export default router; // Exportar las rutas
