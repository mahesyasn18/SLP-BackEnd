const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Angkatan = sequelize.define("angkatan", {
    id_angkatan: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    tahun_angkatan: {
      type: DataTypes.STRING,
    },
  });
  return Angkatan;
};
