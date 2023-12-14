const { Sequelize, DataTypes, Op, literal } = require('sequelize');

let UserTodo = new Sequelize('TODO.db', 'root', 'root', {
    storage:'./models/TODOs.db',
    dialect: 'sqlite',
    host: 'localhost'
});

module.exports.UserTodo = UserTodo;
module.exports.DataTypes = DataTypes;
module.exports.Op = Op;
module.exports.literal = literal;