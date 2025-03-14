document.addEventListener("DOMContentLoaded", function () {
  // Asegúrate de que todas las secciones estén ocultas al cargar la página
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.add("hidden");
  });
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
    alert("Este minijuego aún no está disponible.");
    return;
  }
  if (confirm(`¿Quieres jugar ${nombre}?`)) {
    window.location.href = archivo;
  }
}

// Función para cargar los símbolos desbloqueables
function cargarSimbolos() {
  let container = document.getElementById("simbolos-container");
  container.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos elementos

  // Crear el contenido dinámico para los símbolos
  const simbolos = [
    {
      nombre: "Escudo de la Institución",
      imagen: "Logo-zawadzky-1.jpe",
      descripcion: "Escudo representativo",
    },
    {
      nombre: "Bandera",
      imagen: "Bandera-Zawadzky-300x207.png",
      descripcion: "Bandera",
    },
  ];

  // Crear los elementos para cada símbolo
  simbolos.forEach((simbolo) => {
    let simboloDiv = document.createElement("div");
    simboloDiv.classList.add("simbolo");

    simboloDiv.innerHTML = `
            <h3>${simbolo.nombre}</h3>
            <img src="${simbolo.imagen}" alt="${simbolo.nombre}" style="width: 150px;">
            <p>${simbolo.descripcion}</p>
        `;
    container.appendChild(simboloDiv); // Agregar el div al contenedor
  });
  const himno = {
    nombre: "Himno de la Institucion Educativa Alfonso Zawadzky",
    archivo: "himno.pdf",
    descripcion: "Himno institucional",
  };
  let himnoDiv = document.createElement("div");
  himnoDiv.classList.add("simbolo");
  himnoDiv.innerHTML = `
          <h3>${himno.nombre}</h3>
            <embed class="pdf" src="${himno.archivo}" width="80" height="600">
            <p>${himno.descripcion}</p>
        `;
  container.appendChild(himnoDiv);
}
