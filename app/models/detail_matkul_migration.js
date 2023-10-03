const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Angkatan = sequelize.define("angkatan", {
    id_detailMatkul: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    tipe: {
      type: DataTypes.STRING,
    },
    sks: {
      type: DataTypes.INTEGER,
    },
  });
  return Angkatan;
};
