const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Dosen = sequelize.define("dosen", {
    kode_dosen: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    nama_dosen: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
  });

  return Dosen;
};
