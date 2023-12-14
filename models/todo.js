const { AppDB, DataTypes } = require("../sqlite");

const Todo = AppDB.define("todo", {
  userid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    references: {
      model: "users",
      key: "id",
    },
  },
  todo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    // "not_started", "in_progress", "completed"
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Todo;
