const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Store = sequelize.define("Store", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(400),
    allowNull: false
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

module.exports = Store;
