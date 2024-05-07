const { Sequelize } = require('sequelize');

// Variables de entorno para las credenciales de la base de datos
const dbName = process.env.DB_NAME || 'medellin_times';
const dbUser = process.env.DB_USER || 'root'; // Reemplaza con tu usuario de MySQL
const dbPassword = process.env.DB_PASSWORD || 'admin123'; // Reemplaza con tu contraseña de MySQL
const dbHost = process.env.DB_HOST || 'localhost';

// Inicialización de Sequelize
const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
});

// Comprobación de la conexión
sequelize
  .authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa.');
  })
  .catch((err) => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;

