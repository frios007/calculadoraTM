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
  let totalComponentes = Math.round(
      (bomMesa['Patas'] + bomMesa['Superficie'] + bomMesa['Tornillos'] +
       bomMesa['Tuercas'] + bomMesa['Tornillos para la superficie']) / 5
  );

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
  diagramaHTML += '<svg width="400" height="300">';
  
  // Coordenadas iniciales para dibujar los componentes
  let y = 50;
  
  // Dibujar cada componente con su cantidad
  for (let componente in bomMesa) {
      let cantidad = bomMesa[componente];
      diagramaHTML += '<rect x="50" y="' + y + '" width="100" height="30" fill="#f0f0f0" stroke="#333" stroke-width="1"/>';
      diagramaHTML += '<text x="60" y="' + (y + 20) + '" font-family="Arial" font-size="12">' + componente + ' (' + cantidad + ')</text>';
      y += 40;
  }
  
  diagramaHTML += '</svg>';
  
  // Mostrar el diagrama en el elemento con id "diagramaBOM"
  document.getElementById('diagramaBOM').innerHTML = diagramaHTML;
}
