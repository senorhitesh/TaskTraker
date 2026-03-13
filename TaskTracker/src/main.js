const navbar = document.getElementById("navbar");
const glow = document.getElementById("navbar-glow");

navbar.addEventListener("mousemove", (e) => {
  const rect = navbar.getBoundingClientRect();
  glow.style.left = e.clientX - rect.left + "px";
  glow.style.top = e.clientY - rect.top + "px";
  glow.style.opacity = "1";
});

navbar.addEventListener("mouseleave", () => {
  glow.style.opacity = "0";
});

const rowsContainer = document.getElementById("rows-container");
const daysHeader = document.getElementById("days-header");
const addBtn = document.getElementById("add-btn");

// Get selected month/year from navbar
function getSelectedMonthYear() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthEl = document.getElementById("month");
  const yearEl = document.getElementById("year");
  const month = monthEl ? monthEl.selectedIndex : new Date().getMonth();
  const year = yearEl ? parseInt(yearEl.value) : new Date().getFullYear();
  return { month, year };
}

function getDaysInMonth(month, year) {
  return new Date(year, month + 1, 0).getDate();
}

// Build day number headers
function buildHeader() {
  const { month, year } = getSelectedMonthYear();
  const days = getDaysInMonth(month, year);
  const today = new Date();
  daysHeader.innerHTML = "";
  for (let d = 1; d <= days; d++) {
    const el = document.createElement("div");
    el.className = "day-label";
    el.textContent = d;
    const isToday =
      today.getDate() === d &&
      today.getMonth() === month &&
      today.getFullYear() === year;
    if (isToday) el.classList.add("today");
    daysHeader.appendChild(el);
  }
}

// Storage key per month/year
function storageKey(taskId, month, year) {
  return `tt_${taskId}_${year}_${month}`;
}

// Build a single task row
function buildRow(taskId, taskName = "") {
  const { month, year } = getSelectedMonthYear();
  const days = getDaysInMonth(month, year);
  const today = new Date();

  const row = document.createElement("div");
  row.className = "task-row";
  row.dataset.taskId = taskId;

  // Task name input
  const nameInput = document.createElement("input");
  nameInput.className = "task-name";
  nameInput.type = "text";
  nameInput.placeholder = "Task name...";
  nameInput.value = taskName;
  nameInput.addEventListener("input", () => {
    localStorage.setItem(`tt_name_${taskId}`, nameInput.value);
  });

  // Dots
  const dotsContainer = document.createElement("div");
  dotsContainer.className = "dots-container";

  // Load saved state
  const saved = JSON.parse(
    localStorage.getItem(storageKey(taskId, month, year)) || "{}",
  );

  for (let d = 1; d <= days; d++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (saved[d]) dot.classList.add("done");

    const isToday =
      today.getDate() === d &&
      today.getMonth() === month &&
      today.getFullYear() === year;
    if (isToday) dot.classList.add("today-col");

    dot.addEventListener("click", () => {
      dot.classList.toggle("done");
      const state = JSON.parse(
        localStorage.getItem(storageKey(taskId, month, year)) || "{}",
      );
      if (dot.classList.contains("done")) state[d] = true;
      else delete state[d];
      localStorage.setItem(
        storageKey(taskId, month, year),
        JSON.stringify(state),
      );
    });

    dotsContainer.appendChild(dot);
  }

  // Delete button
  const del = document.createElement("button");
  del.className = "delete-row";
  del.textContent = "×";
  del.addEventListener("click", () => {
    row.remove();
    const ids = getTaskIds().filter((id) => id !== taskId);
    localStorage.setItem("tt_task_ids", JSON.stringify(ids));
    localStorage.removeItem(`tt_name_${taskId}`);
  });

  row.appendChild(nameInput);
  row.appendChild(dotsContainer);
  row.appendChild(del);
  return row;
}
function getTaskIds() {
  return JSON.parse(localStorage.getItem("tt_task_ids") || "[]");
}
// Add new task
addBtn.addEventListener("click", () => {
  const taskId = Date.now().toString();
  const ids = getTaskIds();
  ids.push(taskId);
  localStorage.setItem("tt_task_ids", JSON.stringify(ids));
  rowsContainer.appendChild(buildRow(taskId));
});

// Refresh grid when month/year changes
function refreshGrid() {
  buildHeader();
  rowsContainer.innerHTML = "";
  const ids = getTaskIds();
  ids.forEach((id) => {
    const name = localStorage.getItem(`tt_name_${id}`) || "";
    rowsContainer.appendChild(buildRow(id, name));
  });
}

// Hook navbar selects
document.getElementById("month").addEventListener("change", refreshGrid);
document.getElementById("year").addEventListener("change", refreshGrid);

// Init
refreshGrid();
