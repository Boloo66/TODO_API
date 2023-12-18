let Todo = require("../models/todo");
let validateTodo = require("../validate").validateTodo;

module.exports.CreateTodo = async function (userid, todo, status, req, res) {
  let data = { userid, todo, status };
  // res.json(data);
  let { error } = validateTodo(data);
  if (error) return res.status(401).send(error.details[0].message);

  try {
    Todo.create({ userid, todo, status })
      .then((todo) => {
        return res.send(todo);
      })
      .catch((err) => {
        console.error(err)
        return res.send(`${err}: ` + "can't create a todo item");
      });
  } catch (err) {
    console.log("CREATION FAILED");
    return res.status(400).send(err);
  }
};

module.exports.updateTodo = async function (
  id,
  userid,
  todo,
  status,
  req,
  res
) {
  const payload = { todo, status };
  let data = { userid, todo, status };
  let { error } = validateTodo(data);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    await Todo.update(payload, { where: { id, userid, } })

    const updated = await Todo.findByPk(id)

    return res.json(updated)
  } catch (err) {
    return res.send(`${err}: Could not update item`);
  }
};

module.exports.deleteTodo = async function (id, userid, res) {
  try {
    await Todo.destroy({
      where: {
        id: id,
        userid: userid,
      },
    })
      .then(() => res.send("delection successful..."))
      .catch((err) => res.send("deletion failed.."));
  } catch (err) {
    res.send(`${err}: Could not delete item`);
  }
};
