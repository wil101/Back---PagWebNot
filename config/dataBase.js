import { Sequelize } from 'sequelize';

// Configuración de la base de datos
const dbName = process.env.DB_NAME || 'medellin_times';
const dbUser = process.env.DB_USER || 'root'; // Usuario de MySQL
const dbPassword = process.env.DB_PASSWORD || 'admin123'; // Contraseña de MySQL
const dbHost = process.env.DB_HOST || 'localhost';

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'mysql',
  logging: false,
});

// Importar todos los modelos
import Usuario, { belongsTo, hasMany } from '../models/usuario'; // Importar el modelo de Usuario
import Rol, { hasMany as _hasMany } from '../models/rol'; // Importar el modelo de Rol
import Noticia, { belongsTo as _belongsTo } from '../models/noticia'; // Importar el modelo de Noticia
import Publicidad, { belongsTo as __belongsTo } from '../models/publicidad'; // Importar el modelo de Publicidad
import Evento, { belongsTo as ___belongsTo } from '../models/evento'; // Importar el modelo de Evento

// Definir relaciones entre modelos
belongsTo(Rol, { foreignKey: 'role_id' }); // Relación entre Usuario y Rol
_hasMany(Usuario, { foreignKey: 'role_id' });

_belongsTo(Usuario, { foreignKey: 'author_id' }); // Relación entre Noticia y Usuario
hasMany(Noticia, { foreignKey: 'author_id' });

__belongsTo(Usuario, { foreignKey: 'user_id' }); // Relación entre Publicidad y Usuario
hasMany(Publicidad, { foreignKey: 'user_id' });

___belongsTo(Usuario, { foreignKey: 'user_id' }); // Relación entre Evento y Usuario
hasMany(Evento, { foreignKey: 'user_id' });

// Sincronizar la base de datos
sequelize.sync()
  .then(() => console.log('Base de datos y modelos sincronizados'))
  .catch(err => console.error('Error al sincronizar modelos con la base de datos:', err));

// Exportar la instancia de Sequelize
export default sequelize;
