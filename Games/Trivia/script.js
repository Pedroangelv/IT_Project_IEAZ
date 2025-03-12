escogerPregunta(0)

function escogerPregunta(n) {
  let base_preguntas = readText("base-preguntas.json")
  let interprete_bp = JSON.parse(base_preguntas)
  pregunta = interprete_bp[n]
  select_id("categoria").innerHTML = pregunta.categoria
  select_id("pregunta").innerHTML = pregunta.pregunta
  select_id("imagen").setAttribute("src" ,pregunta.imagen)
  style("imagen").objectfit = pregunta.objectfit;
  select_id("btn1").innerHTML = pregunta.respuesta
  select_id("btn2").innerHTML = pregunta.incorrecta1
  select_id("btn3").innerHTML = pregunta.incorrecta2
  select_id("btn4").innerHTML = pregunta.incorrecta3
}

function select_id(id) {
  return document.getElementById(id)
}
function style(id) {
  return select_id(id).style
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if ((xmlhttp.status = 200)) {
    texto = xmlhttp.responseText;
  }
  return texto;
}
