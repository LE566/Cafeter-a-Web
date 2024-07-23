document.addEventListener('DOMContentLoaded', () => {
    // Función para crear y devolver un elemento de cada alimento
    function createFoodElement(alimento) {
        const li = document.createElement('div');
        li.classList.add('food-item'); // Asignar una clase a cada elemento li

        // Crear los elementos html donde tendremos la información
        const button = document.createElement('button');
        button.classList.add('food-button');
        
        const img = document.createElement('img');
        img.src = alimento.foto;
        img.alt = alimento.nombre;
        img.classList.add('food-img');

        const p = document.createElement('p');
        p.classList.add('food-text');
        p.textContent = `${alimento.nombre} - $ ${alimento.precio}`;

        button.appendChild(img);
        button.appendChild(p);
        li.appendChild(button);
        return li;
    }

    // Función para crear y devolver un elemento de cada bebida
    function createDrinkElement(bebida) {
        const li = document.createElement('div');
        li.classList.add('drink-item'); // Asignar una clase a cada elemento li

        // Crear los elementos html donde tendremos la información
        const button = document.createElement('button');
        button.classList.add('drink-button');
        
        const img = document.createElement('img');
        img.src = bebida.foto;
        img.alt = bebida.nombre;
        img.classList.add('drink-img');

        const p = document.createElement('p');
        p.classList.add('drink-text');
        p.textContent = `${bebida.nombre} - $ ${bebida.precio}`;

        button.appendChild(img);
        button.appendChild(p);
        li.appendChild(button);
        return li;
    }

    // Obtener referencias a las listas
    const alimentosList = document.getElementById('alimentos-list');
    const bebidasList = document.getElementById('bebidas-list');

    // Ocultar la lista de bebidas al inicio
    bebidasList.style.display = 'none';

    // Evento para mostrar alimentos al hacer clic en el botón
    document.getElementById('btn-alimentos').addEventListener('click', () => {
        fetch('/alimentos') // Ruta del endpoint que devuelve alimentos y rutas de imágenes
        .then(response => response.json())
        .then(data => {
            // Mostrar lista de alimentos y ocultar lista de bebidas
            alimentosList.style.display = 'grid';
            bebidasList.style.display = 'none';

            alimentosList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
            data.forEach(alimento => {
                const foodElement = createFoodElement(alimento);
                alimentosList.appendChild(foodElement);
            });
        })
        .catch(error => {
            console.error('Error al obtener los alimentos:', error);
        });
    });

    // Evento para mostrar bebidas al hacer clic en el botón
    document.getElementById('btn-bebidas').addEventListener('click', () => {
        fetch('/bebidas') // Ruta del endpoint que devuelve bebidas y rutas de imágenes
        .then(response => response.json())
        .then(data => {
            // Mostrar lista de bebidas y ocultar lista de alimentos
            bebidasList.style.display = 'grid';
            alimentosList.style.display = 'none';

            bebidasList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
            data.forEach(bebida => {
                const drinkElement = createDrinkElement(bebida);
                bebidasList.appendChild(drinkElement);
            });
        })
        .catch(error => {
            console.error('Error al obtener las bebidas:', error);
        });
    });
});
