éscogerPregunta(0);

function escogerPregunta(n) {
  let base_pregunta = readText("base-preguntas.json");
  let interprete_bp = JSON.parse(base_preguntas);
  pregunta = interprete_bp[n];
  select_id("categoria").innerHTML = pregunta.categoria;
  select_id("pregunta").innerHTML = pregunta.pregunta;
}

function select_id(id) {
  return document.getElementById;
}
function style(id) {
  return select_id(id).style;
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
