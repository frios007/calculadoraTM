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
    tabla.setAttribute('id', 'tabla-semanas');

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
    var tablaContenedor2 = document.getElementById('tabla-contenedor2');

    tablaContenedor2.innerHTML = '';

    var tabla2 = document.createElement('table');
    tabla2.setAttribute('id', 'tabla-calculos');
    tabla2.setAttribute('border', '1');
    tabla2.setAttribute('cellspacing', '0');
    tabla2.setAttribute('cellpadding', '3');
    tabla2.setAttribute('width', '90%');

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

    var sumaAcumuladaPeriodo = 0;

    for (var i = 0; i < numColumnas; i++) {
        var fila2 = document.createElement('tr');

        var tdPeriodo = document.createElement('td');
        var spanPeriodo = document.createElement('span');
        spanPeriodo.setAttribute('id', i+1);
        sumaAcumuladaPeriodo += (i + 1);
        spanPeriodo.textContent = sumaAcumuladaPeriodo;
        tdPeriodo.appendChild(spanPeriodo);
        fila2.appendChild(tdPeriodo);

        for (var j = 1; j < columnas2.length; j++) {
            var td2 = document.createElement('td');
            var span = document.createElement('span');
            span.textContent = '';
            td2.appendChild(span);
            fila2.appendChild(td2);
        }
        tbody2.appendChild(fila2);
    }

    tabla2.appendChild(tbody2);
    tablaContenedor2.appendChild(tabla2);
}


function validarTablas() {
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

        if (valor <= 0) {
            valorNegativoEncontrado = true;
            return;
        }
        valores.push(valor);
    });

    if(valores.length === 0){
        alert('Advertencia: Debes de indicar valores válidos del Requerimiento bruto.');
        return false;
    }

    if (campoVacioEncontrado) {
        alert('Advertencia: Hay campos vacíos o erróneos. Por favor, complete todos los valores adecuadamente.');
        return false;
    }

    if (valorNegativoEncontrado) {
        alert('Advertencia: Se ingresó un valor negativo. Por favor, corrija los valores.');
        return false;
    }

    let k = document.getElementById('k').value;
    k = parseInt(k);
    let s = document.getElementById('s').value;
    s = parseInt(s);

    if(isNaN(k) || k < 0){
        alert('Advertencia: Ingrese un valor válido para k');
        return false;
    }

    if(isNaN(s) || s < 0){
        alert('Advertencia: Ingrese un valor válido para s');
        return false;
    }

    return true;
}



function operaciones() {

    var tablasValidas = validarTablas();
    if (!tablasValidas) {
        return;
    }

    var numColumnas = parseInt(document.getElementById('numColumnas').value, 10);
    var s = parseFloat(document.getElementById('s').value);
    var k = parseFloat(document.getElementById('k').value);

    var unidades = [];
    var sumaAcumuladaUnidades = 0;

    for (var i = 0; i < numColumnas; i++) {
        var requerimientoInput = document.getElementById('unidad' + (i + 1));
        var unidad = parseInt(requerimientoInput.value, 10);
        unidades.push(unidad);
        sumaAcumuladaUnidades += unidad;

        var unidadesSpan = document.querySelector('#tabla-calculos tbody tr:nth-child(' + (i + 1) + ') td:nth-child(2) span');
        if (unidadesSpan) {
            unidadesSpan.textContent = sumaAcumuladaUnidades;
        }
    }

    var tablaCalculos = document.getElementById('tabla-calculos');
    var tbodyCalculos = tablaCalculos.querySelector('tbody');

    var periodoAnterior = 0; 
    var costoTotalAnterior = 0;

    var filas = tbodyCalculos.querySelectorAll('tr');
    filas.forEach(function(fila, indice) {
        var periodoActual = parseFloat(fila.querySelector('td:nth-child(1) span').textContent);

        var celdaS = fila.querySelector('td:nth-child(3)');
        celdaS.textContent = s.toFixed(2); 

        var kCalculado = 0;
        if (indice > 0) {
            var idPeriodoAnterior = parseFloat(filas[indice - 1].querySelector('td:nth-child(1) span').id);
            kCalculado = periodoActual * idPeriodoAnterior * k;
        } else {
            kCalculado = k * periodoActual * 0;
        }

        var costoTotal = 0;
        if (indice > 0) {
            costoTotal = costoTotalAnterior + kCalculado;
        } else {
            costoTotal = s + kCalculado;
        }

        var unidadesActual = parseFloat(fila.querySelector('td:nth-child(2) span').textContent);

        var costoTotalUnitario = costoTotal / unidadesActual;

        var celdaK = fila.querySelector('td:nth-child(4)');
        var celdaCostoTotal = fila.querySelector('td:nth-child(5)');
        var celdaCostoTotalUnitario = fila.querySelector('td:nth-child(6)');

        celdaK.textContent = kCalculado.toFixed(2);
        celdaCostoTotal.textContent = costoTotal.toFixed(2);
        celdaCostoTotalUnitario.textContent = costoTotalUnitario.toFixed(5);

        costoTotalAnterior = costoTotal;
        periodoAnterior = periodoActual;
    });
}

function resaltarMaximosYCopiar() {

    var tablasValidas = validarTablas();
    if (!tablasValidas) {
        return;
    }

    var filasCalculos = document.querySelectorAll('#tabla-calculos tbody tr');

    var costosUnitarios = [];

    filasCalculos.forEach(function(fila) {
        var costoUnitario = parseFloat(fila.querySelector('td:nth-child(6)').textContent);
        costosUnitarios.push(costoUnitario);
    });

    var tablaOriginal = document.getElementById('tabla-semanas');
    var filaRecepcion = tablaOriginal.querySelector('tbody tr:nth-child(2)');

    costosUnitarios.forEach(function(costoUnitario, index) {
        var tdRecepcion = filaRecepcion.querySelector('td:nth-child(' + (index + 2) + ')');
        if (tdRecepcion) {
            tdRecepcion.textContent = costoUnitario.toFixed(5);
        }
    });

    var costosTotales = [];

    filasCalculos.forEach(function(fila) {
        var costoTotal = parseFloat(fila.querySelector('td:nth-child(5)').textContent);
        costosTotales.push({ fila: fila, costoTotal: costoTotal });
    });

    costosTotales.sort(function(a, b) {
        return b.costoTotal - a.costoTotal;
    });

    var fila1 = costosTotales[0].fila;
    var fila2 = costosTotales[1].fila;

    fila1.style.color = 'red';
    fila2.style.color = 'red';
}


