function calcularBOM() {
    // Obtener la cantidad de mesas ingresada por el usuario
    let cantidadMesas = parseInt(document.getElementById('cantidadMesas').value);
    
    // Estructura del BOM de la mesa
    let bomMesa = {
        'Patas': 4 * cantidadMesas,
        'Superficie': 1 * cantidadMesas,
        'Tornillos': 16 * cantidadMesas,
        'Tuercas': 16 * cantidadMesas,
        'Tornillos para la superficie': 8 * cantidadMesas
    };
    
    // Calcular el total de componentes
    let totalComponentes = 0;
    for (let componente in bomMesa) {
        totalComponentes += bomMesa[componente];
    }
  
    // Generar HTML para mostrar el resultado del BOM
    let resultadoHTML = '<h2>Lista de Materiales para ' + cantidadMesas + ' Mesas:</h2>';
    resultadoHTML += '<ul>';
    
    for (let componente in bomMesa) {
        resultadoHTML += '<li><strong>' + componente + '</strong>: ' + bomMesa[componente] + '</li>';
    }
    
    // Añadir el total de componentes al final de la lista
    resultadoHTML += '<li><strong>Total de Componentes</strong>: ' + totalComponentes + '</li>';
    resultadoHTML += '</ul>';
    
    // Mostrar el resultado en el elemento con id "resultadoBOM"
    document.getElementById('resultadoBOM').innerHTML = resultadoHTML;
    
    // Generar diagrama visual del BOM (ejemplo simplificado)
    let diagramaHTML = '<h2>Diagrama Visual</h2>';
    diagramaHTML += '<svg width="500" height="400">';
    
    // Coordenadas iniciales para dibujar los componentes
    let x = 50;
    let y = 50;
    const dx = 150;
    const dy = 70;
  
    // Dibujar el cuadro principal
    diagramaHTML += `<rect x="${x}" y="${y}" width="120" height="50" fill="#f0f0f0" stroke="#333" stroke-width="2"/>`;
    diagramaHTML += `<text x="${x+60}" y="${y+30}" font-family="Arial" font-size="12" text-anchor="middle">Mesa (${cantidadMesas})</text>`;
  
    // Incrementar coordenadas para los componentes
    y += dy;
  
    for (let componente in bomMesa) {
      let cantidad = bomMesa[componente];
      diagramaHTML += `<rect x="${x}" y="${y}" width="150" height="30" fill="#f0f0f0" stroke="#333" stroke-width="1"/>`;
      diagramaHTML += `<text x="${x+75}" y="${y+20}" font-family="Arial" font-size="12" text-anchor="middle">${componente} (${cantidad})</text>`;
      diagramaHTML += `<line x1="${x+60}" y1="100" x2="${x+75}" y2="${y}" stroke="#333" stroke-width="1"/>`;
      y += dy;
    }
    
    diagramaHTML += '</svg>';
    
    // Mostrar el diagrama en el elemento con id "diagramaBOM"
    document.getElementById('diagramaBOM').innerHTML = diagramaHTML;
  }
  