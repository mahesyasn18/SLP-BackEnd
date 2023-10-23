const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const DetailPerizinan = sequelize.define("detailPerizinan", {
    id_perizinan: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    jumlah_jam: {
      type: Sequelize.INTEGER,
    },
  });

  return DetailPerizinan;
};
