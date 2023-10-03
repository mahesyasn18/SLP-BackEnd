const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const DosenWali = sequelize.define("dosenWali", {
    id_dosenwali: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
  });

  return DosenWali;
};
