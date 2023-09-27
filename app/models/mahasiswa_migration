const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
    const Mahasiswa = sequelize.define("admin", {
      nim: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nama: {
        type: DataTypes.STRING
      },
      kelas:{
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
      }
    });
  
    return Mahasiswa;
  };