import { body, validationResult } from 'express-validator';

const validateNews = [
  body('title').notEmpty().withMessage('El título es obligatorio'),
  body('content').notEmpty().withMessage('El contenido es obligatorio'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // Devolver errores de validación
    }
    next(); // Continuar al siguiente middleware o controlador
  },
];

export default validateNews;
