import { create, findOne, findByPk } from '../models/usuario'; // Importar el modelo de Usuario
import { hash, compare } from 'bcrypt'; // Para el hash de contraseñas
import { sign } from 'jsonwebtoken'; // Para la creación de tokens JWT

// Crear un nuevo usuario
const createUser = async (userData) => {
  try {
    // Encriptar la contraseña antes de crear el usuario
    const hashedPassword = await hash(userData.password, 10); // 10 rondas de sal
    const user = await create({
      ...userData,
      password: hashedPassword, // Usar la contraseña encriptada
    });
    return user;
  } catch (error) {
    throw new Error('Error al crear el usuario');
  }
};
// Autenticar al usuario (login)
const authenticateUser = async (loginData) => {
  try {
    const { username, password } = loginData;
    
    // Buscar al usuario por nombre de usuario o correo electrónico
    const user = await findOne({
      where: {
        username, // Buscando por nombre de usuario
      },
    });

    if (!user) {
      throw new Error('Usuario no encontrado'); // Manejo de error si el usuario no existe
    }
    // Comparar la contraseña proporcionada con la almacenada
    const match = await compare(password, user.password);
    if (!match) {
      throw new Error('Credenciales incorrectas'); // Contraseña incorrecta
    }
    // Crear y devolver un token JWT
    const token = sign(
      { user_id: user.user_id, username: user.username }, // Payload del token
      process.env.JWT_SECRET, // Clave secreta para JWT
      { expiresIn: '1h' } // El token expira en 1 hora
    );

    return { user, token }; // Devolver el usuario autenticado y el token
  } catch (error) {
    throw new Error('Error al autenticar al usuario');
  }
};
// Obtener un usuario por ID
const getUserById = async (userId) => {
  try {
    return await findByPk(userId); // Buscar usuario por ID
  } catch (error) {
    throw new Error('Error al obtener al usuario por ID');
  }
};
// Actualizar un usuario por ID
const updateUser = async (userId, updatedData) => {
  try {
    const user = await findByPk(userId); // Buscar usuario por ID
    if (!user) {
      return null; // Usuario no encontrado
    }

    if (updatedData.password) {
      // Si se incluye una nueva contraseña, encriptarla antes de actualizar
      updatedData.password = await hash(updatedData.password, 10);
    }

    return await user.update(updatedData); // Actualizar el usuario con los datos actualizados
  } catch (error) {
    throw new Error('Error al actualizar al usuario');
  }
};

// Eliminar un usuario por ID
const deleteUser = async (userId) => {
  try {
    const user = await findByPk(userId); // Buscar usuario por ID
    if (!user) {
      return null; // Usuario no encontrado
    }
    await user.destroy(); // Eliminar al usuario
    return user; // Retornar el usuario eliminado
  } catch (error) {
    throw new Error('Error al eliminar al usuario');
  }
};

// Exportar las funciones del servicio
export default {
  createUser,
  authenticateUser,
  getUserById,
  updateUser,
  deleteUser,
};