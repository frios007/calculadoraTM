
function calcularBOM() {
    // Obtener la cantidad de bicicletas ingresada por el usuario
    let cantidadBicicletas = parseInt(document.getElementById('cantidadBicicletas').value);
    
    // Estructura del BOM de la bicicleta
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
    
    // Generar HTML para mostrar el resultado del BOM
    let resultadoHTML = '<h2>Lista de Materiales (BOM) para ' + cantidadBicicletas + ' Bicicletas:</h2>';
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
    
    // Mostrar el resultado en el elemento con id "resultadoBOM"
    document.getElementById('resultadoBOM').innerHTML = resultadoHTML;
    
    // Generar diagrama visual del BOM (ejemplo simplificado)
    let diagramaHTML = '<h2>Diagrama Visual del BOM</h2>';
    diagramaHTML += '<svg width="600" height="400">';
    
    // Cuadro principal
    diagramaHTML += '<rect x="50" y="50" width="100" height="100" fill="#f0f0f0" stroke="#333" stroke-width="2"/>';
    diagramaHTML += '<text x="100" y="120" font-family="Arial" font-size="12" text-anchor="middle">Bicicleta (' + cantidadBicicletas + ')</text>';
    
    // Componentes
    let y = 180;
    for (let componente in bomBicicleta) {
      let cantidad = bomBicicleta[componente];
      diagramaHTML += '<rect x="200" y="' + y + '" width="120" height="30" fill="#f0f0f0" stroke="#333" stroke-width="1"/>';
      diagramaHTML += '<text x="260" y="' + (y + 20) + '" font-family="Arial" font-size="12">' + componente + ' (' + cantidad + ')</text>';
      y += 40;
    }
    
    diagramaHTML += '</svg>';
    
    // Mostrar el diagrama en el elemento con id "diagramaBOM"
    document.getElementById('diagramaBOM').innerHTML = diagramaHTML;
  }
  