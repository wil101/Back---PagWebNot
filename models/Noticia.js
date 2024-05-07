import { DataTypes } from 'sequelize';
const { DataTypes } = require('sequelize');
const sequelize = require('../config/DataBase').default.default;

const Noticia = sequelize.define('Noticia', {
  news_id: {
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
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  timestamps: false,
});

module.exports = Noticia;
