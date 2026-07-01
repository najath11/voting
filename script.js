/* ═══════════════════════════════════════
   ELIGO - School Parliament Election 2026-27
   A.M.U.P.S VALLUVAMBRAM
   Voting Application Logic
   ═══════════════════════════════════════ */

// ─── Candidate Data ───────────────────
const candidates = [
    { id: 1, name: "ARDRA. K", class: "7.A", symbol: "🌳", symbolName: "Tree", color: "#43A047", colorLight: "#81C784" },
    { id: 2, name: "SAYEED YOOSUF.P", class: "7.A", symbol: "💻", symbolName: "Laptop", color: "#1E88E5", colorLight: "#64B5F6" },
    { id: 3,  name: "FATHIMA JAZA K",        class: "7.B", symbol: '<svg viewBox="0 0 64 64" width="48" height="48" style="display:block"><rect x="6" y="18" width="52" height="6" rx="2.5" fill="#A1887F"/><rect x="6" y="22" width="52" height="2" rx="1" fill="#8D6E63" opacity="0.5"/><rect x="10" y="24" width="5" height="24" rx="2" fill="#8D6E63"/><rect x="49" y="24" width="5" height="24" rx="2" fill="#8D6E63"/><rect x="26" y="24" width="5" height="18" rx="2" fill="#795548"/><rect x="38" y="24" width="5" height="18" rx="2" fill="#795548" opacity="0.7"/></svg>', symbolName: "Table",       color: "#8D6E63", colorLight: "#BCAAA4" },
    { id: 4, name: "AMEEQ AHAN M", class: "7.B", symbol: "🚲", symbolName: "Bicycle", color: "#FB8C00", colorLight: "#FFB74D" },
    { id: 5, name: "ADHENA. E", class: "7.C", symbol: "✒️", symbolName: "Pen", color: "#546E7A", colorLight: "#90A4AE" },
    { id: 6, name: "MUHAMMED RAZIN K", class: "7.C", symbol: "🏏", symbolName: "Cricket Bat", color: "#7CB342", colorLight: "#AED581" },
    { id: 7, name: "SHAHANA SHERIN KP", class: "7.D", symbol: "👟", symbolName: "Shoe", color: "#8E24AA", colorLight: "#BA68C8" },
    { id: 8, name: "RINSHAD. N", class: "7.D", symbol: "📖", symbolName: "Book", color: "#00ACC1", colorLight: "#4DD0E1" },
    { id: 9, name: "SNIGDHA P", class: "7.E", symbol: "📱", symbolName: "Mobile", color: "#5C6BC0", colorLight: "#9FA8DA" },
    { id: 10, name: "SHADIN MUHAMMED.U", class: "7.E", symbol: "☂️", symbolName: "Umbrella", color: "#E53935", colorLight: "#EF9A9A" },
    { id: 11, name: "NAFEESATHUL MISRIYA", class: "7.F", symbol: "🪑", symbolName: "Chair", color: "#FF6F00", colorLight: "#FFCA28" },
    { id: 12, name: "ADYAN V.K", class: "7.F", symbol: "🏸", symbolName: "Racket", color: "#00897B", colorLight: "#80CBC4" },
    { id: 13, name: "FATHIMA NIYA. C", class: "7.G", symbol: "🎒", symbolName: "Backpack", color: "#D81B60", colorLight: "#F48FB1" },
    { id: 14, name: "SANABUL IHSAN. MT", class: "7.G", symbol: "🕐", symbolName: "Clock", color: "#7E57C2", colorLight: "#B39DDB" },
];

// ─── State ────────────────────────────
let selectedCandidate = null;
const ADMIN_PASSWORD = "admin123";
const STORAGE_KEY = "eligo_votes_2026";

// ─── Initialize ───────────────────────
document.addEventListener("DOMContentLoaded", () => {
    createParticles();
    renderCandidates();
    updateVoteCounter();
});

