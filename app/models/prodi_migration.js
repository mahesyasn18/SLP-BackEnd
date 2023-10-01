const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    const Prodi = sequelize.define("prodi", {
      id_prodi: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nama_prodi: {
        type: DataTypes.STRING
      },
    });
    
    return Prodi;
};