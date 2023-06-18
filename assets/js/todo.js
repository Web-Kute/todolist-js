const todoForm = document.querySelector(".todo-form");
const addBtn = document.querySelector(".todo-form__add-button");
const deleteBtn = document.querySelectorAll(".item__delete-button");
const delDoneBtn = document.querySelector(".todo-form__done-button");
const delAllBtn = document.querySelector(".todo-form__del-button");
const alertUser = document.querySelector(".alert");
const inputTask = document.querySelector(".todo-form__input");
const search = document.querySelector(".todo-form__search");
const todoTasks = document.querySelector(".todo-tasks");
const error = document.querySelector(".error");

// On app load, get all tasks from localStorage
loadTasks();
let tasks = [];
let taskExist;

// On form submit add task
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
});

function createItemList(name = "", id) {
  const li = document.createElement("li");
  const input = document.createElement("input");
  li.classList.add("item");
  todoTasks.appendChild(li);
  todoTasks.insertAdjacentElement("afterbegin", li);
  li.innerText = name;

  input.classList.add("item__checkbox");
  input.type = "checkbox";
  li.appendChild(input);
  li.insertAdjacentElement("afterbegin", input);
  checkbox = document.querySelectorAll(".item__checkbox");

  li.setAttribute("data-id", id);
  const delBtn = document.createElement("i");
  delBtn.classList.add("fa", "fa-trash-alt", "trash");
  li.appendChild(delBtn);
}

function loadTasks() {
  // check if localStorage has any tasks if not then return
  if (localStorage.getItem("tasks") === null) return;

  // Get the tasks from localStorage and convert it to an array
  JSON.parse(localStorage.getItem("tasks"));

  // Loop through the tasks and add them to the list
  JSON.parse(localStorage.getItem("tasks")).map((task) => {
    createItemList(task.name, task.id);
  });
}

function addTask() {
  // return if task is empty
  if (inputTask.value === "") {
    alertUser.innerHTML = "Please add some task!";
    return;
  }
  // Check is task already exist
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    const sameTask = (element) => element.name === inputTask.value;
    taskExist = tasks.some(sameTask);
    if (taskExist) {
      return (alertUser.innerHTML = "task already exist!");
    }
  }

  // add task to local storage
  localStorage.setItem(
    "tasks",
    JSON.stringify([
      ...JSON.parse(localStorage.getItem("tasks") || "[]"),
      { name: inputTask.value, id: Date.now(), isDone: false },
    ])
  );

  if (!taskExist) {
    alertUser.innerHTML = "";
    createItemList(inputTask.value, Date.now());
  }
  // clear input
  inputTask.value = "";
  done_notdone();
}

// Events delegation to parent because of createElement (dynamically)
const deleteTask = (e) => {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (e.target && e.target.nodeName === "I") {
    const itemToDelete = Number(e.target.parentNode.getAttribute("data-id"));
    const isToDelete = (element) => element.id === itemToDelete;
    const selectedDelIndex = tasks.findIndex(isToDelete);
    tasks.splice(selectedDelIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    e.target.parentNode.remove();
  }
};

const delTasksDone = (e) => {
  e.preventDefault();
  let indexTask;
  let elementList;
  tasks = JSON.parse(localStorage.getItem("tasks"));
  // if (tasks[i].isDone === true) {
  // }

  let taskIsDone = tasks.filter((item) => {
    return item.isDone === true;
  });
  taskIsDone.map((done) => {
    elementList = document.querySelector("[data-id='" + done.id + "']");
    elementList.remove();
    indexTask = tasks.findIndex((element) => element.isDone === true);
    console.log(done.name, done.id, indexTask);
    tasks.splice(indexTask, 1);
    return localStorage.setItem("tasks", JSON.stringify(tasks));
  });
};

const delAllTasks = (e) => {
  e.preventDefault();
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks !== null) {
    localStorage.clear();
    todoTasks.innerHTML = "";
    alertUser.innerHTML = "All tasks have been deleted!";
  }
};

todoTasks.addEventListener("click", deleteTask);
delAllBtn.addEventListener("click", delAllTasks);
delDoneBtn.addEventListener("click", delTasksDone);

// if task is done or not
const done_notdone = () => {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  const checkbox = document.querySelectorAll(".item__checkbox");
  let itemDid;
  let isDid;
  let elementList;
  let indexChecked;

  if (checkbox) {
    // on load, display tasks already done
    if (tasks !== null) {
      tasks.map((item) => {
        if (item.isDone === true) {
          elementList = document.querySelector("[data-id='" + item.id + "']");
          elementList.classList.add("active");
          elementList.firstChild.setAttribute("checked", "checked");
        }
      });
    }

    checkbox.forEach((elem) => {
      elem.addEventListener("change", (e) => {
        if (elem.checked) {
          itemDid = Number(e.target.parentNode.getAttribute("data-id"));
          elementList = document.querySelector("[data-id='" + itemDid + "']");
          isDid = (elemChecked) => elemChecked.id === itemDid;
          indexChecked = tasks.findIndex(isDid);
          console.log("Checked", indexChecked);
          tasks[indexChecked].isDone = true;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          elementList.firstChild.setAttribute("checked", "checked");
          elementList.closest(".item").classList.add("active");
        }

        if (!elem.checked) {
          itemDid = Number(e.target.parentNode.getAttribute("data-id"));
          elementList = document.querySelector("[data-id='" + itemDid + "']");
          isDid = (elemChecked) => elemChecked.id === itemDid;
          indexChecked = tasks.findIndex(isDid);
          tasks[indexChecked].isDone = false;
          console.log("unChecked: ", indexChecked);
          localStorage.setItem("tasks", JSON.stringify(tasks));
          elementList.firstChild.removeAttribute("checked");
          elementList.closest(".item").classList.remove("active");
        }
      });
    });
  }
};

done_notdone();

const searchTask = () => {
  //   if input value === task.name
  //   display these tasks
  //   check all characters
  document.querySelector("form").addEventListener("change", (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    alertUser.innerHTML = e.target.value;
    const searchFilter = (element) => element.name === search.value;
  });
};

searchTask();
