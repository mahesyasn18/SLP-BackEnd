module.exports = (sequelize, Sequelize) => {
  const DetailPerizinan = sequelize.define("detailPerizinan", {
    id_detailPerizinan: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    jumlah_jam: {
      type: Sequelize.INTEGER,
    },
  });

  return DetailPerizinan;
};
