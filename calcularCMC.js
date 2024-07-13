
function calculoCMC(){
  var totalHoras = parseFloat(document.getElementById("horasTotales").value);
  var valorMtbf = parseFloat(document.getElementById("mtbf").value);
  var duracionT = parseFloat(document.getElementById("duracionTarea").value);
  var costoTrabajo = parseFloat(document.getElementById("costoHoraTrabajo").value);
  var respuesto = parseFloat(document.getElementById("repuestos").value);
  var tareasOperativas = parseFloat(document.getElementById("tareasOp").value);
  var retrasos = parseFloat(document.getElementById("retraso").value);
  var costoUnitarioP = parseFloat(document.getElementById("costoUnitario").value);
  var costoFallaUnica = parseFloat(document.getElementById("costoFalla").value);


  if(isNaN(totalHoras) || totalHoras<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para las horas totales.');
    return;
  }

  if(isNaN(valorMtbf) || valorMtbf<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para el valor del MTBF.');
    return;
  }

  if(isNaN(duracionT) || duracionT<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para la duracion de la Tarea.');
    return;
  }
    
  if(isNaN(costoTrabajo) || costoTrabajo<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para el costo/hr de trabajo.');
    return;
  }

  if(isNaN(respuesto) || respuesto<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para los repuestos.');
    return;
  }

  if(isNaN(tareasOperativas) || tareasOperativas<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para los costos de tareas operativas.');
    return;
  }

  if(isNaN(retrasos) || retrasos<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para el retraso logistico.');
    return;
  }

  if(isNaN(costoUnitarioP) || costoUnitarioP<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para el costo unitario por parada.');
    return;
  }

  if(isNaN(costoFallaUnica) || costoFallaUnica<=0 ){
    alert('Por favor, ingrese valores numéricos positivos para el costo de falla unica.');
    return;
  }

  
  //calculamos
  var nFallas = totalHoras / valorMtbf;
  var numeroFallas = Math.round(nFallas);


  var cmc1 = (duracionT * costoTrabajo) + respuesto + tareasOperativas + retrasos;
  var cmc2 = (duracionT * costoUnitarioP) + costoFallaUnica;
  var cmc3 = cmc1 + cmc2;
  var cmcFinal = Math.round(numeroFallas * cmc3);

  // imprimimos
  document.getElementById("numeroFallas").innerText = "El sistema Obtuvo que el número de fallas es igual a " + numeroFallas+ "  y costo del Mantenimiento correctivo es igual a " + cmcFinal;

  // para efecto de estetica, limpio los inputs
  limpiarInputs();
}


function limpiarInputs() {
    // Selecciono los inputs
    var inputs = document.querySelectorAll('input[type="number"]');
    
    // Itero sobre cada input y establezco su valor como una cadena vacía
    inputs.forEach(function(input) {
      input.value = undefined;
    });
  }

