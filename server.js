const express = require('express');
const app = express();
let port = 3010 || process.env.PORT;
const http = require('http').Server(app);
let Sequelize = require('./sqlite');
let Todos = require('./models/todo');
let query = require('./querydb');
let routerPath = require('./routes/auth');
let dotenv = require('dotenv');
let UserTodo = require('./sqlite_todo').UserTodo;
let filterPath = require('./routes/filter');

dotenv.config();

//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors({ exposedHeaders: 'auth-token' }));

app.use("/api", routerPath);
//set query functions

// app.use("/api/todos/filter", filterPath);

Sequelize.sequelize.sync().then( async () => {
    await UserTodo.sync();
    console.log("TODO table successfully created!")
}).catch((err) => {
    console.log("unable to connect to db", err.message)
});
// connection to db
Sequelize.sequelize.authenticate().then(() => {
    console.log("successful connection to sqlite..")
}).catch((err) => {
    console.log(err.message);
});

// listen for port connections
let server = http.listen(port);
server.on("listening", () => {
    console.log("listening on port %d", parseInt(port));
});
server.on("error", (err) => {
    console.log(err.message);
})