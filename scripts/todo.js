"use strict";

//Get elements
const inputTask = document.getElementById("input-task");
const btnAdd = document.getElementById("btn-add");
const todoList = document.getElementById("todo-list");

//load user data from storage
const todoArr = getFromStorage("todoArr") || [];

const currentUser = getFromStorage("currentUser") || [];
const owner = currentUser.username;

//Create class Task
class Task {
  constructor(task, owner, isDone) {
    this.owner = owner;
    this.isDone = isDone;
    this.task = task;
    this.createTask(task);
  }

  createTask(task) {
    //Create html tag to display task
    //Create <li> tag to wrap all elements
    const liElement = document.createElement("li");
    const isCheck = liElement.classList;
    if (this.isDone) isCheck.add("checked");
    todoList.appendChild(liElement);

    //Create <p> tag for task content
    const textEl = document.createElement("p");
    textEl.innerText = task;
    textEl.style.marginBottom = "0px";
    textEl.style.cursor = "pointer";
    liElement.appendChild(textEl);

    //Create <span> tag for delete button
    const closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerText = "×";
    liElement.appendChild(closeBtn);

    //Event click on task tag
    textEl.addEventListener("click", () => {
      let taskIndex;
      const clickedTask = this.convertTaskToObject();
      todoArr.forEach((taskObj, index) => {
        if (JSON.stringify(taskObj) === JSON.stringify(clickedTask))
          taskIndex = index;
      });
      this.toggleTask(isCheck, taskIndex);
    });

    //Event click delete button
    closeBtn.addEventListener("click", () => {
      let taskIndex;
      const clickedTask = this.convertTaskToObject();
      todoArr.forEach((taskObj, index) => {
        if (JSON.stringify(taskObj) === JSON.stringify(clickedTask))
          taskIndex = index;
      });
      this.deleteTask(liElement, taskIndex);
    });
  }

  toggleTask(isCheck, taskIndex) {
    //Update clicked Task Instance
    isCheck.toggle("checked");
    if (isCheck.contains("checked")) this.isDone = true;
    else this.isDone = false;
    //Update local storage
    const updateTask = this.convertTaskToObject();
    todoArr.splice(taskIndex, 1, updateTask);
    saveToStorage("todoArr", todoArr);
  }

  deleteTask(liElement, taskIndex) {
    //delete task from displaying to do list
    todoList.removeChild(liElement);
    //Update local storage
    todoArr.splice(taskIndex, 1);
    saveToStorage("todoArr", todoArr);
  }

  convertTaskToObject() {
    return {
      owner: this.owner,
      isDone: this.isDone,
      task: this.task,
    };
  }
}

//render existing todo list for current user
function rederTodoList(owner) {
  todoArr.forEach((taskData) => {
    if (taskData.owner === owner) {
      const task = taskData.task;
      const isDone = taskData.isDone;
      return new Task(task, owner, isDone);
    }
  });
}
rederTodoList(owner);

//Event click Add button
btnAdd.addEventListener("click", addTask);

//Display new added task
function addTask() {
  if (owner) {
    //Get task from input
    let task = inputTask.value.trim();
    const isDone = false;

    //validate
    if (task === "") alert("Please input task!");
    //create task then add to todoArr
    else {
      const newTask = new Task(task, owner, isDone);
      inputTask.value = "";
      todoArr.push(newTask);
      saveToStorage("todoArr", todoArr);
    }
  } else alert("Please log in!");
}
