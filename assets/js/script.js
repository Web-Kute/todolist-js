document.addEventListener("DOMContentLoaded", () => {
  const todoForm = document.querySelector(".todo-form");
  const inputTask = document.querySelector(".todo-form__add");
  const addBtn = document.querySelector(".todo-form__add-btn");
  const delDoneBtn = document.querySelector(".todo-form__done-btn");
  const delAllBtn = document.querySelector(".todo-form__del-btn");
  const todoTasks = document.querySelector(".todo-tasks");
  const error = document.querySelector(".error");
  const searchBar = document.getElementById("search");

  let listTodo = [];
  let taskExists;

  function reset() {
    error.innerHTML = "";
    inputTask.value = "";
  }

  // Create HTML list
  function renderTodo(id, name = "", done) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const span = document.createElement("span");
    li.classList.add("item");
    todoTasks.appendChild(li);
    todoTasks.insertAdjacentElement("afterbegin", li);
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
  }

  // Add Task to list
  function addTask() {
    if (inputTask.value === "") {
      error.innerHTML = "Please add some task!";
      error.setAttribute("aria-label", "Please add some task!");
      return;
    }
    // Check if task exists in list
    if (listTodo) {
      taskExists = listTodo.filter((task) => task.name === inputTask.value);
    }

    if (taskExists !== undefined && taskExists.length > 0) {
      error.innerHTML = `<span>${inputTask.value}</span> task already exists!`;
      error.setAttribute(
        "aria-label",
        `${inputTask.value} task already exists!`
      );
      inputTask.value = "";
      return;
    } else {
      const task = {
        id: Date.now(),
        name: inputTask.value,
        isDone: false,
      };

      const isEmpty = listTodo !== null ? listTodo.push(task) : null;

      localStorage.setItem("allTasks", JSON.stringify(listTodo));
      listTodo = JSON.parse(localStorage.getItem("allTasks"));

      reset();
      renderTodo(task.id, task.name, task.isDone);
      done_notDone();
    }
  }

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask();
  });

  // Events delegation to parent because of createElement (dynamically)
  function deleteTask(e) {
    if (e.target && e.target.nodeName === "I") {
      const taskToDelete = Number(e.target.parentNode.getAttribute("data-id"));
      const isToDelete = (element) => element.id === taskToDelete;
      const selectIndexToDelete = listTodo.findIndex(isToDelete);
      listTodo.splice(selectIndexToDelete, 1);
      localStorage.setItem("allTasks", JSON.stringify(listTodo));

      e.target.parentNode.remove();
    }
  }

  function delTasksDone(e) {
    e.preventDefault();
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
        const indexToDel = listTodo.findIndex(isToDelete);
        listTodo.splice(indexToDel, 1);
        localStorage.setItem("allTasks", JSON.stringify(listTodo));

        item.remove();
        reset();
        if (listTodo === null || listTodo.length === 0) {
          reset();
          error.innerHTML = "All tasks have been deleted!";
          error.setAttribute("aria-label", "All tasks have been deleted!");
        }
      }
    });
  }

  function delAllTasks(e) {
    e.preventDefault();
    if (listTodo !== null) {
      listTodo = [];
      localStorage.setItem("allTasks", JSON.stringify(listTodo));
      todoTasks.innerHTML = "";
      error.innerHTML = "All tasks have been deleted!";
      error.setAttribute("aria-label", "All tasks have been deleted!");
    }
  }

  function done_notDone() {
    const checkbox = document.querySelectorAll(".item__checkbox");
    listTodo = JSON.parse(localStorage.getItem("allTasks"));
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
  }

  if (localStorage.getItem("allTasks") !== null && searchBar.value === "") {
    JSON.parse(localStorage.getItem("allTasks")).map((task) => {
      renderTodo(task.id, task.name, task.isDone);
    });
  }

  done_notDone();

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

  function searchList(e) {
    e.preventDefault();
    const li = Array.from(todoTasks.children);
    li.map((item) => {
      const isVisible = item.innerText
        .toLowerCase()
        .includes(searchBar.value.toLowerCase());
      item.classList.toggle("hide", !isVisible);
      reset();
    });
  }

  const filterList = debounced(300, searchList);

  addBtn.addEventListener("click", addTask);
  searchBar.addEventListener("input", filterList);
  todoTasks.addEventListener("click", deleteTask);
  delDoneBtn.addEventListener("click", delTasksDone);
  delAllBtn.addEventListener("click", delAllTasks);
});
