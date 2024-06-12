const mongodb = require("mongodb");
const db = require("../data/database");

class Todo {
  constructor(text, id) {
    this.text = text;
    this.id = id;
  }

  static async getAllTodo() {
    const todos = await db.getDb().collection("todos").find().toArray();
    return todos.map((todo) => {
      return new Todo(todo.text, todo._id);
    });
  }

  save() {
    if (!this.id) {
      return db.getDb().collection("todos").insertOne({ text: this.text });
    } else {
      const objectId = new mongodb.ObjectId(this.id);
      return db
        .getDb()
        .collection("todos")
        .updateOne(
          { _id: objectId },
          {
            $set: {
              text: this.text,
            },
          }
        );
    }
  }

  delete() {
    if (!this.id) {
      console.log("error happend no items with this id exists");
    } else {
      const objectId = new mongodb.ObjectId(this.id);
      return db.getDb().collection("todos").deleteOne({ _id: objectId });
    }
  }
}

module.exports = Todo;
