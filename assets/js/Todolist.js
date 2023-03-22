// @use JSDoc

/**
 * @description To do list
 * @param { object } todo
 */

export function Todolist() {
  this.fullName = null;
  this.lastName = null;
}

Todolist.prototype.registerElements = function () {
  this.elements = {
    todoForm: document.querySelector(".todo-form"),
    addBtn: document.querySelector(".todo-form__add-button"),
    deleteBtn: document.querySelector(".item__delete-button"),
    checkbox: document.querySelector(".item__checkbox"),
    inputField: document.querySelector(".todo-form__input"),
    todoItems: document.querySelector(".todo-items"),
    item: document.querySelector(".item"),
  };
};

Todolist.prototype.addTodo = function () {};

Todolist.prototype.deleteTask = function () {};

Todolist.prototype.events = function () {
  console.log("Start to go");
};
