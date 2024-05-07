const sequelize = require('./config/DataBase');
const Usuario = require('./models/usuario');
const Rol = require('./models/rol');
const Noticia = require('./models/noticia');
const Publicidad = require('./models/publicidad');
const Evento = require('./models/evento');

//relaciones entre modelos
Usuario.belongsTo(Rol, { foreignKey: 'role_id' });
Rol.hasMany(Usuario, { foreignKey: 'role_id' });

Noticia.belongsTo(Usuario, { foreignKey: 'author_id' });
Usuario.hasMany(Noticia, { foreignKey: 'author_id' });

sequelize.sync() // Sincronizar modelos con la base de datos
  .then(() => console.log('Base de datos y modelos sincronizados'))
  .catch(err => console.error('Error al sincronizar modelos con la base de datos:', err));
