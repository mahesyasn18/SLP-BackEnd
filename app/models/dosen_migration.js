const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Dosen = sequelize.define("dosen", {
    kode_dosen: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama_dosen: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

  return Dosen;
};
