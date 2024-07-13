function calcularBOM() {
  // Obtener la cantidad de bicicletas ingresada por el usuario
  let cantidadBicicletas = parseInt(document.getElementById('cantidadBicicletas').value);
  
  // Estructura de la bicicleta
  let bomBicicleta = {
      'Cuadro': 1 * cantidadBicicletas,
      'Ruedas': {
          'Llanta': 2 * cantidadBicicletas,
          'Cámara': 2 * cantidadBicicletas
      },
      'Manillar': 1 * cantidadBicicletas,
      'Asiento': {
          'Funda': 1 * cantidadBicicletas
      },
      'Pedal': {
          'Eje': 2 * cantidadBicicletas
      }
  };

  // Variable para la suma total de materiales
  let totalMateriales = 0;

  // Función recursiva para sumar todos los materiales
  function sumarMateriales(componente) {
      if (typeof componente === 'object') {
          for (let subcomponente in componente) {
              sumarMateriales(componente[subcomponente]);
          }
      } else {
          totalMateriales += componente;
      }
  }

  // Sumar todos los materiales en bomBicicleta
  for (let componente in bomBicicleta) {
      sumarMateriales(bomBicicleta[componente]);
  }
  
  // Generar HTML para mostrar el resultado
  let resultadoHTML = '<h2>Lista de Materiales para ' + cantidadBicicletas + ' Bicicletas:</h2>';
  resultadoHTML += '<ul>';
  
  for (let componente in bomBicicleta) {
      resultadoHTML += '<li><strong>' + componente + '</strong>: ';
      
      if (typeof bomBicicleta[componente] === 'object') {
          resultadoHTML += '<ul>';
          for (let subcomponente in bomBicicleta[componente]) {
              resultadoHTML += '<li>' + subcomponente + ': ' + bomBicicleta[componente][subcomponente] + '</li>';
          }
          resultadoHTML += '</ul>';
      } else {
          resultadoHTML += bomBicicleta[componente];
      }
      
      resultadoHTML += '</li>';
  }
  
  resultadoHTML += '</ul>';
  resultadoHTML += '<p><strong>Total de materiales:</strong> ' + totalMateriales + '</p>';
  
  // Mostrar el resultado en el elemento con id "resultadoBOM"
  document.getElementById('resultadoBOM').innerHTML = resultadoHTML;
  
  // Generar diagrama visual basado en la estructura BOM
  let diagramaHTML = '<h2>Diagrama Visual del Materiales</h2>';
  diagramaHTML += '<svg width="800" height="600">';
  
  // Coordenadas iniciales
  let x = 50;
  let y = 50;
  const dx = 150;
  const dy = 70;
  
  // Dibujar el cuadro principal
  diagramaHTML += `<rect x="${x}" y="${y}" width="100" height="50" fill="#f0f0f0" stroke="#333" stroke-width="2"/>`;
  diagramaHTML += `<text x="${x+50}" y="${y+30}" font-family="Arial" font-size="12" text-anchor="middle">Bicicleta (${cantidadBicicletas})</text>`;
  
  // Incrementar coordenadas para los componentes
  y += dy;
  x = 50; // Reiniciar x para alinear componentes correctamente
  
  for (let componente in bomBicicleta) {
      x += dx;
      
      // Obtener la cantidad de materiales del componente
      let cantidadComponente = typeof bomBicicleta[componente] === 'object' ? '' : `(${bomBicicleta[componente]})`;
      
      // Dibujar los componentes
      diagramaHTML += `<rect x="${x}" y="${y}" width="120" height="30" fill="#f0f0f0" stroke="#333" stroke-width="1"/>`;
      diagramaHTML += `<text x="${x+60}" y="${y+20}" font-family="Arial" font-size="12" text-anchor="middle">${componente} ${cantidadComponente}</text>`;
      
      // Dibujar líneas desde el cuadro principal a cada componente
      diagramaHTML += `<line x1="100" y1="100" x2="${x+60}" y2="${y}" stroke="#333" stroke-width="1"/>`;
      
      // Verificar si hay subcomponentes
      if (typeof bomBicicleta[componente] === 'object') {
          let subY = y + dy;
          for (let subcomponente in bomBicicleta[componente]) {
              // Obtener la cantidad de materiales del subcomponente
              let cantidadSubcomponente = `(${bomBicicleta[componente][subcomponente]})`;
              
              diagramaHTML += `<rect x="${x}" y="${subY}" width="120" height="30" fill="#f0f0f0" stroke="#333" stroke-width="1"/>`;
              diagramaHTML += `<text x="${x+60}" y="${subY+20}" font-family="Arial" font-size="12" text-anchor="middle">${subcomponente} ${cantidadSubcomponente}</text>`;
              
              // Dibujar líneas desde el componente al subcomponente
              diagramaHTML += `<line x1="${x+60}" y1="${y+30}" x2="${x+60}" y2="${subY}" stroke="#333" stroke-width="1"/>`;
              
              subY += dy;
          }
      }
  }
  
  diagramaHTML += '</svg>';
  
  // Mostrar el diagrama en el elemento con id "diagramaBOM"
  document.getElementById('diagramaBOM').innerHTML = diagramaHTML;
}
