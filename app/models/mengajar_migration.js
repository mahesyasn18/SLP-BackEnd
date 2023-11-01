const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Mengajar = sequelize.define('mengajar', {});

  return Mengajar;
};
