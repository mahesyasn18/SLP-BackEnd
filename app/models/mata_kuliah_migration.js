module.exports = (sequelize, Sequelize) => {
  const MataKuliah = sequelize.define("mataKuliah", {
    id_matakuliah: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    nama_matakuliah: {
      type: Sequelize.STRING,
    },
  });

  return MataKuliah;
};
