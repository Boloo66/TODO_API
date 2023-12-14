const Sequelize = require("../sqlite");

let DataTypes = Sequelize.DataTypes;
let sequelize = Sequelize.sequelize;

const User = sequelize.define("users_tb", {
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    }
})



module.exports = User;