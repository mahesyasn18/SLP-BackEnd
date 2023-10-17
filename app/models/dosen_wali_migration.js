const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const DosenWali = sequelize.define("dosenWali", {
    id_dosenwali: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
  });

  return DosenWali;
};
