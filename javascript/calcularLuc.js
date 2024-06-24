
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

function generarTabla() {

    var numColumnas = document.getElementById('numColumnas').value;

    if (numColumnas <= 0) {
        alert('Por favor, ingrese un número positivo de columnas.');
        return;
    }

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

function calculos() {
    var valores = [];
    var inputs = document.querySelectorAll('#tabla-contenedor input[type="number"]');
    var valorNegativoEncontrado = false;

    inputs.forEach(function(input) {
        var valor = parseFloat(input.value);

        if (valor < 0) {
            valorNegativoEncontrado = true;
            return;
        }

        valores.push(valor);
    });

    if (valorNegativoEncontrado) {
        alert('Advertencia: Se ingresó un valor negativo. Por favor, corrija los valores.');
        return;
    }

    console.log("Valores ingresados:", valores);
}



