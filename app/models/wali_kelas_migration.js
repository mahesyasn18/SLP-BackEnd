const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const WaliKelas = sequelize.define("waliKelas", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  });

  return WaliKelas;
};
