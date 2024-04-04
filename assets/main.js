const checkbox = document.getElementById("checkbox");

checkbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});
const addItemInput = document.getElementById("addItem");
const todoList = document.getElementById("todoList");
const itemCount = document.getElementById("itemCount");

document.addEventListener("DOMContentLoaded", function () {
  updateItemCount();
});

addItemInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    const newItemText = addItemInput.value.trim();

    if (newItemText !== "") {
      const newItem = document.createElement("li");
      newItem.classList.add("flex-row");
      newItem.innerHTML = `
          <label class="list-item">
              <input type="checkbox" name="todoItem">
              <span class="checkmark"></span>
              <span class="text">${newItemText}</span>
          </label>
          <span class="remove"></span>
      `;

      todoList.appendChild(newItem);
      updateItemCount();
      addItemInput.value = "";
    }
  }
});

todoList.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
    const listItem = event.target.closest("li");

    listItem.remove();

    updateItemCount();
  }
});

todoList.addEventListener("change", function (event) {
  if (event.target.type === "checkbox") {
    updateItemCount();
  }
});

function updateItemCount() {
  const uncheckedItems = todoList.querySelectorAll(
    'input[type="checkbox"]:not(:checked)'
  ).length;
  itemCount.textContent = `${uncheckedItems}`;
}

document.addEventListener("DOMContentLoaded", function () {
  const addItemInput = document.getElementById("addItem");
  const todoList = document.getElementById("todoList");
  const itemCount = document.getElementById("itemCount");
  const filters = document.querySelectorAll('input[name="filter"]');
  const clearCompletedBtn = document.querySelector(".clear");

  updateItemCount();

  clearCompletedBtn.addEventListener("click", function () {
    const completedItems = todoList.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    completedItems.forEach(function (item) {
      const listItem = item.closest("li");
      listItem.remove();
    });
    updateItemCount();
  });

  filters.forEach(function (filter) {
    filter.addEventListener("change", function () {
      applyFilter(filter.id);
    });
  });

  function updateItemCount() {
    const uncheckedItems = todoList.querySelectorAll(
      'input[type="checkbox"]:not(:checked)'
    ).length;
    itemCount.textContent = uncheckedItems;
  }

  function applyFilter(filterType) {
    const items = todoList.querySelectorAll("li");
    items.forEach(function (item) {
      switch (filterType) {
        case "active":
          item.style.display = item.querySelector(
            'input[type="checkbox"]:checked'
          )
            ? "none"
            : "flex";
          break;
        case "completed":
          item.style.display = item.querySelector(
            'input[type="checkbox"]:checked'
          )
            ? "flex"
            : "none";
          break;
        default:
          item.style.display = "flex";
          break;
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const todoList = document.getElementById("todoList");
  const itemCount = document.getElementById("itemCount");
  let draggedItem = null;

  updateItemCount();

  const listItems = todoList.querySelectorAll("li");
  listItems.forEach((item) => {
    item.addEventListener("dragstart", dragStart);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);
  });

  function dragStart() {
    draggedItem = this;
    setTimeout(() => (this.style.display = "none"), 0);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
  }

  function dragLeave() {
    this.classList.remove("over");
  }

  function dragDrop() {
    const droppedItem = this;
    this.classList.remove("over");
    todoList.insertBefore(draggedItem, droppedItem);
    draggedItem.style.display = "flex";
    updateItemCount();
  }

  function updateItemCount() {
    const uncheckedItems = todoList.querySelectorAll(
      'input[type="checkbox"]:not(:checked)'
    ).length;
    itemCount.textContent = uncheckedItems;
  }
});
