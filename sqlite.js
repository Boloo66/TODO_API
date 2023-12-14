const { Sequelize, DataTypes, Op, literal } = require("sequelize");
const { join } = require("path");

console.log(join(__dirname, "./app.db"))

const AppDB = new Sequelize("app", "root", "root", {
  dialect: "sqlite",
  storage: join(__dirname, "./app.db"),
  host: "localhost",
});

// module.exports.sequelize = AppDB;
module.exports.DataTypes = DataTypes;
module.exports.AppDB = AppDB;
module.exports.DataTypes = DataTypes;
module.exports.Op = Op;
module.exports.literal = literal;
