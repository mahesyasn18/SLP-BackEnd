const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const AngkatanMatkul = sequelize.define('angkatan_detail_matkul', {});

  return AngkatanMatkul;
};
