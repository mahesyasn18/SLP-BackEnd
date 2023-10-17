const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const WaliKelas = sequelize.define("waliKelas", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });

  return WaliKelas;
};
