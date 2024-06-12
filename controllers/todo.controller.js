const Todo = require("../models/todo.models");

async function getAllTodos(req, res, next) {
  const todos = await Todo.getAllTodo();
  res.json({ todos: todos });
}

async function addTodo(req, res, next) {
  const userTextInput = req.body.text;
  const todo = new Todo(userTextInput);
  const result = await todo.save();
  const insertedId = result.insertedId;
  todo.id = insertedId.toString();
  res.json({ message: "Todo added Successfully!!", todo: todo });
}
async function updateTodo(req, res, next) {
  const todoId = req.params.id;
  const newText = req.body.text;

  const todo = new Todo(newText, todoId);
  const result = await todo.save();
  res.json({ message: "todo Edited successfuly", todo: todo });
}

async function deleteTodo(req, res, next) {
  const todoId = req.params.id;
  const todo = new Todo(null, todoId);
  const result = todo.delete();
  res.json({ message: "todo delted Successfully", todo: result });
}

module.exports = {
  getAllTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};
