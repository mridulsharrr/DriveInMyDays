let players = [];
let isAdmin = false;

const bodyEl = document.getElementById("leaderboardBody");
const lastUpdated = document.getElementById("lastUpdated");

const addBtn = document.getElementById("addBtn");
const modal = document.getElementById("playerModal");

const searchInput = document.getElementById("searchInput");
const deptFilter = document.getElementById("departmentFilter");

// Render leaderboard
function render() {
  bodyEl.innerHTML = "";

  let filtered = players
    .filter(p =>
      p.name.toLowerCase().includes(searchInput.value.toLowerCase()) &&
      (deptFilter.value === "" || p.department === deptFilter.value)
    )
    .sort((a, b) => b.score - a.score);

  filtered.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "row";

    if (i === 0) row.classList.add("gold");
    if (i === 1) row.classList.add("silver");
    if (i === 2) row.classList.add("bronze");

    row.innerHTML = `
      <span>#${i + 1}</span>
      <span>${p.name}</span>
      <span>${p.department}</span>
      <span>${p.year}</span>
      <span>${p.score}</span>
    `;

    bodyEl.appendChild(row);
  });

  lastUpdated.textContent =
    "Last updated: " + new Date().toLocaleTimeString();
}

// CTRL + A → Admin toggle
document.addEventListener("keydown", e => {
  if (e.ctrlKey && e.key.toLowerCase() === "a") {
    e.preventDefault();
    isAdmin = !isAdmin;
    addBtn.classList.toggle("hidden", !isAdmin);
    modal.classList.add("hidden");
  }
});

addBtn.onclick = () => modal.classList.remove("hidden");
document.getElementById("cancelBtn").onclick = () => modal.classList.add("hidden");

// Save entry
document.getElementById("saveBtn").onclick = () => {
  const name = nameInput.value.trim();
  const department = deptInput.value;
  const year = yearInput.value;
  const score = Number(scoreInput.value);

  if (!name || !department || !year || isNaN(score)) return;

  players.push({ name, department, year, score });

  modal.classList.add("hidden");
  render();
};

searchInput.oninput = render;
deptFilter.onchange = render;
