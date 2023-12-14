const express = require("express");
let dotenv = require("dotenv");
const http = require("http");
const { AppDB } = require("./sqlite");
let routerPath = require("./routes/auth");
let User = require("./models/user");
let Todo = require("./models/todo");
// let query = require("./querydb");
// let filterPath = require("./routes/filter");

dotenv.config();
let port = process.env.PORT || 3010;

const app = express();
//middle ware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cors({ exposedHeaders: 'auth-token' }));

app.use("/api", routerPath);
//set query functions

// app.use("/api/todos/filter", filterPath);

async function main() {
  try {
    await AppDB.authenticate();
    await AppDB.sync();

    await User.sync();
    await Todo.sync();

    const server = http.createServer(app);
    server.listen(port);
    server.on("listening", () => {
      console.log("listening on port %d", parseInt(port));
    });

    server.on("error", (err) => {
      console.log(err.message);
    });
  } catch (error) {
    console.error("Error starting application", error);
  }
}

main();
