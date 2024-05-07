const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase');

const Rol = sequelize.define('Rol', {
  role_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  permissions: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Rol;
