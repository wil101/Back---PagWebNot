import { createUser as _createUser, authenticateUser, getUserById as _getUserById, updateUser as _updateUser, deleteUser as _deleteUser } from '../services/userService'; // Importar servicio de usuarios
import { sign } from 'jsonwebtoken'; // Para manejo de tokens JWT

// Crear un nuevo usuario
const createUser = async (req, res) => {
  try {
    const newUser = await _createUser(req.body); // Llamar al servicio para crear usuario
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Iniciar sesión (Login) y devolver token JWT
const login = async (req, res) => {
  try {
    const user = await authenticateUser(req.body); // Autenticar usuario
    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    // Crear token JWT
    const token = sign({ user_id: user.user_id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token válido por 1 hora
    });

    res.status(200).json({ token }); // Devolver el token al cliente
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
  try {
    const user = await _getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
  try {
    const updatedUser = await _updateUser(req.params.id, req.body);
    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado para actualizar' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await _deleteUser(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado para eliminar' });
    }
    res.status(200).json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};

// Exportar funciones del controlador
export default {
  createUser,
  login,
  getUserById,
  updateUser,
  deleteUser,
};
