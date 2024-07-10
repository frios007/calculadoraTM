function limpiarInputs() {
    // Selecciono los inputs
    var inputs = document.querySelectorAll('input[type="number"]');
    
    // Itero sobre cada input y establezco su valor como una cadena vacía
    inputs.forEach(function(input) {
      input.value = undefined;
    });
  }

document.getElementById("calcCMC").addEventListener("click", function(){
    // obtenemos valores en variables
    var toltaHoras = parseFloat(document.getElementById("horasTotales").value);
    var valorMtbf = parseFloat(document.getElementById("mtbf").value);
    var duracionT = parseFloat(document.getElementById("duracionTarea").value);
    var costoTrabajo = parseFloat(document.getElementById("costoHoraTrabajo").value);
    var respuesto = parseFloat(document.getElementById("repuestos").value);
    var tareasOperativas = parseFloat(document.getElementById("tareasOp").value);
    var retrasos = parseFloat(document.getElementById("retraso").value);
    var costoUnitarioP = parseFloat(document.getElementById("costoUnitario").value);
    var costoFallaUnica = parseFloat(document.getElementById("costoFalla").value);
  
    //calculamos
    var nFallas = toltaHoras / valorMtbf;
    var numeroFallas = Math.round(nFallas);
    var cmc1 = (duracionT * costoTrabajo) + respuesto + tareasOperativas + retrasos;
    var cmc2 = (numeroFallas * costoUnitarioP) + costoFallaUnica;
    var cmc3 = cmc1 + cmc2;
    var cmcFinal = Math.round(numeroFallas * cmc3);
  
    // imprimimos
    document.getElementById("numeroFallas").innerText = "El sistema Obtuvo que el número de fallas es igual a: " + numeroFallas+ "  y costo del Mantenimiento correctivo es igual a: " + cmcFinal;
  
    // para efecto de estetica, limpio los inputs
    limpiarInputs();
  });
  