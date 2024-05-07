import { getAllNews as _getAllNews, getNewsById as _getNewsById, createNews as _createNews, updateNews as _updateNews, deleteNews as _deleteNews } from '../services/newsService'; // Importar servicio de noticias

// Obtener todas las noticias
const getAllNews = async (req, res) => {
  try {
    const news = await _getAllNews(); // Llamar al servicio para obtener noticias
    res.status(200).json(news); // Devolver noticias en formato JSON
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' }); // Manejo de errores
  }
};

// Obtener una noticia por ID
const getNewsById = async (req, res) => {
  try {
    const news = await _getNewsById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticia por ID' });
  }
};

// Crear una nueva noticia
const createNews = async (req, res) => {
  try {
    const newNews = await _createNews(req.body); // Llamar al servicio para crear noticia
    res.status(201).json(newNews); // Devolver la nueva noticia
  } catch (error) {
    res.status(500).json({ error: 'Error al crear noticia' });
  }
};

// Actualizar una noticia por ID
const updateNews = async (req, res) => {
  try {
    const updatedNews = await _updateNews(req.params.id, req.body);
    if (!updatedNews) {
      return res.status(404).json({ error: 'Noticia no encontrada para actualizar' });
    }
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar noticia' });
  }
};

// Eliminar una noticia por ID
const deleteNews = async (req, res) => {
  try {
    const deletedNews = await _deleteNews(req.params.id);
    if (!deletedNews) {
      return res.status(404).json({ error: 'Noticia no encontrada para eliminar' });
    }
    res.status(200).json({ message: 'Noticia eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar noticia' });
  }
};

// Exportar las funciones del controlador
export default {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
