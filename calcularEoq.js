function calcularEOQ() {
  var d = parseFloat(document.getElementById("demanda").value);
  var s = parseFloat(document.getElementById("costoP").value);
  var h = parseFloat(document.getElementById("costoM").value);
  
  if (isNaN(d) || d<=0 ) {
      alert('Por favor, ingrese valores numéricos positivo para la demanda.');
      return;
  }

  if (isNaN(s) || s<=0 ) {
    alert('Por favor, ingrese valores numéricos positivo para el costo por pedido.');
    return;
}

if (isNaN(h) || h<=0 ) {
  alert('Por favor, ingrese valores numéricos positivo para el costo de mantenimiento.');
  return;
}
  

  var multi = 2 * d * s;
  var div = multi / h;
  var raiz = Math.sqrt(div);
  var resultado = Math.round(raiz);

  document.getElementById("resultado").innerText = "El resultado es: " + resultado + " Unidades";
  limpiarInputs();
}


function limpiarInputs() {
  var inputs = document.querySelectorAll('input[type="number"]');
  
  inputs.forEach(function(input) {
    input.value = undefined;
  });
}