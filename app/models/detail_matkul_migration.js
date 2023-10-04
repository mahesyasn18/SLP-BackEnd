const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const detailMatkul = sequelize.define("detailMatkul", {
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
  return detailMatkul;
};
