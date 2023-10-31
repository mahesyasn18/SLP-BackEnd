const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const JadwalMatkul = sequelize.define("jadwalMatkul", {
    id_jadwal: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    hari: {
      type: DataTypes.STRING,
    },
  });
  return JadwalMatkul;
};
