const { DataTypes } = require("sequelize");
module.exports = (sequelize, Sequelize) => {
  const Perizinan = sequelize.define("perizinan", {
    id_perizinan: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    surat: {
      type: DataTypes.TEXT,
    },
    jenis: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    keterangan: {
      type: DataTypes.TEXT,
    },
    tanggal_awal: {
      type: DataTypes.DATEONLY,
    },
    tanggal_akhir: {
      type: DataTypes.DATEONLY,
    },
    keterangan_dosen: {
      type: DataTypes.STRING,
    },
  });
  return Perizinan;
};