// ─── Screen Management ────────────────
function showScreen(screenId) {
    // Remove active from all screens
    document.querySelectorAll(".screen").forEach((s) => {
        s.classList.remove("active");
    });

    // Activate target screen
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add("active");

        // Stagger animation for candidate cards
        if (screenId === "voting-screen") {
            const cards = target.querySelectorAll(".candidate-card");
            cards.forEach((card, i) => {
                card.style.animationDelay = `${i * 0.04}s`;
                card.classList.add("stagger-animate");
            });
        }
    }
}

// ─── Particles Effect ─────────────────
function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;

    const count = window.innerWidth < 768 ? 20 : 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";

        const size = Math.random() * 4 + 1.5;
        particle.style.left = Math.random() * 100 + "%";
        particle.style.width = size + "px";
        particle.style.height = size + "px";
        particle.style.animationDuration = Math.random() * 18 + 12 + "s";
        particle.style.animationDelay = Math.random() * 15 + "s";

        container.appendChild(particle);
    }
}

// ─── Render Candidate Cards ──────────
function renderCandidates() {
    const grid = document.getElementById("candidates-grid");
    if (!grid) return;

    grid.innerHTML = "";

    candidates.forEach((c) => {
        const card = document.createElement("div");
        card.className = "candidate-card";
        card.id = `candidate-${c.id}`;
        card.style.setProperty("--card-color", c.color);
        card.style.setProperty("--card-glow", c.color + "30");
        card.style.setProperty("--card-color-faint", c.color + "10");
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", `Vote for ${c.name}, Class ${c.class}, Symbol: ${c.symbolName}`);

        card.onclick = () => selectCandidate(c);
        card.onkeydown = (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectCandidate(c);
            }
        };

        card.innerHTML = `
            <div class="candidate-number">${c.id}</div>
            <div class="card-content">
                <div class="symbol-box">${c.symbol}</div>
                <div class="info-container">
                    <div class="symbol-label">${c.symbolName}</div>
                    <div class="candidate-name">${c.name}</div>
                </div>
            </div>
        `;

        grid.appendChild(card);
    });
}

// ─── Select Candidate ────────────────
function selectCandidate(candidate) {
    selectedCandidate = candidate;

    const details = document.getElementById("selected-candidate-details");
    if (details) {
        details.innerHTML = `
            <div class="modal-candidate-info">
                <div class="modal-symbol">${candidate.symbol}</div>
                <div class="modal-name">${candidate.name}</div>
                <div class="modal-class">Class ${candidate.class} · ${candidate.symbolName}</div>
            </div>
            <p class="modal-warning">Please confirm your choice. This action cannot be undone.</p>
        `;
    }

    const modal = document.getElementById("confirm-modal");
    if (modal) {
        modal.classList.add("active");
    }
}

// ─── Close Modal ─────────────────────
function closeModal() {
    const modal = document.getElementById("confirm-modal");
    if (modal) {
        modal.classList.remove("active");
    }
    selectedCandidate = null;
}

// ─── Confirm Vote ────────────────────
function confirmVote() {
    if (!selectedCandidate) return;

    // Save vote to localStorage
    const votes = getVotes();
    votes[selectedCandidate.id] = (votes[selectedCandidate.id] || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));

    // Update the total counter
    updateVoteCounter();

    // Close modal
    const modal = document.getElementById("confirm-modal");
    if (modal) modal.classList.remove("active");

    // Show thank you screen
    showScreen("thankyou-screen");

    // Launch confetti celebration
    createConfetti();

    // Reset selected
    selectedCandidate = null;
}

// ─── Votes Storage ───────────────────
function getVotes() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    } catch {
        return {};
    }
}

function getTotalVotes() {
    const votes = getVotes();
    return Object.values(votes).reduce((sum, v) => sum + v, 0);
}

// ─── Update Vote Counter ─────────────
function updateVoteCounter() {
    const total = getTotalVotes();
    const counter = document.getElementById("total-votes");
    if (counter) {
        // Animate the counter
        animateCounter(counter, parseInt(counter.textContent) || 0, total, 500);
    }
}

