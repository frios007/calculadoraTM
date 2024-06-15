function limpiarInputs() {
    // Selecciono los inputs
    var inputs = document.querySelectorAll('input[type="number"]');
    
    // Itero sobre cada input y establezco su valor como una cadena vacía
    inputs.forEach(function(input) {
      input.value = null;
    });
  }

document.getElementById("rotacionStock").addEventListener("click", function(){

    //capturamos datos
        var d2 = parseFloat(document.getElementById("demandaSemanal").value);
        var t = parseFloat(document.getElementById("cicloRevision").value);
        var ss2 = parseFloat(document.getElementById("invSeguridad").value);
    
        //resolvemos
        var dxt = d2*t;
        var divisionDxt= dxt /2;
        var dxtRound= Math.round(divisionDxt);
        var valorPromedio= dxtRound + ss2;
        var dEntreVp= d2/valorPromedio;
        var ri = Math.round(dEntreVp);

        //condicional de ri menor a 0.5
        if(ri<0.5){
            ri=1
            document.getElementById("vps").innerText= "El nivel de inventario Promedio es igual a: "+valorPromedio;
            document.getElementById("respuesta").innerText="La rotacion de inventario por Stock es igual a: "+ri;
        }else{
            document.getElementById("vps").innerText= "El nivel de inventario Promedio es igual a: "+valorPromedio;
            document.getElementById("respuesta").innerText="La rotacion de inventario por Stock es igual a: "+ri;
        }
        limpiarInputs();
})