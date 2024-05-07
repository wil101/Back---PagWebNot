import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase').default.default;

const Publicidad = sequelize.define('Publicidad', {
  ad_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  target_url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  placement: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Publicidad;
