module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define("semester", {
    id_semester: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    nama_semester: {
      type: Sequelize.STRING,
    },
  });

  return Semester;
};