function calculoJit() {
    let tiempo = parseFloat(document.getElementById('tiempo').value);
    let demanda = parseFloat(document.getElementById('demanda').value);
    let recipientes = parseFloat(document.getElementById('recipientes').value);
    const seleccion = document.getElementById('seleccion').value;

    if (isNaN(tiempo) || tiempo <= 0) {
        alert("Por favor, ingrese un valor del tiempo válido");
        return;
    }

    if (isNaN(demanda) || demanda <= 0) {
        alert("Por favor, ingrese un valor de demanda válido");
        return;
    }

    if (isNaN(recipientes) || recipientes <= 0) {
        alert("Por favor, ingrese un valor de recipientes válido");
        return;
    }

    let unidadTiempo;
    let resultado;
    let inventario;

    switch (seleccion) {
        case 'segundos':
            unidadTiempo = tiempo / 60;
            break;
        
        case 'minutos':
            unidadTiempo = tiempo;
            break;

        case 'horas':
            unidadTiempo = tiempo * 60;
            break;
        
        default:
            alert("Seleccione una unidad de tiempo válida");
            return;
    }

    resultado = Math.round((demanda * unidadTiempo) / (60 * recipientes));
    inventario = Math.round(recipientes * resultado);
    
    document.getElementById('resultado').innerText = 'Se obtuvieron ' + resultado + ' recipientes';
    document.getElementById('inventario').innerText = 'Se obtuvieron ' + inventario + ' unidades';
    limpiarInputs();
}


function limpiarInputs() {
    var inputs = document.querySelectorAll('input[type="number"]');
    
    inputs.forEach(function(input) {
      input.value = undefined;
    });
  }