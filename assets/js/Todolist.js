// @use JSDoc

/**
 * @description To do list
 * @param { object } listTodo
 */

export function Todolist() {
  this.registerElements();
  this.listTodo = [];
  this.taskExists = null;
  this.task = {
    id: Date.now(),
    name: this.elements.inputTask.value,
    isDone: false,
  };
  this.addTask();
  this.renderTodo();
  this.delTasksDone();
  this.delAllTasks();
  this.done_notDone();
  this.searchList();
  this.reset();
}

Todolist.prototype.reset = function () {
  this.elements.error.innerHTML = "";
  this.elements.inputTask.value = "";
};

Todolist.prototype.registerElements = function () {
  this.elements = {
    todoForm: document.querySelector(".todo-form"),
    inputTask: document.querySelector(".todo-form__add"),
    addBtn: document.querySelector(".todo-form__add-btn"),
    delDoneBtn: document.querySelector(".todo-form__done-btn"),
    delAllBtn: document.querySelector(".todo-form__del-btn"),
    todoTasks: document.querySelector(".todo-tasks"),
    error: document.querySelector(".error"),
    searchBar: document.getElementById("search"),
  };
};

Todolist.prototype.renderTodo = function (id, name = "", done) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  const span = document.createElement("span");
  li.classList.add("item");
  this.elements.todoTasks.appendChild(li);
  this.elements.todoTasks.insertAdjacentElement("afterbegin", li);
  li.appendChild(span);
  span.innerText = name;
  li.setAttribute("draggable", true);

  input.classList.add("item__checkbox");
  input.type = "checkbox";
  li.appendChild(input);
  li.insertAdjacentElement("afterbegin", input);
  const addcheckbox = document.querySelector(".item__checkbox");

  li.setAttribute("data-id", id);
  const delBtn = document.createElement("i");
  delBtn.classList.add("fa", "fa-trash-alt", "trash");
  li.appendChild(delBtn);

  input.toggleAttribute("checked", done);
  addcheckbox.closest(".item").classList.toggle("active", done);
};

Todolist.prototype.addTask = function (e) {
  // e.preventDefault();
  if (this.elements.inputTask.value === "") {
    this.elements.error.innerHTML = "Please add some task!";
    this.elements.error.setAttribute("aria-label", "Please add some task!");
    return;
  }
  // Check if task exists in list
  if (listTodo) {
    taskExists = listTodo.filter(
      (task) => task.name === this.elements.inputTask.value
    );
  }

  if (taskExists !== undefined && taskExists.length > 0) {
    error.innerHTML = `<span>${inputTask.value}</span> task already exists!`;
    error.setAttribute("aria-label", `${inputTask.value} task already exists!`);
    this.elements.inputTask.value = "";
    return;
  } else {
    const isEmpty = listTodo !== null ? listTodo.push(task) : null;

    localStorage.setItem("allTasks", JSON.stringify(listTodo));
    listTodo = JSON.parse(localStorage.getItem("allTasks"));

    reset();
    renderTodo(task.id, task.name, task.isDone);
    done_notDone();
  }
};

Todolist.prototype.delTasksDone = function (e) {
  // e.preventDefault();
  const listItem = document.querySelectorAll("li");
  const checkbox = document.querySelectorAll(".item__checkbox");
  checkbox.forEach((elem) => {
    const isChecked = !elem.checked
      ? (error.innerHTML = "PLease select a task!") &&
        error.setAttribute("aria-label", "PLease select a task!")
      : null;
  });
  listItem.forEach((item) => {
    if (item.classList.contains("active")) {
      let id = item.getAttribute("data-id");
      const isToDelete = (element) => element.id === Number(id);
      const indexToDel = this.listTodo.findIndex(isToDelete);
      this.listTodo.splice(indexToDel, 1);
      localStorage.setItem("allTasks", JSON.stringify(this.listTodo));

      item.remove();
      this.reset();
      if (this.listTodo === null || this.listTodo.length === 0) {
        this.reset();
        this.elements.error.innerHTML = "All tasks have been deleted!";
        this.elements.error.setAttribute(
          "aria-label",
          "All tasks have been deleted!"
        );
      }
    }
  });
};

Todolist.prototype.delAllTasks = function (e) {
  // e.preventDefault();
  if (this.listTodo !== null) {
    this.listTodo = [];
    localStorage.setItem("allTasks", JSON.stringify(this.listTodo));
    this.elements.todoTasks.innerHTML = "";
    this.elements.error.innerHTML = "All tasks have been deleted!";
    this.elements.error.setAttribute(
      "aria-label",
      "All tasks have been deleted!"
    );
  }
};

Todolist.prototype.done_notDone = function () {
  const checkbox = document.querySelectorAll(".item__checkbox");
  this.listTodo = JSON.parse(localStorage.getItem("allTasks"));
  checkbox.forEach((elem) => {
    elem.addEventListener("change", (e) => {
      let idDone = Number(e.target.parentNode.getAttribute("data-id"));
      let taskIdDone = document.querySelector("[data-id='" + idDone + "']");

      let indexChecked = listTodo.findIndex(
        (indexTask) => indexTask.id === idDone
      );

      listTodo[indexChecked].isDone = !listTodo[indexChecked].isDone;
      localStorage.setItem("allTasks", JSON.stringify(listTodo));

      taskIdDone.firstChild.toggleAttribute("checked");
      taskIdDone.closest(".item").classList.toggle("active");
      // on change event bubles that's why using stopImmediatePropagation
      e.stopImmediatePropagation();
    });
  });
};

Todolist.prototype.searchList = function (e) {
  // e.preventDefault();
  const li = Array.from(this.elements.todoTasks.children);
  li.map((item) => {
    const isVisible = item.innerText
      .toLowerCase()
      .includes(searchBar.value.toLowerCase());
    item.classList.toggle("hide", !isVisible);
    reset();
  });
};

function debounced(delay, fn) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
}
// const filterList = debounced(300, searchList);

Todolist.prototype.events = function () {
  this.elements.searchBar.addEventListener("input", this.filterList);
  this.elements.todoTasks.addEventListener("click", this.deleteTask);
  this.elements.delDoneBtn.addEventListener("click", this.delTasksDone);
  this.elements.delAllBtn.addEventListener("click", this.delAllTasks);
  this.elements.todoForm.addEventListener("submit", this.addTask);
};

/*********************
 *
 */
