const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const JadwalMatkul = sequelize.define("jadwalMatkul", {
    id_jadwal: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    hari: {
      type: DataTypes.STRING,
    },
  });
  return JadwalMatkul;
};
