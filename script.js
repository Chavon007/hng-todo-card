const title = document.getElementById("todoTitle");
const checkBox = document.getElementById("todoComplete");
const dateDue = document.getElementById("todoDueDate");
const timeRemaining = document.getElementById("todoTimeRemaining");
const todostatus = document.getElementById("todoStatus");
const edit = document.getElementById("editBtn");
const priority = document.getElementById("todoPriority");
const deleteBtn = document.getElementById("deleteBtn");
const editModal = document.getElementById("editSection");
const cancelEdit = document.getElementById("cancelEditBtn");
const saveEdit = document.getElementById("saveEditBtn");
const titleEdit = document.getElementById("editTitle");
const descriptionEdit = document.getElementById("editDescription");
const priorityEdit = document.getElementById("editPriority");
const dueDateEDit = document.getElementById("editDueDate");
const description = document.getElementById("todoDescription");
const expandTog = document.getElementById("expandToggle");
let dueDate = new Date("2026-04-16T18:00:00Z");

checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    title.classList.add("completed");
    todostatus.value = "Done";
  } else {
    title.classList.remove("completed");
    todostatus.value = "Pending";
  }
});

expandTog.addEventListener("click", () => {
  const isExpanded = expandTog.getAttribute("aria-expanded") === "true";

  expandTog.setAttribute("aria-expanded", !isExpanded);
  expandTog.textContent = isExpanded ? "Show more" : "Show less";
});

todostatus.addEventListener("change", () => {
  if (todostatus.value === "Done") {
    checkBox.checked = true;
  } else {
    checkBox.checked = false;
  }
});

edit.addEventListener("click", () => {
  console.log("Edit button clicked");
  editModal.hidden = false;
  titleEdit.value = title.textContent;
  descriptionEdit.value = description.textContent;
  priorityEdit.value = priority.textContent;
});

saveEdit.addEventListener("click", (e) => {
  e.preventDefault();
  title.textContent = titleEdit.value;
  description.textContent = descriptionEdit.value;
  priority.textContent = priorityEdit.value;
  dueDate.textContent = dueDateEDit.value;
  dueDate = new Date(dueDateEDit.value);

  editModal.hidden = true;
});

cancelEdit.addEventListener("click", () => {
  editModal.hidden = true;
});

const updateTime = () => {
  const now = new Date();
  const diff = dueDate - now;

  if (diff <= 0) {
    timeRemaining.textContent = "Overdue";
    return;
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) {
    timeRemaining.textContent = `Due in ${days} day(s)`;
  } else if (hours > 0) {
    timeRemaining.textContent = `Due in ${hours} hour(s)`;
  } else {
    timeRemaining.textContent = "Due now";
  }
};

updateTime();

setInterval(updateTime, 6000);

deleteBtn.addEventListener("click", () => {
  alert("Delete button clicked");
});
