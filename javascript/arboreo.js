// Estructura de datos para el MRP
const mrpData = {
    M: {
        cantidad: 0,
        componentes: {
            N: { cantidad: 2, componentes: { R: { cantidad: 2, componentes: { S: { cantidad: 1 }, T: { cantidad: 3 } } }, S: { cantidad: 4 } } },
            P: { cantidad: 3, componentes: { T: { cantidad: 2 }, U: { cantidad: 4 } } }
        }
    }
};

// Función para calcular MRP
function calculateMRP() {
    const quantityM = parseInt(document.getElementById('quantityM').value);
    const results = calculateComponents(quantityM, mrpData.M);
    displayResults(results);
}

// Función recursiva para calcular los componentes
function calculateComponents(quantity, data) {
    const result = {};
    for (const component in data.componentes) {
        if (data.componentes.hasOwnProperty(component)) {
            const componentData = data.componentes[component];
            const totalQuantity = quantity * componentData.cantidad;
            result[component] = result[component] ? result[component] + totalQuantity : totalQuantity;
            if (componentData.componentes) {
                const subResults = calculateComponents(totalQuantity, { componentes: componentData.componentes });
                for (const subComponent in subResults) {
                    result[subComponent] = result[subComponent] ? result[subComponent] + subResults[subComponent] : subResults[subComponent];
                }
            }
        }
    }
    return result;
}

// Función para mostrar los resultados en un diagrama de árbol
function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    const tree = createTree('M', parseInt(document.getElementById('quantityM').value), mrpData.M);
    resultsDiv.appendChild(tree);
}

// Función recursiva para crear el diagrama de árbol en forma de lista
function createTree(name, quantity, data) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = `${name} (${quantity})`;
    li.appendChild(a);
    if (data.componentes) {
        const keys = Object.keys(data.componentes);
        for (let i = 0; i < keys.length; i++) {
            const component = keys[i];
            const componentData = data.componentes[component];
            const totalQuantity = quantity * componentData.cantidad;
            const subTree = createTree(component, totalQuantity, componentData);
            li.appendChild(subTree);
        }
    }
    ul.appendChild(li);
    return ul;
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    calculateMRP();
});
