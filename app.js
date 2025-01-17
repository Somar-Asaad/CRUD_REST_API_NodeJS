const express = require("express");

const db = require("./data/database");
const todoRouter = require("./routers/todo.router");

const app = express();

app.use(express.json());
app.use("/todos", todoRouter);

app.use(function (error, req, res, next) {
  res.status(500).json({
    message: "Something went wrong!",
  });
});

db.initDb()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Connecting to the database failed!");
  });
