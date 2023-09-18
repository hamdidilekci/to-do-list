import express from "express";

import TodoService from "../services/todo.service.js";

import handleError from "../middleware/handle-error.js";
import parseSort from "../common/parse-sort.js";
import parseFilter from "../common/parse-filter.js";

const router = express.Router();

// create a todo item
router.post("/", async (req, res) => {
  try {
    const todo = await TodoService.create(req.user, req.body);
    res.send(todo);
  } catch (error) {
    handleError(error, req, res);
  }
});

// get todo items with filtering and sorting
router.get("/", async (req, res) => {
  try {
    const filter = parseFilter(req.query.filter);
    const sort = parseSort(req.query.sort);

    const todos = await TodoService.find(req.user, sort, filter);
    res.send(todos);
  } catch (error) {
    handleError(error, req, res);
  }
});

// update a todo item
router.post("/:todoId", async (req, res) => {
  try {
    const todo = await TodoService.update(
      req.user,
      req.params.todoId,
      req.body
    );
    res.send(todo);
  } catch (error) {
    handleError(error, req, res);
  }
});

// delete a todo item
router.delete("/:todoId", async (req, res) => {
  try {
    const response = await TodoService.delete(req.user, req.params.todoId);
    res.send(response);
  } catch (error) {
    handleError(error, req, res);
  }
});

export default router;
