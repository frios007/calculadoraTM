function validarCampos() {

    var numColumnas = document.getElementById('numColumnas').value;
    numColumnas = parseInt(numColumnas);

    if (isNaN(numColumnas) || numColumnas <= 0) {
        return false;
    }
    return true;
}


function generarTabla() {

    var camposValidos = validarCampos();
    if (!camposValidos) {
        alert('Advertencia: Ingrese un número válido mayor que cero en el campo de Semanas.');
        return;
    }

    var numColumnas = document.getElementById('numColumnas').value;
    var contenedor = document.getElementById('tabla-contenedor');

    var tabla = document.createElement('table');
    tabla.setAttribute('border', '1');
    tabla.setAttribute('cellspacing', '0');
    tabla.setAttribute('cellpadding', '3');
    tabla.setAttribute('width', '90%');

    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    var filaEncabezado1 = document.createElement('tr');
    var thVacio = document.createElement('th');
    thVacio.setAttribute('rowspan', '2');
    filaEncabezado1.appendChild(thVacio);

    var thColspan = document.createElement('th');
    thColspan.setAttribute('colspan', numColumnas);
    thColspan.textContent = 'Semanas';
    filaEncabezado1.appendChild(thColspan);
    thead.appendChild(filaEncabezado1);

    var filaEncabezado2 = document.createElement('tr');
    for (var i = 0; i < numColumnas; i++) {
        var th = document.createElement('th');
        th.textContent = (i + 1);
        filaEncabezado2.appendChild(th);
    }
    thead.appendChild(filaEncabezado2);

    var filaRequerimiento = document.createElement('tr');
    var tdRequerimiento = document.createElement('td');
    tdRequerimiento.textContent = 'Requerimiento bruto';
    filaRequerimiento.appendChild(tdRequerimiento);
    for (var i = 0; i < numColumnas; i++) {
        var td = document.createElement('td');
        var input = document.createElement('input');
        input.setAttribute('type', 'number');
        input.setAttribute('id', 'unidad' + (i + 1));
        input.setAttribute('min', '0');
        input.setAttribute('required', 'true');
        input.classList.add('styled-input'); 
        td.appendChild(input);
        filaRequerimiento.appendChild(td);
    }
    tbody.appendChild(filaRequerimiento);

    var filaRecepcion = document.createElement('tr');
    var tdRecepcion = document.createElement('td');
    tdRecepcion.textContent = 'Recepción planeada';
    filaRecepcion.appendChild(tdRecepcion);
    for (var i = 0; i < numColumnas; i++) {
        var td = document.createElement('td');
        filaRecepcion.appendChild(td);
    }
    tbody.appendChild(filaRecepcion);

    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    contenedor.innerHTML = '';
    contenedor.appendChild(tabla);
}


function generarTablaCalculos() {

    var camposValidos = validarCampos();
    if (!camposValidos) {
        return;
    }

    var numColumnas = parseInt(document.getElementById('numColumnas').value, 10);
    var tablaContenedor2 = document.getElementById('tabla-calculos');
    
    tablaContenedor2.innerHTML = '';

    var tabla2 = document.createElement('table');
    tabla2.border = '1';

    var thead2 = document.createElement('thead');
    var encabezadoFila2 = document.createElement('tr');

    var columnas2 = ['Periodo', 'Unidades', 'S', 'K', 'Costo total', 'Costo unitario $ total/unidades'];
    columnas2.forEach(function(columna) {
        var th2 = document.createElement('th');
        th2.textContent = columna;
        encabezadoFila2.appendChild(th2);
    });

    thead2.appendChild(encabezadoFila2);
    tabla2.appendChild(thead2);

    var tbody2 = document.createElement('tbody');

    for (var i = 0; i < numColumnas; i++) {
        var fila2 = document.createElement('tr');

        for (var j = 0; j < columnas2.length; j++) {
            var td2 = document.createElement('td');
            var input2 = document.createElement('input');
            input2.type = 'number';
            input2.name = columnas2[j].toLowerCase() + i;
            input2.disabled = true;

            td2.appendChild(input2);
            fila2.appendChild(td2);
        }
        tbody2.appendChild(fila2);
    }
    
    tabla2.appendChild(tbody2);
    tablaContenedor2.appendChild(tabla2);
}

