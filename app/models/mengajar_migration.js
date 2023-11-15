const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Mengajar = sequelize.define("mengajar", {
    mengajar_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  });

  return Mengajar;
};
