function limpiarInputs() {
    // Selecciono los inputs
    var inputs = document.querySelectorAll('input[type="number"]');
    
    // Itero sobre cada input y establezco su valor como una cadena vacía
    inputs.forEach(function(input) {
      input.value = null;
    });
  }


document.getElementById("rotacionSimple").addEventListener("click", function(){

        //capturamos datos    
        var d = parseFloat(document.getElementById("demandaAnual").value);
        var q = parseFloat(document.getElementById("cantidadPedida").value);
        var ss = parseFloat(document.getElementById("inventarioSeguridad").value);

        //resolvemos
        var valorPromedio1 = (q/2) + ss;
        var valorPromedio2 = Math.round(valorPromedio1);
        var rotacionInv = d / valorPromedio2;
        var resultado = Math.round(rotacionInv);

        //mostramos resultado en el html
        document.getElementById("invetarioPromedio").innerText = "El inventario promedio es igual a: "+valorPromedio2;
        document.getElementById("resultado").innerText = "La rotacion de inventario es igual a: "+resultado;

        limpiarInputs();
})



