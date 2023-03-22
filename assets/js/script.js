"use-strict";

const todoForm = document.querySelector(".todo-form");
const addBtn = document.querySelector(".todo-form__add-button");
const deleteBtn = document.querySelector(".item__delete-button");
const checkbox = document.querySelector(".item__checkbox");
const inputField = document.querySelector(".todo-form__input");
const todoItems = document.querySelector(".todo-items");
const item = document.querySelector(".item")

const addTasks = () => {
  const newTask= inputField.value;
  const itemToAdd =  "<li class='item' data-key='1594003133171'><input class='item__checkbox' type='checkbox' />" + newTask + "<button class='item__delete-button'>X</button></li>";
  console.log("First Task");
  todoItems.innerHTML += itemToAdd;
};

addBtn.addEventListener("click", addTasks);
