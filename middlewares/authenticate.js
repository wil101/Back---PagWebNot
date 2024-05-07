import { verify } from 'jsonwebtoken'; // Para verificar tokens JWT

function authenticate(req, res, next) {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó token de autenticación' });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET); // Verificar el token con una clave secreta
    req.user = decoded; // Adjuntar el usuario decodificado a la solicitud
    next(); // Continuar al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ error: 'Token de autenticación no válido' });
  }
}

export default authenticate;
