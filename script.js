const input = document.querySelector("input");
const addBtn = document.querySelector("button");
const inputContainer = document.querySelector(".input-container");
const noteContainer = document.querySelector(".note-container");
const resetBtn = document.getElementById("reset");
const sort = document.querySelector("#sort");
let notes = [];
let isInputVisible = true;

addBtn.addEventListener("click", () => {
  if (isInputVisible) {
    if (input.value !== "") {
      notes.push(input.value);
      addNote(notes);
      input.value = "";
      isInputVisible = false;
      inputContainer.style.display = "none";
    } else {
      alert("Please fill the input!");
    }
  } else {
    inputContainer.style.display = "flex";
    isInputVisible = true;
  }
});

function addNote(arr) {
  noteContainer.innerHTML = "";
  let startIndex = 0;
  arr.forEach((element, index) => {
    startIndex++;
    let noteDiv = document.createElement("div");
    noteDiv.classList.add("note");
    let note = document.createElement("p");
    note.textContent = `${startIndex}) ${element}`;
    let removeBtn = document.createElement("i");
    removeBtn.classList.add("ri-close-line");
    noteDiv.append(note, removeBtn);
    noteContainer.append(noteDiv);
    removeBtn.addEventListener("click", () => {
      notes = notes.filter((value, elementIndex) => elementIndex !== index);
      addNote(notes);
      if (notes.length === 0) {
        noteContainer.style.borderColor = "transparent";
        inputContainer.style.display = "flex";
      }
    });
  });
  noteContainer.style.borderColor = "#c4c4c4";
}

resetBtn.addEventListener("click", () => {
  input.value = "";
});

let isSorted = false;
sort.addEventListener("click", () => {
  if (notes.length) {
    if (!isSorted) {
      notes.sort((a, b) => (a > b ? -1 : 1));
      isSorted = true;
      sort.style.transform = "rotate(180deg)";
    } else {
      notes.sort((a, b) => (a > b ? 1 : -1));
      sort.style.transform = "rotate(0deg)";
      isSorted = false;
    }
    addNote(notes);
  } else {
    alert("There is no any note!");
  }
});
