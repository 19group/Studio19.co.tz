let sidebarHtmlLoaded = false;

// Get root base path dynamically relative to this script
let rootPath = './';
const scripts = document.getElementsByTagName('script');
for (let i = 0; i < scripts.length; i++) {
    const src = scripts[i].getAttribute('src');
    if (src && src.includes('sidebar-controller.js')) {
        rootPath = src.replace('js/sidebar-controller.js', '');
        if (rootPath === '') rootPath = './';
        break;
    }
}
window._sidebarRootPath = rootPath;

// Global summon function
window.summonForm = async function (sourceContext = "Direct Inquiry") {
    // If sidebar logic hasn't been initialized, load it first
    if (!sidebarHtmlLoaded) {
        await loadSidebarHtml();
    }

    // Try to open it if the function exists
    if (typeof window.openSidebar === 'function') {
        window.openSidebar(sourceContext);
    } else {
        console.error("openSidebar function not found. Sidebar logic might not have initialized correctly.");
    }
}

async function loadSidebarHtml() {
    if (sidebarHtmlLoaded) return;

    try {
        // Fallback root path if _sidebarRootPath is not set
        const base = window._sidebarRootPath || './';
        const fetchPath = `${base}inc/sidebar.html`.replace('//', '/');

        const response = await fetch(fetchPath);
        if (!response.ok) throw new Error("Failed to load sidebar HTML");
        const html = await response.text();

        // Inject into body
        const container = document.createElement("div");
        container.id = "sidebar-container";
        container.innerHTML = html;
        document.body.appendChild(container);

        sidebarHtmlLoaded = true;

        // Initialize the logic immediately after injection
        initSidebarLogic();
    } catch (error) {
        console.error("Sidebar loading error:", error);
        // Silently fail if fetch fails instead of alerting unless it's a critical production environment
        // alert("Could not load the contact form. Please try again later.");
    }
}

function initSidebarLogic() {
    // Define utility function for this scope
    const $ = (sel) => document.querySelector(sel);

    const sidebar = $("#sidebar");
    const fName = $("#fName");
    const fEmail = $("#fEmail");
    const fBudget = $("#fBudget");
    const fTimeframe = $("#fTimeframe");
    const fObjective = $("#fObjective");
    const btnSubmit = $("#btnSubmit");

    if (!sidebar) return; // Guard clause

    let toastTimer = null;
    function showToast(text) {
        const toast = $("#toast");
        if (!toast) return;
        $("#toastText").textContent = text;
        toast.classList.remove("hidden");
        if (toastTimer) window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(
            () => toast.classList.add("hidden"),
            3500
        );
    }

    function setBodyScrollLocked(locked) {
        document.body.style.overflow = locked ? "hidden" : "";
    }

    function validateForm() {
        if (!fName.value.trim()) return "Please enter your name.";
        if (!fEmail.value.trim()) return "Please provide email or WhatsApp.";
        if (fObjective.value.trim().length < 5)
            return "Please write a clearer objective.";
        if (!fTimeframe.value) return "Please select your timeframe.";
        return "";
    }

    window.closeSidebar = function () {
        if (sidebar) sidebar.classList.remove("open");
        setBodyScrollLocked(false);
    }

    const closeBtn = $("#closeSidebar");
    if (closeBtn) {
        closeBtn.addEventListener("click", window.closeSidebar);
    }

    window.addEventListener("keydown", (ev) => {
        if (ev.key === "Escape" && sidebar && sidebar.classList.contains("open"))
            window.closeSidebar();
    });

    if (btnSubmit) {
        btnSubmit.addEventListener("click", async () => {
            const err = validateForm();
            if (err) return showToast(err);

            const originalText = btnSubmit.innerHTML;
            btnSubmit.innerHTML = "Submitting...";
            btnSubmit.disabled = true;

            try {
                const sourceContext = window._sidebarSourceContext || 'Direct Inquiry';
                const base = window._sidebarRootPath || './';
                const fetchPath = `${base}inc/submit-intake.php`.replace('//', '/');

                const response = await fetch(fetchPath, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: fName.value,
                        email: fEmail.value,
                        objective: fObjective.value,
                        timeframe: fTimeframe.value,
                        budget: fBudget.value,
                        source: sourceContext
                    }),
                });

                const result = await response.json();
                showToast(result.message);

                if (result.success) {
                    setTimeout(() => {
                        window.closeSidebar();
                        fName.value = "";
                        fEmail.value = "";
                        fObjective.value = "";
                        fTimeframe.value = "";
                        fBudget.value = "";
                    }, 2000);
                }
            } catch (error) {
                showToast("Error connecting to server. Please try again later.");
            } finally {
                btnSubmit.innerHTML = originalText;
                btnSubmit.disabled = false;
            }
        });
    }

    window.openSidebar = function (sourceContext = "") {
        window._sidebarSourceContext = sourceContext || "Direct Inquiry";

        if (sourceContext && fObjective) {
            fObjective.value = `I am interested in discussing your work regarding ${sourceContext}. `;
        }

        sidebar.classList.add("open");
        setBodyScrollLocked(true);
        requestAnimationFrame(() => fName.focus());
    }
}

// Hook up elements with data-avatar on the current page to summon the form
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener("click", (e) => {
        const avatarBtn = e.target.closest("[data-avatar]");
        if (avatarBtn && !avatarBtn.id) {
            const key = avatarBtn.getAttribute("data-avatar") || "";
            let source = "Direct Home Page";
            if (key === "sbc") source = "SBC Campaign Services";
            if (key === "global") source = "Production Logistics";
            if (key === "visibility") source = "Documentary Film Services";

            e.preventDefault();
            window.summonForm(source);
        }
    });

    // Also handle "#startBtnTop"
    const startBtnTop = document.getElementById("startBtnTop");
    if (startBtnTop) {
        startBtnTop.addEventListener("click", (e) => {
            e.preventDefault();
            window.summonForm("Direct Home Page");
        });
    }

    // Pre-fill logic if ?source is present on URL (fallback for direct links)
    const params = new URLSearchParams(window.location.search);
    const sourceParam = params.get('source');
    if (sourceParam) {
        window.summonForm(sourceParam);
    }
});
