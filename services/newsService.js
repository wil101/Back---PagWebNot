import { findAll, findByPk, create } from '../models/noticia'; // Importar el modelo de Noticia

// Obtener todas las noticias
const getAllNews = async () => {
  try {
    return await findAll(); // Recupera todas las noticias
  } catch (error) {
    throw new Error('Error al obtener todas las noticias');
  }
};

// Obtener una noticia por ID
const getNewsById = async (newsId) => {
  try {
    return await findByPk(newsId); // Busca la noticia por su ID
  } catch (error) {
    throw new Error('Error al obtener la noticia por ID');
  }
};

// Crear una nueva noticia
const createNews = async (newsData) => {
  try {
    return await create(newsData); // Crea una nueva noticia con los datos proporcionados
  } catch (error) {
    throw new Error('Error al crear la noticia');
  }
};

// Actualizar una noticia por ID
const updateNews = async (newsId, updatedData) => {
  try {
    const news = await findByPk(newsId); // Busca la noticia por su ID
    if (!news) {
      return null; // Si no se encuentra la noticia, retorna null
    }
    return await news.update(updatedData); // Actualiza la noticia con los datos nuevos
  } catch (error) {
    throw new Error('Error al actualizar la noticia');
  }
};

// Eliminar una noticia por ID
const deleteNews = async (newsId) => {
  try {
    const news = await findByPk(newsId); // Busca la noticia por su ID
    if (!news) {
      return null; // Si no se encuentra la noticia, retorna null
    }
    await news.destroy(); // Elimina la noticia
    return news; // Retorna la noticia eliminada
  } catch (error) {
    throw new Error('Error al eliminar la noticia');
  }
};

// Exportar las funciones del servicio
export default {
  getAllNews,
  getNewsById,
  createNews,
  updateNews,
  deleteNews,
};
