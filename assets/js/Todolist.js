// @use JSDoc

/**
 * @description To do list
 * @param { object } todo
 */

export function Todolist() {
  let todos = [];
}

Todolist.prototype.registerElements = function () {


  this.elements = {
    todoForm: document.querySelector(".todo-form"),
    addBtn: document.querySelector(".todo-form__add-button"),
    deleteBtn: document.querySelector(".item__delete-button"),
    checkbox: document.querySelector(".item__checkbox"),
    inputField: document.querySelector(".todo-form__input"),
    todoItems: document.querySelector(".todo-items"),
    item: document.querySelector(".item")
  };

  
};

Todolist.prototype.addTask = function (item) {};

Todolist.prototype.deleteTask = function () {};

Todolist.prototype.renderTodos = function () {};

Todolist.prototype.events = function () {};

/*********************
 * 
 */
const todoForm = document.querySelector(".todo-form");
const addBtn = document.querySelector(".todo-form__add-button");
const deleteBtn = document.querySelectorAll(".item__delete-button");
const checkbox = document.querySelector(".item__checkbox");

const item = document.querySelector(".item");
const alertUser = document.querySelector(".alert");

const inputTask = document.querySelector(".todo-form__input");
const todoTasks = document.querySelector(".todo-tasks");

let todoTasksList = [];

class TodoList {
  constructor(item) {
    this.ulElement = item;
  }

  add() {
    let taskValue = document.querySelector(".todo-form__input").value;
    if (taskValue === "") {
      alertUser.innerHTML = "Please fill task input";
    } else {
      const task = {
        id: todoTasksList.length,
        name: taskValue,
        isDone: false,
      };

      alertUser.innerHTML = "";
      todoTasksList.unshift(task);
      this.display();
      console.log(taskValue, todoTasksList);
      inputTask.value = "";
    }
  }

  done_undone(x) {
    const selectedTodoIndex = todoTasksList.findIndex((item) => item.id === x);
    console.log(item, todoTasksList);
    // todoTasksList[selectedTodoIndex].isDone == false
    //   ? (todoTasksList[selectedTodoIndex].isDone = true)
    //   : (todoTasksList[selectedTodoIndex].isDone = false);
    // this.display();
  }

  deleteItem(delme) {
    const selectedDelIndex = todoTasksList.findIndex(
      (item) => item.id === delme
    );

    todoTasksList.splice(selectedDelIndex, 1);

    this.display();
  }

  display() {
    this.ulElement = "";
    todoTasksList.forEach((task_item) => {
      const li = document.createElement("li");
      const delBtn = document.createElement("i");
      li.innerText = task_item.name;
      li.setAttribute("data-id", task_item.id);

      delBtn.classList.add("fa", "fa-trash-alt");
      delBtn.setAttribute("data-id", task_item.id);

      li.appendChild(delBtn);

      delBtn.addEventListener("click", function (e) {
        const deleteId = e.target.getAttribute("data-id");
        myTodoList.deleteItem(deleteId);
      });
      li.addEventListener("click", function (e) {
        const selectedId = e.target.getAttribute("data-id");
        myTodoList.done_undone(selectedId);
      });

      if (task_item.isDone) {
        li.classList.add("checked");
      }
      this.ulElement.appendChild(li);
    });
  }
}

myTodoList = new TodoList(todoTasks);

// addBtn.addEventListener("click", myTodoList.add);
document
  .querySelector(".todo-form__add-button")
  .addEventListener("click", function () {
    myTodoList.add();
  });

  /**
   * 
   */

  const todoObjectList = [];

  class Todo_Class {
    constructor(item) {
      this.ulElement = item;
    }

    add() {
      const todoInput = document.querySelector("#myInput").value;
      if (todoInput == "") {
        alert("You did not enter any item!");
      } else {
        const todoObject = {
          id: todoObjectList.length,
          todoText: todoInput,
          isDone: false,
        };

        todoObjectList.unshift(todoObject);
        this.display();
        document.querySelector("#myInput").value = "";
      }
    }

    done_undone(x) {
      const selectedTodoIndex = todoObjectList.findIndex(
        (item) => item.id == x
      );
      console.log(todoObjectList[selectedTodoIndex].isDone);
      todoObjectList[selectedTodoIndex].isDone == false
        ? (todoObjectList[selectedTodoIndex].isDone = true)
        : (todoObjectList[selectedTodoIndex].isDone = false);
      this.display();
    }

    deleteElement(z) {
      const selectedDelIndex = todoObjectList.findIndex((item) => item.id == z);

      todoObjectList.splice(selectedDelIndex, 1);

      this.display();
    }

    display() {
      this.ulElement.innerHTML = "";

      todoObjectList.forEach((object_item) => {
        const liElement = document.createElement("li");
        const delBtn = document.createElement("i");

        liElement.innerText = object_item.todoText;
        liElement.setAttribute("data-id", object_item.id);

        delBtn.setAttribute("data-id", object_item.id);
        delBtn.classList.add("far", "fa-trash-alt");

        liElement.appendChild(delBtn);

        delBtn.addEventListener("click", function (e) {
          const deleteId = e.target.getAttribute("data-id");
          myTodoList.deleteElement(deleteId);
        });

        liElement.addEventListener("click", function (e) {
          const selectedId = e.target.getAttribute("data-id");
          myTodoList.done_undone(selectedId);
        });

        if (object_item.isDone) {
          liElement.classList.add("checked");
        }

        this.ulElement.appendChild(liElement);
      });
    }
  }

  ////-----MAIN PROGRAM------------
  const listSection = document.querySelector("#myUL");

  myTodoList = new Todo_Class(listSection);

  document.querySelector(".addBtn").addEventListener("click", function () {
    myTodoList.add();
  });

  document.querySelector("#myInput").addEventListener("keydown", function (e) {
    if (e.keyCode == 13) {
      myTodoList.add();
    }
  });