import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase').default.default;

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
