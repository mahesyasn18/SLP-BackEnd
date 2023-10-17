module.exports = (sequelize, Sequelize) => {
  const DetailPerizinan = sequelize.define("detailPerizinan", {
    jumlah_jam: {
      type: Sequelize.INTEGER,
    },
  });

  return DetailPerizinan;
};
