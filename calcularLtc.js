function generarTabla() {
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

    var columnas2 = ['Periodo', 'Unidades', 'Periodos Mantenidos', 'Costo Mantenimiento', 'Costo Acumulado'];
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

        var tdPeriodo = document.createElement('td');
        var spanPeriodo = document.createElement('span');
        spanPeriodo.setAttribute('id', i + 1);
        spanPeriodo.textContent = i + 1;
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


function asignarValores() {
    var numColumnas = document.getElementById('numColumnas').value;

    var requerimientosBrutos = [];
    for (var i = 0; i < numColumnas; i++) {
        var input = document.getElementById('unidad' + (i + 1));
        if (input) {
            requerimientosBrutos.push(input.value);
        }
    }

    var tablaCalculos = document.getElementById('tabla-calculos');
    if (tablaCalculos) {
        var filas = tablaCalculos.getElementsByTagName('tr');
        for (var i = 1; i < filas.length; i++) {
            var celdas = filas[i].getElementsByTagName('td');
            if (celdas.length > 1) {
                var spanUnidad = celdas[1].getElementsByTagName('span')[0];
                if (spanUnidad) {
                    spanUnidad.textContent = requerimientosBrutos[i - 1] || '';
                }
            }
        }

        for (var i = 1; i < filas.length; i++) {
            var celdas = filas[i].getElementsByTagName('td');
            if (celdas.length > 2) {
                var spanPeriodosMantenidos = celdas[2].getElementsByTagName('span')[0];
                if (spanPeriodosMantenidos) {
                    spanPeriodosMantenidos.textContent = i - 1;
                }
            }
        }
    }
}

function operaciones() {
    var k = parseFloat(document.getElementById('k').value);
    var tablaCalculos = document.getElementById('tabla-calculos');

    if (tablaCalculos) {
        var filas = tablaCalculos.getElementsByTagName('tr');
        for (var i = 1; i < filas.length; i++) { 
            var celdas = filas[i].getElementsByTagName('td');

            if (i === 1) {
                var spanCostoMantenimiento = celdas[3].getElementsByTagName('span')[0];
                var spanCostoAcumulado = celdas[4].getElementsByTagName('span')[0];

                if (spanCostoMantenimiento) {
                    spanCostoMantenimiento.textContent = '0.00';
                }
                if (spanCostoAcumulado) {
                    spanCostoAcumulado.textContent = '0.00';
                }
            } else {
                var unidadesActual = parseFloat(celdas[1].getElementsByTagName('span')[0].textContent);
                var periodoAnterior = parseFloat(filas[i - 1].getElementsByTagName('td')[0].getElementsByTagName('span')[0].textContent);

                var costoMantenimiento = (unidadesActual * periodoAnterior * k).toFixed(2);
                var costoAcumulado = costoMantenimiento; //

                var spanCostoMantenimiento = celdas[3].getElementsByTagName('span')[0];
                var spanCostoAcumulado = celdas[4].getElementsByTagName('span')[0];

                if (spanCostoMantenimiento) {
                    spanCostoMantenimiento.textContent = costoMantenimiento;
                }
                if (spanCostoAcumulado) {
                    spanCostoAcumulado.textContent = costoAcumulado;
                }
            }
        }
    }
}