const Sequelize = require("../sqlite_todo");

let DataTypes = Sequelize.DataTypes;
let sequelize = Sequelize.UserTodo;

const Todo = sequelize.define("todos_tb", {
     userid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false
     },
    todo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull:false       
    }
});

module.exports = Todo;