
function calcularRotacion(){

 //capturamos datos    
  var d = parseFloat(document.getElementById("demandaAnual").value);
  var q = parseFloat(document.getElementById("cantidadPedida").value);
  var ss = parseFloat(document.getElementById("inventarioSeguridad").value);

  if (isNaN(d) || d<=0 ) {
    alert('Por favor, ingrese valores numéricos positivo para la demanda anual.');
    return;
  }

  if (isNaN(q) || q<=0 ) {
    alert('Por favor, ingrese valores numéricos positivo para la cantidad pedida.');
    return;
  }

  if (isNaN(ss) || ss<=0 ) {
    alert('Por favor, ingrese valores numéricos positivo para el inventario de seguridad.');
    return;
  }
  
          //resolvemos
  var valorPromedio1 = (q/2) + ss;
  var valorPromedio2 = Math.round(valorPromedio1);
  var rotacionInv = d / valorPromedio2;
  var resultado = Math.round(rotacionInv);
  
          //mostramos resultado en el html
  document.getElementById("inventarioPromedio").innerText = "El inventario promedio es igual a: "+valorPromedio2;
  document.getElementById("resultado").innerText = "La rotacion de inventario es igual a: "+resultado;
  limpiarInputs();
}


function limpiarInputs() {
  // Selecciono los inputs
var inputs = document.querySelectorAll('input[type="number"]');
  
  //Itero sobre cada input y establezco su valor como una cadena vacía
  inputs.forEach(function(input) {
    input.value = null;
  });
}

