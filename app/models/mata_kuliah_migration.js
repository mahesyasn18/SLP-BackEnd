const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const MataKuliah = sequelize.define("mataKuliah", {
    id_matakuliah: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama_matakuliah: {
      type: DataTypes.STRING,
    },
    semester_matakuliah: {
      type: DataTypes.INTEGER,
    },
  });

  return MataKuliah;
};
