let Todos = require("./models/todo");
let bcrypt = require("bcrypt");

//function to create an item in db
async function createTodo(data, res) {
  console.log(data.password);
  // hash password
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(data.password, salt);
  Todos.create({
    username: data.username,
    password: hashedPassword,
    email: data.email,
  })
    .then((todo) => {
      res
        .status(201)
        .send(`${todo.username}'s account has been succesfully created.`);
    })
    .catch((err) => {
      res
        .status(400)
        .send(err.message + ": looks like you have an account with us");
    });
}

//query database
function queryTodos() {
  Todos.findAll()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("couldn't get query result for all todos");
    });
}
// query database by 1 parameter
function queryTodo(data) {
  Todos.findOne({ where: data })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("Error, couldn't find item in database");
    });
}

// delete db record
function deleteTodo(data) {
  Todos.destroy({ where: data })
    .then(() => {
      console.log("Record was deleted");
    })
    .catch((err) => {
      console.log("Unsuccessful deletion of item");
    });
}

module.exports.deleteTodo = deleteTodo;
module.exports.queryTodo = queryTodo;
module.exports.queryTodos = queryTodos;
module.exports.createTodo = createTodo;
