function calcularRotacion(){

      // Capturamos datos
      var d2 = parseFloat(document.getElementById("demandaSemanal").value);
      var t = parseFloat(document.getElementById("cicloRevision").value);
      var ss2 = parseFloat(document.getElementById("invSeguridad").value);
  
      // Verificamos si los valores son números válidos
      if (isNaN(d2) || d2<=0 ) {
        alert('Por favor, ingrese valores numéricos positivo para la demanda.');
        return;
      }

      if (isNaN(t) || t<=0 ) {
        alert('Por favor, ingrese valores numéricos positivo para el ciclo de revision.');
        return;
      }

      if (isNaN(ss2) || ss2<=0 ) {
        alert('Por favor, ingrese valores numéricos positivo para el inventario de seguridad.');
        return;
      }
  
      // Resolvemos
      var dxt = d2 * t;
      var divisionDxt = dxt / 2;
      var dxtRound = Math.round(divisionDxt);
      var valorPromedio = dxtRound + ss2;
      var dEntreVp = d2 / valorPromedio;
      var ri = Math.round(dEntreVp);
  
      // Condicional de ri menor a 0.5
      if (ri < 0.5) {
          ri = 1;
      }
  
      // Mostramos resultado en el HTML
      document.getElementById("vps").innerText = "El nivel de inventario promedio es igual a: " + valorPromedio;
      document.getElementById("respuesta").innerText = "La rotación de inventario por stock es igual a: " + ri;
      limpiarInputs();
    }


function limpiarInputs() {
    // Selecciono los inputs
  var inputs = document.querySelectorAll('input[type="number"]');
    
    // Itero sobre cada input y establezco su valor como una cadena vacía
    inputs.forEach(function(input) {
      input.value = null;
    });
  }
