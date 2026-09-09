const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

window.addEventListener("load", () => {
  setTimeout(() => $("#loader")?.classList.add("hide"), 550);
});

const header = $("#header");
window.addEventListener("scroll", () => {
  header?.classList.toggle("scrolled", window.scrollY > 40);
});

const mobileMenu = $("#mobileMenu");
$("#menuBtn")?.addEventListener("click", () => mobileMenu.classList.toggle("open"));
$$(".mobile-menu a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("open")));

const modal = $("#authModal");
const selectedService = $("#selectedService");
const modalTitle = $("#modalTitle");
const authForm = $("#authForm");
let selected = "";

function openAuth(service = "") {
  selected = service;
  if (service) {
    selectedService.textContent = `Solicitud seleccionada: ${service}`;
    selectedService.classList.add("show");
  } else {
    selectedService.classList.remove("show");
  }
  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  setTimeout(() => $("#email")?.focus(), 150);
}
function closeAuth() {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}
$("#loginBtn")?.addEventListener("click", () => openAuth());
$("#accountBtn")?.addEventListener("click", () => openAuth());
$("#mobileLogin")?.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  openAuth();
});
$$("[data-close-modal]").forEach(el => el.addEventListener("click", closeAuth));
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    closeAuth();
    $("#searchPanel")?.classList.remove("open");
  }
});

$$("[data-service]").forEach(btn => {
  btn.addEventListener("click", () => openAuth(btn.dataset.service));
});

$("#registerToggle")?.addEventListener("click", () => {
  const isRegister = modalTitle.textContent === "Crear cuenta";
  modalTitle.textContent = isRegister ? "Inicia sesión" : "Crear cuenta";
  $("#registerToggle").textContent = isRegister ? "Regístrate aquí" : "Ya tengo una cuenta";
  authForm.querySelector(".submit-btn").innerHTML = isRegister ? "Ingresar <span>→</span>" : "Crear cuenta <span>→</span>";
});

authForm?.addEventListener("submit", e => {
  e.preventDefault();
  const email = $("#email").value.trim();
  const action = modalTitle.textContent === "Crear cuenta" ? "registro" : "inicio de sesión";
  alert(`Demo: ${action} recibido para ${email}.${selected ? `\nServicio: ${selected}` : ""}\n\nLa conexión real a la base de datos se agrega en la siguiente etapa.`);
});

$("#forgot")?.addEventListener("click", e => {
  e.preventDefault();
  alert("Aquí conectaremos posteriormente el flujo de recuperación de contraseña.");
});

const searchPanel = $("#searchPanel");
$("#searchBtn")?.addEventListener("click", () => searchPanel.classList.add("open"));
$("#closeSearch")?.addEventListener("click", () => searchPanel.classList.remove("open"));

const searchInput = $("#siteSearch");
searchInput?.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const term = searchInput.value.toLowerCase().trim();
    const map = {
      "letrero": "#productos", "letreros": "#productos", "anuncio": "#productos",
      "maqueta": "#productos", "maquetas": "#productos", "escultura": "#productos",
      "diseño": "#servicios", "fabricación": "#servicios", "servicio": "#servicios",
      "bolo": "#proyectos", "minotauro": "#proyectos", "proyecto": "#proyectos"
    };
    const destination = Object.keys(map).find(key => term.includes(key));
    if (destination) {
      searchPanel.classList.remove("open");
      document.querySelector(map[destination])?.scrollIntoView({behavior:"smooth"});
    } else {
      alert("No encontramos ese término todavía. Prueba con: letreros, maquetas, diseño, fabricación, Bolo o Minotauro.");
    }
  }
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${Math.min(i * 45, 180)}ms`;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
$$(".reveal").forEach(el => observer.observe(el));
