const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Prodi = sequelize.define("prodi", {
    id_prodi: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_prodi: {
      type: DataTypes.STRING
    },
  });

  return Prodi;
};