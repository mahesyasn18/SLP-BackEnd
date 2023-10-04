const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const Mahasiswa = sequelize.define("mahasiswa", {
    nim: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 16);
        this.setDataValue("password", hashedPassword);
      },
    },
    no_telp: {
      type: DataTypes.STRING,
    },
    no_telp_orang_tua: {
      type: DataTypes.STRING,
    },
  });

  return Mahasiswa;
};
