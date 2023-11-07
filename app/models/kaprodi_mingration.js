const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  const Kaprodi = sequelize.define("kaprodi", {
    id_kaprodi: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        const hashedPassword = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hashedPassword);
      },
    },
  });

  return Kaprodi;
};