function calculos() {
    var valores = [];
    var inputs = document.querySelectorAll('#tabla-contenedor input[type="number"]');
    var valorNegativoEncontrado = false;
    var campoVacioEncontrado = false;

    inputs.forEach(function(input) {
        var valor = input.value;

        if (valor === '') {
            campoVacioEncontrado = true;
            return;
        }

        valor = parseFloat(valor);

        if (valor < 0) {
            valorNegativoEncontrado = true;
            return;
        }

        valores.push(valor);
    });

    if (campoVacioEncontrado) {
        alert('Advertencia: Hay campos vacíos o erroneos. Por favor, complete todos los valores adecuadamente.');
        return;
    }

    if (valorNegativoEncontrado) {
        alert('Advertencia: Se ingresó un valor negativo. Por favor, corrija los valores.');
        return;
    }

    console.log("Valores ingresados:", valores);

    let k = document.getElementById('k').value;
    let s = document.getElementById('s').value;

    if(isNaN(k) || isNaN(s)){
        alert('Advertencia: los valores de k y s deben ser numeros validos');
    }

}


/*

document.getElementById("calcularLuc").addEventListener("click", function(){

    var s = parseFloat(document.getElementById("costo-ordenar").value);
    var k = parseFloat(document.getElementById("k").value);
    var unidad_1 = parseFloat(document.getElementById("unidad1").value);
    var unidad_2 = parseFloat(document.getElementById("unidad2").value);
    var unidad_3 = parseFloat(document.getElementById("unidad3").value);
    var unidad_4 = parseFloat(document.getElementById("unidad4").value);
    var unidad_5 = parseFloat(document.getElementById("unidad5").value);
    var unidad_6 = parseFloat(document.getElementById("unidad6").value);
    var unidad_7 = parseFloat(document.getElementById("unidad7").value);
    var unidad_8 = parseFloat(document.getElementById("unidad8").value);
    var unidad_9 = parseFloat(document.getElementById("unidad9").value);
    var unidad_10 = parseFloat(document.getElementById("unidad10").value);
    var periodo1=1;
    var periodo2=2;
    var periodo3=3;
    var periodo4=4;
    var periodo5=5;
    var periodo6=6;
    var periodo7=7;
    var periodo8=8;
    var periodo9=9;
    var periodo10=10;


    //primera iteracion
    var k0= periodo1*0*k;
    var ct = s + k0;
    var cut = (ct / unidad_1).toFixed(4);
    var cutLimitado = cut;

    document.getElementById("ip1").innerText=periodo1;
    document.getElementById("iu1").innerText=unidad_1;
    document.getElementById("is1").innerText=s;
    document.getElementById("ik1").innerText=periodo1+" * "+k+" * "+s+" = "+k;
    document.getElementById("ict1").innerText=ct;
    document.getElementById("icu1").innerText=cutLimitado;
    

    //segunda iteracion
    var p1 = periodo1 + periodo2;
    var u1= unidad_1 + unidad_2;
    var k1 = (p1 * periodo1 * k);
    k1= parseFloat(k1.toFixed(4));
    var ct1 = ct + k1;
    var cut1 = (ct1/u1);
    cut1=parseFloat(cut1.toFixed(4));

    document.getElementById("ip2").innerText=periodo1+" + "+periodo2;
    document.getElementById("iu2").innerText=unidad_1 +" + "+ unidad_2;
    document.getElementById("is2").innerText=s;
    document.getElementById("ik2").innerText=p1 +" * "+ periodo1 +" * "+ k+" = "+k1;
    document.getElementById("ict2").innerText=ct +" + "+ k1+" = "+ct1;
    document.getElementById("icu2").innerText=ct1+" / "+u1+" = "+cut1;
})
*/ 


