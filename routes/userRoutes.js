import { Router } from 'express';
import { createUser, login, getUserById, updateUser, deleteUser } from '../controllers/userController'; // Controlador para usuarios
import authenticate from '../middlewares/authenticate'; // Middleware para autenticación

const router = Router();

// Rutas para usuarios
router.post('/usuarios', createUser); // Crear un usuario
router.post('/login', login); // Iniciar sesión (devolución de token JWT)

router.get('/usuarios/:id', authenticate, getUserById); // Obtener un usuario por ID
router.put('/usuarios/:id', authenticate, updateUser); // Actualizar un usuario
router.delete('/usuarios/:id', authenticate, deleteUser); // Eliminar un usuario

export default router; // Exportar las rutas
