function errorHandler(err, req, res, next) {
    console.error(err.stack); // Registrar el error para depuración
    res.status(500).json({ error: 'Error interno del servidor' }); // Devolver respuesta de error
  }
  
  export default errorHandler;
  