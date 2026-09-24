// ---------- Class Portal shared logic ----------
const CLASS_PASSWORD = "1234567";
const SESSION_KEY = "classPortalAuthed";

function isAuthed() {
  return sessionStorage.getItem(SESSION_KEY) === "true";
}

function requireAuth() {
  if (!isAuthed()) {
    window.location.href = "index.html";
  }
}

function logout() {
  sessionStorage.removeItem(SESSION_KEY);
  window.location.href = "index.html";
}

// ---- Hamburger / slide-out nav ----
function initNav() {
  const hamburger = document.getElementById("hamburger");
  const overlay = document.getElementById("navOverlay");
  const sideNav = document.getElementById("sideNav");
  const closeBtn = document.getElementById("navClose");

  if (!hamburger || !overlay || !sideNav) return;

  const open = () => {
    overlay.classList.add("open");
    sideNav.classList.add("open");
  };
  const close = () => {
    overlay.classList.remove("open");
    sideNav.classList.remove("open");
  };

  hamburger.addEventListener("click", open);
  overlay.addEventListener("click", close);
  if (closeBtn) closeBtn.addEventListener("click", close);

  // mark active link
  const current = window.location.pathname.split("/").pop() || "dashboard.html";
  sideNav.querySelectorAll("a[data-page]").forEach((a) => {
    if (a.getAttribute("data-page") === current) {
      a.classList.add("active");
    }
  });
}

// ---- Login form handler (index.html only) ----
function initLoginForm() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const pw = document.getElementById("password").value;
    const errorEl = document.getElementById("errorMsg");

    if (pw === CLASS_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "true");
      window.location.href = "dashboard.html";
    } else {
      errorEl.textContent = "Incorrect password. Try again.";
    }
  });
}

// ---- Light / Dim theme toggle ----
const THEME_KEY = "classPortalTheme";

function applyTheme() {
  const theme = localStorage.getItem(THEME_KEY) || "light";
  if (theme === "dim") {
    document.documentElement.setAttribute("data-theme", "dim");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  return theme;
}

function initThemeToggle() {
  const toggle = document.getElementById("themeSwitch");
  if (!toggle) return;
  const current = applyTheme();
  if (current === "dim") toggle.classList.add("on");

  toggle.addEventListener("click", () => {
    const isDim = toggle.classList.toggle("on");
    localStorage.setItem(THEME_KEY, isDim ? "dim" : "light");
    applyTheme();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  initLoginForm();
  initNav();
  initThemeToggle();
});

// ---- Register service worker for offline / installable app support ----
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  });
}
