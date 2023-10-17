const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const detailMatkul = sequelize.define("detailMatkul", {
    id_detailMatkul: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipe: {
      type: DataTypes.STRING,
    },
    sks: {
      type: DataTypes.INTEGER,
    },
  });
  return detailMatkul;
};
