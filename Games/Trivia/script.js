// Número total de preguntas a responder en el juego
let totalPreguntas = 4;

// Contador de preguntas respondidas
let preguntasContestadas = 0;

// Contador de respuestas buenas
let respuestasBuenas = 0;

// Base de preguntas cargadas desde el JSON
let interprete_bp = [];
let preguntasDisponibles = [];

// Variables para almacenar la pregunta actual y sus posibles respuestas
let pregunta;
let posibles_respuestas;

// Referencias a los botones de respuesta
let btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4")
];

// Cargar preguntas y comenzar el juego
cargarPreguntas();

// Función para cargar el JSON de preguntas de forma asíncrona
async function cargarPreguntas() {
  let response = await fetch("base-preguntas.json");
  interprete_bp = await response.json();
  preguntasDisponibles = [...interprete_bp];
  escogerPreguntaAleatoria();
}

// Función para escoger una pregunta aleatoria
function escogerPreguntaAleatoria() {
  if (preguntasDisponibles.length === 0) {
    preguntasDisponibles = [...interprete_bp]; // Restablece las preguntas disponibles
    preguntasContestadas = 0;
    respuestasBuenas = 0;
    actualizarContador();
  }

  let indice = Math.floor(Math.random() * preguntasDisponibles.length);
  escogerPregunta(indice);
}

// Función para asignar una pregunta al juego
function escogerPregunta(n) {
  pregunta = preguntasDisponibles[n];
  preguntasDisponibles.splice(n, 1);

  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;

  style("imagen").objectFit = pregunta.objectFit;
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen);
    style("imagen").height = "200px";
    style("imagen").width = "100%";
  } else {
    style("imagen").height = "0px";
    style("imagen").width = "0px";
  }

  desordenarRespuestas(pregunta);
}

// Función para desordenar las respuestas antes de mostrarlas
function desordenarRespuestas(pregunta) {
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3
  ];
  posibles_respuestas.sort(() => Math.random() - 0.5);

  for (let i = 0; i < 4; i++) {
    btn_correspondiente[i].innerHTML = posibles_respuestas[i];
  }
}

// Función que se ejecuta cuando se presiona un botón de respuesta
function oprimir_btn(i) {
  if (posibles_respuestas[i] === pregunta.respuesta) {
    btn_correspondiente[i].style.background = "lightgreen";
    respuestasBuenas++;
    actualizarContador();
  } else {
    btn_correspondiente[i].style.background = "red";
  }

  setTimeout(() => {
    reiniciar();
  }, 300);
}

// Función para reiniciar la pregunta y verificar si el juego ha terminado
function reiniciar() {
  preguntasContestadas++;
  actualizarContador();
  
  let umbral = Math.ceil(totalPreguntas * 0.6);
  if (respuestasBuenas >= umbral) {
    let simbolos = obtenerEstadoSimbolos();
    simbolos.Escudo = "desbloqueado";
    localStorage.setItem("simbolos", JSON.stringify(simbolos));
    swal.fire({
      title: "¡Logro desbloqueado!",
      text: "Has desbloqueado el escudo institucional",
      icon: "info"
    })
  }

  if (preguntasContestadas >= totalPreguntas) {
    swal.fire({
      title: "¡Juego Terminado!",
      text: "Has respondido todas las preguntas.",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Reiniciar",
      cancelButtonText: "Ir a inicio",
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        preguntasDisponibles = [...interprete_bp];
        preguntasContestadas = 0;
        respuestasBuenas = 0;
        actualizarContador();
        escogerPreguntaAleatoria();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        window.location.href = "../../index.html";
      }
    });
  }

  for (const btn of btn_correspondiente) {
    btn.style.background = "white";
  }

  escogerPreguntaAleatoria();
}

// Función para actualizar el contador de preguntas en la interfaz
function actualizarContador() {
  select_id("contador").innerHTML = `${respuestasBuenas}/${totalPreguntas}`;
}

// Función para obtener un elemento por su ID
function select_id(id) {
  return document.getElementById(id);
}

// Función para acceder a los estilos de un elemento por su ID
function style(id) {
  return select_id(id).style;
}

// Función para obtener y actualizar el estado de los símbolos
function obtenerEstadoSimbolos() {
  let simbolos = localStorage.getItem("simbolos");

  if (!simbolos) {
    simbolos = { Escudo: "bloqueado" };
    localStorage.setItem("simbolos", JSON.stringify(simbolos));
  } else {
    simbolos = JSON.parse(simbolos);
  }

  return simbolos;
}

