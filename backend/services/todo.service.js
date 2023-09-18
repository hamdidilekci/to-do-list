import Todo from "../models/todo.model.js";

import { BadRequestError, NotFoundError } from "../common/errors.js";

export default class TodoService {
  static async create(currentUser, { title, description, priority, category }) {
    if (!title || title === "") {
      throw new BadRequestError(
        "Title path is required when creating a todo item"
      );
    }

    // create new todo item
    const todo = new Todo({
      userId: currentUser._id,
      title,
      description,
      priority,
      category,
    });

    await todo.save();

    return todo;
  }

  static async find(currentUser, sort, filter) {
    // TODO: add filtering from request and combine two filters
    let query = Todo.find({ userId: currentUser._id, ...filter });
    if (sort) {
      query = query.collation({ locale: "en" }).sort(sort);
    }

    return query.exec();
  }

  static async update(currentUser, todoId, data) {
    const filter = { userId: currentUser._id, _id: todoId };

    // check if todo item exists
    if (!Todo.exists(filter)) {
      throw new NotFoundError("Todo item not found");
    }

    // find & update todo item
    const todoItem = await Todo.findOneAndUpdate(filter, data, { new: true });

    return todoItem;
  }

  static async delete(currentUser, todoId) {
    const filter = { userId: currentUser._id, _id: todoId };

    // check if todo item exists
    if (!Todo.exists(filter)) {
      throw new NotFoundError("Todo item not found");
    }

    return Todo.findOneAndDelete(filter);
  }
}
