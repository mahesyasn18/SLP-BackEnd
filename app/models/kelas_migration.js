const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Kelas = sequelize.define("kelas", {
    id_kelas: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama_kelas: {
      type: DataTypes.STRING,
    },
  });

  return Kelas;
};
