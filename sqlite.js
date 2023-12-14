const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('./models/TODO.db', 'root', 'root', {
    dialect:"sqlite",
    storage:"./models/USERS.db",
    host: "localhost"
});

module.exports.sequelize = sequelize;
module.exports.DataTypes = DataTypes;