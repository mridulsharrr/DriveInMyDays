/* ===============================
   SCOREPULSE LEADERBOARD SCRIPT
   =============================== */

/* ---------- SAMPLE DATA (replace later with Google Sheets) ---------- */
const players = [
    { name: "Vortex", course: "Game Design", year: "3rd", score: 10134 },
    { name: "N1ghtmare", course: "Animation", year: "2nd", score: 9532 },
    { name: "Shadow", course: "Fine Arts", year: "1st", score: 9054 },
    { name: "Pixel", course: "Animation", year: "1st", score: 8400 }
];

/* ---------- DOM ELEMENTS ---------- */
const leaderboard = document.getElementById("leaderboard");
const searchInput = document.getElementById("searchInput");
const courseFilter = document.getElementById("courseFilter");
const yearFilter = document.getElementById("yearFilter");
const lastUpdated = document.getElementById("lastUpdated");

/* ---------- MEDAL ICONS ---------- */
function getMedal(index) {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return "";
}

/* ---------- RENDER LEADERBOARD ---------- */
function renderLeaderboard(animate = false) {
    // Always clear previous rows (CRITICAL FIX)
    leaderboard.innerHTML = "";

    // Apply search & filters
    let filteredPlayers = players.filter(player => {
        const matchesSearch =
            player.name.toLowerCase().includes(searchInput.value.toLowerCase());

        const matchesCourse =
            courseFilter.value === "" || player.course === courseFilter.value;

        const matchesYear =
            yearFilter.value === "" || player.year === yearFilter.value;

        return matchesSearch && matchesCourse && matchesYear;
    });

    // Sort by score (descending)
    filteredPlayers.sort((a, b) => b.score - a.score);

    // Render rows
    filteredPlayers.forEach((player, index) => {
        const row = document.createElement("div");
        row.className = "leaderboard-row";

        // Top 3 styles
        if (index === 0) row.classList.add("gold");
        if (index === 1) row.classList.add("silver");
        if (index === 2) row.classList.add("bronze");

        row.innerHTML = `
            <span class="rank">#${index + 1} ${getMedal(index)}</span>
            <span class="player">${player.name}</span>
            <span class="course">${player.course}</span>
            <span class="year">${player.year}</span>
            <span class="score">${player.score}</span>
        `;

        // Animate only on first load / manual refresh
        if (animate) {
            row.style.animation = "rowReveal 0.45s ease forwards";
            row.style.animationDelay = `${0.2 + index * 0.08}s`;
        }

        leaderboard.appendChild(row);
    });

    // Update timestamp
    lastUpdated.textContent =
        "Last updated: " + new Date().toLocaleTimeString();
}

/* ---------- FILTER EVENTS ---------- */
searchInput.addEventListener("input", () => renderLeaderboard());
courseFilter.addEventListener("change", () => renderLeaderboard());
yearFilter.addEventListener("change", () => renderLeaderboard());

/* ---------- LIVE SCORE SIMULATION ---------- */
function simulateScoreUpdates() {
    players.forEach(player => {
        player.score += Math.floor(Math.random() * 60);
    });
}

/* ---------- AUTO REFRESH (LIVE FEEL) ---------- */
setInterval(() => {
    simulateScoreUpdates();
    renderLeaderboard();
}, 10000);

/* ---------- INITIAL PAGE LOAD ---------- */
window.addEventListener("load", () => {
    renderLeaderboard(true);
});
/* ---------- LIVE BLINKING TAB BADGE ---------- */

const baseTitle = "driveInMyDays";
let liveVisible = true;

setInterval(() => {
    document.title = liveVisible
        ? "🔴 LIVE | " + baseTitle
        : baseTitle;

    liveVisible = !liveVisible;
}, 1000);