function animateCounter(element, from, to, duration) {
    const start = performance.now();
    const diff = to - from;

    function step(timestamp) {
        const progress = Math.min((timestamp - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        element.textContent = Math.round(from + diff * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// ─── Reset for Next Voter ────────────
function resetForNextVoter() {
    selectedCandidate = null;
    showScreen("welcome-screen");
    updateVoteCounter();
}

// ─── Admin Access ────────────────────
function showAdminLogin() {
    const password = prompt("🔐 Enter admin password:");
    if (password === ADMIN_PASSWORD) {
        showResults();
    } else if (password !== null) {
        alert("❌ Incorrect password. Access denied.");
    }
}

// ─── Show Results ────────────────────
function showResults() {
    showScreen("results-screen");
    // Delay render slightly for screen transition
    setTimeout(() => renderResults(), 100);
}

// ─── Render Results ──────────────────
function renderResults() {
    const container = document.getElementById("results-list");
    if (!container) return;

    const votes = getVotes();
    const totalVotes = getTotalVotes();
    const maxVotes = Math.max(...candidates.map((c) => votes[c.id] || 0), 1);

    // Sort candidates by votes (descending), then by ID for ties
    const sorted = [...candidates].sort((a, b) => {
        const diff = (votes[b.id] || 0) - (votes[a.id] || 0);
        return diff !== 0 ? diff : a.id - b.id;
    });

    container.innerHTML = "";

    sorted.forEach((c, index) => {
        const voteCount = votes[c.id] || 0;
        const percentage =
            totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(1) : "0.0";
        const barWidth = maxVotes > 0 ? (voteCount / maxVotes) * 100 : 0;

        const item = document.createElement("div");
        item.className = "result-item";
        item.style.animationDelay = `${index * 0.06}s`;

        item.innerHTML = `
            <div class="result-info">
                <div class="result-rank">${index + 1}</div>
                <div class="result-symbol">${c.symbol}</div>
                <div class="result-name">
                    ${c.name}
                    <span class="result-class-tag">${c.class}</span>
                </div>
                <div class="result-votes">${voteCount} vote${voteCount !== 1 ? "s" : ""} (${percentage}%)</div>
            </div>
            <div class="result-bar-bg">
                <div class="result-bar-fill" style="--bar-color: ${c.color}; --bar-color-light: ${c.colorLight};" data-width="${barWidth}"></div>
            </div>
        `;

        container.appendChild(item);
    });

    // Update total votes display
    const totalEl = document.getElementById("results-total");
    if (totalEl) totalEl.textContent = totalVotes;

    // Animate bars after a small delay
    requestAnimationFrame(() => {
        setTimeout(() => {
            document.querySelectorAll(".result-bar-fill").forEach((bar) => {
                const width = bar.getAttribute("data-width");
                bar.style.width = width + "%";
            });
        }, 200);
    });
}

// ─── Reset Votes ─────────────────────
function resetVotes() {
    const confirmed = confirm(
        "⚠️ Are you sure you want to RESET ALL VOTES?\n\nThis action cannot be undone!"
    );
    if (confirmed) {
        localStorage.removeItem(STORAGE_KEY);
        renderResults();
        updateVoteCounter();
    }
}

// ─── Confetti Celebration ─────────────
function createConfetti() {
    const colors = [
        "#FFD700", "#FF6B6B", "#48DBFB", "#FF9FF3",
        "#54A0FF", "#5F27CD", "#01A3A4", "#F368E0",
        "#00E676", "#FFAB40", "#FF5252", "#69F0AE",
    ];

    const container = document.body;
    const pieces = window.innerWidth < 768 ? 50 : 100;

    for (let i = 0; i < pieces; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti-piece";

        const isCircle = Math.random() > 0.5;
        const size = Math.random() * 10 + 5;

        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.style.width = size + "px";
        confetti.style.height = isCircle ? size + "px" : size * 0.4 + "px";
        confetti.style.borderRadius = isCircle ? "50%" : "2px";
        confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
        confetti.style.animationDelay = Math.random() * 0.8 + "s";

        container.appendChild(confetti);

        // Clean up after animation
        setTimeout(() => {
            if (confetti.parentNode) confetti.remove();
        }, 5000);
    }
}

// ─── Modal Backdrop Click ─────────────
document.addEventListener("click", (e) => {
    if (e.target.id === "confirm-modal") {
        closeModal();
    }
});

// ─── Keyboard Accessibility ──────────
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});
