document.addEventListener("DOMContentLoaded", function () {
  // Asegúrate de que todas las secciones estén ocultas al cargar la página
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });
  inicializarSimbolos();
  cargarSimbolos();
});

// Función para mostrar y ocultar secciones
function showSection(sectionId) {
  // Buscar la sección que se va a mostrar/ocultar
  let section = document.getElementById(sectionId);

  // Verificar si la sección ya está visible
  if (section.classList.contains("hidden")) {
    // Ocultar todas las secciones
    document.querySelectorAll(".section").forEach((section) => {
      section.classList.add("hidden");
    });

    // Mostrar la sección seleccionada
    section.classList.remove("hidden");

    // Cargar contenido dinámico en minijuegos
    if (sectionId === "menu-minijuegos") {
      cargarMenuMinijuegos();
    }

    // Cargar símbolos desbloqueables
    if (sectionId === "simbolos") {
      cargarSimbolos();
    }
  } else {
    // Si la sección ya está visible, la ocultamos
    section.classList.add("hidden");
  }
}

//Funcion para cargar la pagina del minijuego

// Función para cargar los minijuegos en el menú
function cargarMenuMinijuegos() {
  let container = document.getElementById("minijuegos-container");
  container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

  // Agregar contenido dinámico para los minijuegos
  const minijuegos = [
    {
      nombre: "Madrugón",
      imagen: "",
      id: "Madrugón",
      archivo: "",
    },
    {
      nombre: "Basura",
      imagen: "game_image1.jpg",
      id: "Basura",
      archivo: "",
    },
    {
      nombre: "TriviAZ",
      imagen: "game_image1.jpg",
      id: "TriviAZ",
      archivo: "Games/Trivia/index.html",
    },
  ];

  // Crear los elementos para cada minijuego
  minijuegos.forEach((minijuego) => {
    let minijuegoDiv = document.createElement("div");
    minijuegoDiv.classList.add("minijuego");

    minijuegoDiv.innerHTML = `
      <h3>${minijuego.nombre}</h3>
      <img src="${minijuego.imagen}" alt="${minijuego.nombre}" style="width: 100px;">
      <button onclick="jugarMinijuego('${minijuego.nombre}', '${minijuego.archivo}')">Jugar</button>
    `;

    container.appendChild(minijuegoDiv); // Agregar el div al contenedor
  });
}
// Función para manejar la navegación al minijuego
function jugarMinijuego(nombre, archivo) {
  if (!archivo) {
    swal.fire({
      title: "Juego no encontrado",
      text: "Juego disponible en breve...",
      icon: "error"
    });
    return;
  } else{
    swal.fire({
      title: "${nombre}",
      text: "Quieres jugar ${nombre}",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: "Jugar",
      denyButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "${archivo}"; 
      }});
    
  } 
}
//Simbolos informacion
const simbolos = [
    {
      id: "Escudo",
      nombre: "Escudo de la Institución",
      archivo: "Logo-zawadzky-1.jpe",
      descripcion: "Escudo representativo",
      esPdf: false
    },
    { 
      id: "Bandera",
      nombre: "Bandera",
      archivo: "Bandera-Zawadzky-300x207.png",
      descripcion: "Bandera de la Institución",
      esPdf: false    
    },
    { 
      id: "Himno",
      nombre: "himno",
      archivo: "himno.pdf",
      descripcion: "Himno institucional",
      esPdf: true //propiedad para los pdf

    },
  ];
inicializarSimbolos();
let estados = obtenerEstadoSimbolos();
// Función para cargar los símbolos desbloqueables
function cargarSimbolos() {
  let container = document.getElementById("simbolos-container");
  container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos
  
  // Crear los elementos para cada símbolo
  simbolos.forEach((simbolo) => {
    let simboloDiv = document.createElement("div");
    simboloDiv.classList.add("simbolo");
    let claseEstado = estados[simbolo.id] === "bloqueado" ? "bloqueado" : "desbloqueado"

    let contenido;
    if (estados[simbolo.id] === "bloqueado"){
      contenido = `<span class="candado">🔒</span>`;
    }else{
      if (simbolo.esPdf){
        contenido = `<embed class="${claseEstado}" src="${simbolo.archivo}" width="600" height="800">`;
      }else {
        contenido = `<img src="${simbolo.archivo}" alt="${simbolo.nombre}" class="${claseEstado}" style="width: 150px;">`;
      
      } 
    }
    simboloDiv.innerHTML = `
          <div id="${simbolos.nombre}" class="${claseEstado}">
            <h3>${simbolo.nombre}</h3>
            ${contenido}
            <p>${simbolo.descripcion}</p>
          </div>  
        `;
    container.appendChild(simboloDiv); // Agregar el div al contenedor
  });
}

function inicializarSimbolos() {
  if (!localStorage.getItem("simbolos")){
    //En caso de no tener el json o que se halla dañado
    let estadoInicial = {
      Escudo: "bloqueado",
      Bandera: "bloqueado",
      Himno: "bloqueado"
    };
    localStorage.setItem("simbolos", JSON.stringify(estadoInicial));
  }
  
}
function obtenerEstadoSimbolos() {
  return JSON.parse(localStorage.getItem("simbolos")) || {};
}
