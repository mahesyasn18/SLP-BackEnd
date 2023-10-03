const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Dosen = sequelize.define("dosen", {
    kode_dosen: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    nama_dosen: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      set(value){
          const hashedPassword = bcrypt.hashSync(value, 16);
          this.setDataValue('password', hashedPassword);
      }
    },
    email:{
      type: DataTypes.STRING
    }
  });
  
  return Dosen;
};