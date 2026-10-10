import * as assert from "node:assert";
import { test } from "node:test";
import { TodoItemModel } from "../../src/model/TodoItemModel.js";

test("isEmptyTitle", () => {
  const todoItem = new TodoItemModel({
    title: "",
    completed: false,
  });
  assert.strictEqual(todoItem.isEmptyTitle(), true);
});

test("isNotEmptyTitle", () => {
  const todoItem = new TodoItemModel({
    title: "title",
    completed: false,
  });
  assert.strictEqual(todoItem.isEmptyTitle(), false);
});

test("isIncrementIndex", () => {
  const todoItem = new TodoItemModel({
    title: "title",
    completed: false,
  });
  const todoItem2 = new TodoItemModel({
    title: "title2",
    completed: false,
  });
  assert.strictEqual(todoItem.id + 1, todoItem2.id);
});
