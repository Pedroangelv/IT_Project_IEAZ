document.addEventListener("DOMContentLoaded", function () {
  // Ocultar todas las secciones al inicio
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });

  inicializarSimbolos();
  cargarSimbolos();

  // Activar modo oscuro
  const darkBtn = document.getElementById("toggle-dark");
  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark");
      darkBtn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
    });
  }
});

// --- Mostrar y animar secciones ---
function showSection(sectionId) {
  let section = document.getElementById(sectionId);
  if (!section) return;

  // Ocultar todas primero
  document.querySelectorAll(".section").forEach((s) => {
    s.classList.remove("visible");
    s.classList.add("hidden");
  });

  // Mostrar la sección seleccionada con animación
  setTimeout(() => {
    section.classList.remove("hidden");
    setTimeout(() => section.classList.add("visible"), 50);
  }, 200);

  // Contenido dinámico
  if (sectionId === "menu-minijuegos") cargarMenuMinijuegos();
  if (sectionId === "simbolos") cargarSimbolos();
}

// --- Menú de minijuegos ---
function cargarMenuMinijuegos() {
  let container = document.getElementById("minijuegos-container");
  container.innerHTML = "";

  const minijuegos = [
    {
      nombre: "Madrugón",
      imagen: "",
      id: "Madrugón",
      archivo: "Games/Madrugón/test1/madrugon.html",
    },
    {
      nombre: "Basura",
      imagen: "",
      id: "Basura",
      archivo: "",
    },
    {
      nombre: "TriviAZ",
      imagen: "",
      id: "TriviAZ",
      archivo: "Games/Trivia/index.html",
    },
  ];

  minijuegos.forEach((minijuego) => {
    let minijuegoDiv = document.createElement("div");
    minijuegoDiv.classList.add("minijuego", "fade-item");
    minijuegoDiv.innerHTML = `
      <h3>${minijuego.nombre}</h3>
      <img src="${minijuego.imagen}" alt="${minijuego.nombre}" style="width: 100px;">
      <button onclick="jugarMinijuego('${minijuego.nombre}', '${minijuego.archivo}')">Jugar</button>
    `;
    container.appendChild(minijuegoDiv);
  });

  // Animación al cargar cada tarjeta
  const items = document.querySelectorAll(".fade-item");
  items.forEach((item, i) => {
    item.style.animationDelay = `${i * 0.1}s`;
    item.classList.add("fade-in");
  });
}

// --- Al jugar ---
function jugarMinijuego(nombre, archivo) {
  if (!archivo) {
    Swal.fire({
      title: "Juego no encontrado",
      text: "Juego disponible en breve...",
      icon: "error",
    });
    return;
  } else {
    Swal.fire({
      title: `${nombre}`,
      text: `¿Quieres jugar ${nombre}?`,
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Jugar",
      denyButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) window.location.href = archivo;
    });
  }
}

// --- Símbolos ---
const simbolos = [
  {
    id: "Escudo",
    nombre: "Escudo de la Institución",
    archivo: "Assets/main/Logo-zawadzky-1.jpe",
    descripcion: "Escudo representativo",
    esPdf: false,
  },
  {
    id: "Bandera",
    nombre: "Bandera",
    archivo: "Assets/main/Bandera-Zawadzky-300x207.png",
    descripcion: "Bandera de la Institución",
    esPdf: false,
  },
  {
    id: "Himno",
    nombre: "Himno",
    archivo: "Assets/main/himno.pdf",
    descripcion: "Himno institucional",
    esPdf: true,
  },
];

inicializarSimbolos();
let estados = obtenerEstadoSimbolos();

function cargarSimbolos() {
  let container = document.getElementById("simbolos-container");
  container.innerHTML = "";

  simbolos.forEach((simbolo) => {
    let simboloDiv = document.createElement("div");
    simboloDiv.classList.add("simbolo", "fade-item");

    let claseEstado =
      estados[simbolo.id] === "bloqueado" ? "bloqueado" : "desbloqueado";

    let contenido;
    if (estados[simbolo.id] === "bloqueado") {
      contenido = `<span class="candado">🔒</span>`;
    } else {
      if (simbolo.esPdf) {
        contenido = `<embed class="${claseEstado}" src="${simbolo.archivo}" width="600" height="800">`;
      } else {
        contenido = `<img src="${simbolo.archivo}" alt="${simbolo.nombre}" class="${claseEstado}" style="width: 150px;">`;
      }
    }

    simboloDiv.innerHTML = `
      <div id="${simbolo.nombre}" class="${claseEstado}">
        <h3>${simbolo.nombre}</h3>
        ${contenido}
        <p>${simbolo.descripcion}</p>
      </div>
    `;

    container.appendChild(simboloDiv);
  });

  // Animación suave de aparición
  const items = document.querySelectorAll(".fade-item");
  items.forEach((item, i) => {
    item.style.animationDelay = `${i * 0.1}s`;
    item.classList.add("fade-in");
  });
}

// --- Estado de símbolos ---
function inicializarSimbolos() {
  if (!localStorage.getItem("simbolos")) {
    let estadoInicial = {
      Escudo: "bloqueado",
      Bandera: "bloqueado",
      Himno: "bloqueado",
    };
    localStorage.setItem("simbolos", JSON.stringify(estadoInicial));
  }
}

function obtenerEstadoSimbolos() {
  return JSON.parse(localStorage.getItem("simbolos")) || {};
}
