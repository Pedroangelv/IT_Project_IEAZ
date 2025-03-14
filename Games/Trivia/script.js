
// Número total de preguntas a responder en el juego
let totalPreguntas = 4 

// Contador de preguntas respondidas
let preguntasContestadas = 0

// Se lee el archivo JSON que contiene la base de preguntas
let base_preguntas = readText("base-preguntas.json")

// Se convierte el JSON en un objeto de JavaScript
let interprete_bp = JSON.parse(base_preguntas)

// Se crea una copia de las preguntas disponibles para evitar modificar el JSON original
let preguntasDisponibles = [...interprete_bp]

// Variables para almacenar la pregunta actual y sus posibles respuestas
let pregunta
let posibles_respuestas

// Referencias a los botones de respuesta
let btn_correspondiente = [
  select_id("btn1"), select_id("btn2"),
  select_id("btn3"), select_id("btn4")
]

// Se elige una pregunta aleatoria al inicio del juego
escogerPreguntaAleatoria()

// Se actualiza el contador de preguntas respondidas en la interfaz
actualizarContador()


// Función para escoger una pregunta aleatoria
function escogerPreguntaAleatoria() {
  // Si ya no hay preguntas disponibles, se reinicia la lista de preguntas
  if (preguntasDisponibles.length === 0) {
    preguntasDisponibles = [...interprete_bp] // Restablece las preguntas disponibles
    preguntasContestadas = 0 // Reinicia el contador
    actualizarContador() // Actualiza el contador en la interfaz
  }

  // Se elige un índice aleatorio dentro del array de preguntas disponibles
  let indice = Math.floor(Math.random() * preguntasDisponibles.length)

  // Se selecciona la pregunta en la posición del índice aleatorio
  escogerPregunta(indice)
}


// Función para asignar una pregunta al juego
function escogerPregunta(n) {
  pregunta = preguntasDisponibles[n] // Se almacena la pregunta seleccionada
  preguntasDisponibles.splice(n, 1) // Se elimina la pregunta para evitar su repetición

  // Se actualiza el contenido de la interfaz con la pregunta y su categoría
  select_id("categoria").innerHTML = pregunta.categoria
  select_id("pregunta").innerHTML = pregunta.pregunta

  // Configuración del estilo de la imagen si existe
  style("imagen").objectFit = pregunta.objectFit
  if (pregunta.imagen) {
    select_id("imagen").setAttribute("src", pregunta.imagen)
    style("imagen").height = "200px"
    style("imagen").width = "100%"
  } else {
    style("imagen").height = "0px"
    style("imagen").width = "0px"
  }

  // Se reorganizan las respuestas en posiciones aleatorias
  desordenarRespuestas(pregunta)
}

// Lista de botones de respuesta
let btns = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
]

// Función para desordenar las respuestas antes de mostrarlas
function desordenarRespuestas(pregunta) {
  // Se almacenan las respuestas en un array y se mezclan aleatoriamente
  posibles_respuestas = [
    pregunta.respuesta,
    pregunta.incorrecta1,
    pregunta.incorrecta2,
    pregunta.incorrecta3
  ]
  posibles_respuestas.sort(() => Math.random() - 0.5) // Se mezclan las respuestas

  // Se asignan las respuestas mezcladas a los botones
  for (let i = 0; i < 4; i++) {
    btn_correspondiente[i].innerHTML = posibles_respuestas[i]
  }
}

// Función que se ejecuta cuando se presiona un botón de respuesta
function oprimir_btn(i) {
  // Si la respuesta es correcta, se cambia el color del botón a verde
  if (posibles_respuestas[i] == pregunta.respuesta) {
    btn_correspondiente[i].style.background = "lightgreen"
  } else {
    // Si la respuesta es incorrecta, se cambia a rojo
    btn_correspondiente[i].style.background = "red"
  }

  // Se espera un tiempo y luego se reinicia el juego con la siguiente pregunta
  setTimeout(() => {
    reiniciar()
  }, 300)
}

// Función para reiniciar la pregunta y verificar si el juego ha terminado
function reiniciar() {
  preguntasContestadas++ // Se incrementa el contador de preguntas contestadas
  actualizarContador() // Se actualiza el contador en la interfaz

  // Si se han respondido todas las preguntas, se muestra un mensaje de finalización
  if (preguntasContestadas >= totalPreguntas) {
    swal.fire({
      title: "¡Juego Terminado!",
      text: "Has respondido todas las preguntas.",
      icon: "success",
      confirmButtonText: "Reiniciar",
      allowOutsideClick: false
    }).then(() => {
      // Se reinician las preguntas disponibles y el contador
      preguntasDisponibles = [...interprete_bp]
      preguntasContestadas = 0
      actualizarContador()
      escogerPreguntaAleatoria()
    })
  }

  // Se restablecen los colores de los botones
  for (const btn of btn_correspondiente) {
    btn.style.background = "white"
  }

  // Se selecciona una nueva pregunta
  escogerPreguntaAleatoria()
}

// Función para actualizar el contador de preguntas en la interfaz
function actualizarContador() {
  select_id("contador").innerHTML = `${preguntasContestadas}/${totalPreguntas}`
}

// Función para obtener un elemento por su ID
function select_id(id) {
  return document.getElementById(id)
}

// Función para acceder a los estilos de un elemento por su ID
function style(id) {
  return select_id(id).style
}

// Función para leer un archivo de texto (en este caso, el JSON con preguntas)
function readText(ruta_local) {
  var texto = null
  var xmlhttp = new XMLHttpRequest()
  xmlhttp.open("GET", ruta_local, false) // Se realiza la petición de manera síncrona
  xmlhttp.send()
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText // Se guarda el contenido del archivo
  }
  return texto
}

