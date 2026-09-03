// Shared helpers for the Talent listing + position detail pages.
// Deadlines are dates like "2026-09-11" and always mean end-of-day East Africa Time (UTC+3).

const TALENT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function talentDeadlineMs(dateStr) {
    return new Date(`${dateStr}T23:59:59+03:00`).getTime();
}

function talentIsExpired(dateStr) {
    return Date.now() > talentDeadlineMs(dateStr);
}

function talentDaysLeft(dateStr) {
    return Math.ceil((talentDeadlineMs(dateStr) - Date.now()) / 86400000);
}

function talentFormatDate(dateStr) {
    const [y, m, d] = dateStr.split("-").map(Number);
    return `${d} ${TALENT_MONTHS[m - 1]} ${y}`;
}

async function talentFetchPositions() {
    const response = await fetch("/talent/positions.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Failed to load positions");
    const data = await response.json();
    return Array.isArray(data.positions) ? data.positions : [];
}

function talentOpenPositionsSorted(positions) {
    return positions
        .filter((p) => !talentIsExpired(p.deadline))
        .sort((a, b) => talentDeadlineMs(a.deadline) - talentDeadlineMs(b.deadline));
}

function talentSlugFromLocation() {
    const params = new URLSearchParams(window.location.search);
    if (params.get("slug")) return params.get("slug");
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts.length >= 2 && parts[0] === "talent") return decodeURIComponent(parts[1]);
    return null;
}

function talentEscapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
}
