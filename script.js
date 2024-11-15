const input = document.querySelector("input");
const addButton = document.querySelector("button");
const inputArea = document.querySelector(".input-area");
const taskDisplay = document.querySelector(".task-display");
const clearButton = document.getElementById("clear-btn");
const sortBtn = document.querySelector("#sort-btn");
let tasks = [];
let isInputActive = true;

addButton.addEventListener("click", () => {
  if (isInputActive) {
    if (input.value !== "") {
      tasks.push(input.value);
      renderTasks(tasks);
      input.value = "";
      isInputActive = false;
      inputArea.style.display = "none";
    } else {
      alert("Please fill the input!");
    }
  } else {
    inputArea.style.display = "flex";
    isInputActive = true;
  }
});

function renderTasks(arr) {
  taskDisplay.innerHTML = "";
  let startIndex = 0;
  arr.forEach((item, index) => {
    startIndex++;
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    let task = document.createElement("p");
    task.textContent = `${startIndex}) ${item}`;
    let deleteBtn = document.createElement("i");
    deleteBtn.classList.add("ri-close-line");
    taskDiv.append(task, deleteBtn);
    taskDisplay.append(taskDiv);
    deleteBtn.addEventListener("click", () => {
      tasks = tasks.filter((_, itemIndex) => itemIndex !== index);
      renderTasks(tasks);
      if (tasks.length === 0) {
        taskDisplay.style.borderColor = "transparent";
        inputArea.style.display = "flex";
      }
    });
  });
  taskDisplay.style.borderColor = "#c4c4c4";
}

clearButton.addEventListener("click", () => {
  input.value = "";
});

let isOrdered = false;
sortBtn.addEventListener("click", () => {
  if (tasks.length) {
    if (!isOrdered) {
      tasks.sort((a, b) => (a > b ? -1 : 1));
      isOrdered = true;
      sortBtn.style.transform = "rotate(180deg)";
    } else {
      tasks.sort((a, b) => (a > b ? 1 : -1));
      sortBtn.style.transform = "rotate(0deg)";
      isOrdered = false;
    }
    renderTasks(tasks);
  }
});
