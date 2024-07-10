function calcularEOQ() {
  var d = parseFloat(document.getElementById("demanda").value);
  var s = parseFloat(document.getElementById("costoP").value);
  var h = parseFloat(document.getElementById("costoM").value);
  
  if (isNaN(d) || isNaN(s) || isNaN(h)) {
      alert('Por favor, ingrese valores numéricos válidos en todos los campos.');
      return;
  }
  
  var multi = 2 * d * s;
  var div = multi / h;
  var raiz = Math.sqrt(div);
  var resultado = Math.round(raiz);

  document.getElementById("resultado").innerText = "El resultado es: " + resultado + " Unidades";
  limpiarInputs();
}

document.getElementById("resolver").addEventListener("click", calcularEOQ);
