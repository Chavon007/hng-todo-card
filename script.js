const title = document.getElementById("todoTitle");
const checkBox = document.getElementById("todoComplete");
const timeRemaining = document.getElementById("todoTimeRemaining");
const todostatus = document.getElementById("todoStatus");
const edit = document.getElementById("editBtn");
const deleteBtn = document.getElementById("deleteBtn");

const dueDate = new Date("2026-04-16T18:00:00Z");

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

checkBox.addEventListener("change", () => {
  if (checkBox.checked) {
    title.classList.add("completed");
    todostatus.textContent = "Done";
    todostatus.classList.add("Done");
  } else {
    title.classList.remove("completed");
    todostatus.textContent = "Pending...";
    todostatus.classList.remove("Done");
  }
});

edit.addEventListener("click", () => {
  console.log("Edit button clicked");
});
deleteBtn.addEventListener("click", () => {
  alert("Delete button clicked");
});
