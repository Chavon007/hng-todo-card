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
const dueDateEdit = document.getElementById("editDueDate");
const description = document.getElementById("todoDescription");
const expandTog = document.getElementById("expandToggle");
const collapse = document.getElementById("collapsibleSection");
const overdue = document.getElementById("overdueIndicator");

let dueDate = new Date("2026-04-16T23:59:00");
let timeInterval;

//  PRIORITY COLOR
const updatePriorityColor = () => {
  const value = priority.textContent.trim().toLowerCase();
  priority.classList.remove("high", "medium", "low");
  priority.classList.add(value);

  const dot = document.getElementById("priorityIndicator");
  dot.classList.remove("high", "medium", "low");
  dot.classList.add(value);
};

//  UPDATE STATUS COLOR

const updateStatusColor = () => {
  const value = todostatus.value.toLowerCase().replace(" ", "-");
  todostatus.classList.remove("done", "pending", "in-progress");
  todostatus.classList.add(value);
};
// DESCRIPTION LENGTH CHECK
const checkLengthOfDescription = () => {
  const words = description.textContent.trim().split(/\s+/);
  if (words.length <= 20) {
    expandTog.hidden = true;
  } else {
    expandTog.hidden = false;
  }
};

//  TIME REMAINING
const updateTime = () => {
  if (todostatus.value === "Done") {
    clearInterval(timeInterval);
    timeRemaining.textContent = "Completed";
    timeRemaining.classList.remove("overdue");
    overdue.hidden = true;
    return;
  }

  const now = new Date();
  const diff = dueDate - now;

  if (diff <= 0) {
    const overdueMins = Math.floor(Math.abs(diff) / (1000 * 60));
    const overdueHours = Math.floor(overdueMins / 60);
    timeRemaining.textContent =
      overdueHours > 0
        ? `Overdue by ${overdueHours} hour(s)`
        : `Overdue by ${overdueMins} minute(s)`;
    timeRemaining.classList.add("overdue");
    overdue.hidden = false;
    return;
  }

  overdue.hidden = true;
  timeRemaining.classList.remove("overdue");

  const totalMins = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(totalMins / 60);
  const days = Math.floor(hours / 24);
  const mins = totalMins % 60;

  if (days > 0) {
    timeRemaining.textContent = `Due in ${days} day(s)`;
  } else if (hours > 0) {
    timeRemaining.textContent = `Due in ${hours} hour(s)`;
  } else {
    timeRemaining.textContent = `Due in ${mins} minute(s)`;
  }
};

// CHECKBOX
checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    title.classList.add("completed");
    todostatus.value = "Done";
  } else {
    title.classList.remove("completed");
    todostatus.value = "Pending";
    timeInterval = setInterval(updateTime, 30000);
  }
  updateTime();
  updateStatusColor();
});

//  STATUS DROPDOWN
todostatus.addEventListener("change", () => {
  if (todostatus.value === "Done") {
    checkBox.checked = true;
    title.classList.add("completed");
  } else {
    checkBox.checked = false;
    title.classList.remove("completed");
    timeInterval = setInterval(updateTime, 30000);
  }
  updateTime();
  updateStatusColor();
});

//  EXPAND / COLLAPSE
expandTog.addEventListener("click", () => {
  collapse.classList.toggle("expanded");
  const isExpanded = expandTog.getAttribute("aria-expanded") === "true";
  expandTog.setAttribute("aria-expanded", !isExpanded);
  expandTog.textContent = isExpanded ? "Show more" : "Show less";
});

// EDIT
edit.addEventListener("click", () => {
  editModal.hidden = false;
  titleEdit.value = title.textContent.trim();
  descriptionEdit.value = description.textContent.trim();
  priorityEdit.value = priority.textContent.trim();
  dueDateEdit.value = dueDate.toISOString().split("T")[0];
});

// SAVE
saveEdit.addEventListener("click", (e) => {
  e.preventDefault();
  title.textContent = titleEdit.value;
  description.textContent = descriptionEdit.value;
  priority.textContent = priorityEdit.value;

  if (dueDateEdit.value) {
    dueDate = new Date(dueDateEdit.value + "T23:59:00");
  }
  dateDue.textContent = `Due ${dueDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}`;

  updatePriorityColor();
  checkLengthOfDescription();
  updateTime();

  editModal.hidden = true;
  edit.focus();
  console.log(dueDate);
});

// CANCEL
cancelEdit.addEventListener("click", () => {
  editModal.hidden = true;
  edit.focus();
});

// DELETE
deleteBtn.addEventListener("click", () => {
  alert("Delete button clicked");
});

updateTime();
checkLengthOfDescription();
updatePriorityColor();
updateStatusColor();
timeInterval = setInterval(updateTime, 30000);
