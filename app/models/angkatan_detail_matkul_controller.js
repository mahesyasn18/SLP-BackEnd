const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const AngkatanMatkul = sequelize.define("angkatan_detail_matkul", {
    angkatanMatkul_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  });

  return AngkatanMatkul;
};
