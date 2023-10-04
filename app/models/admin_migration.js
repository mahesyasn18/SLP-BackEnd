const { DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admin", {
    nama: {
      type: DataTypes.STRING
    },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 16);
        this.setDataValue('password', hashedPassword);
      }
    }
  });

  return Admin;
};