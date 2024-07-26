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
        p.textContent = ` ${alimento.nombre} - $ ${alimento.precio}`;
        button.setAttribute('id', alimento.id);
        
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

    function createSnackElement(snack) {
        const li = document.createElement('div');
        li.classList.add('snack-item'); // Asignar una clase a cada elemento li

        // Crear los elementos html donde tendremos la información
        const button = document.createElement('button');
        button.classList.add('snack-button');
        
        const img = document.createElement('img');
        img.src = snack.foto;
        img.alt = snack.nombre;
        img.classList.add('snack-img');

        const p = document.createElement('p');
        p.classList.add('snack-text');
        p.textContent = `${snack.nombre} - $ ${snack.precio}`;

        button.appendChild(img);
        button.appendChild(p);
        li.appendChild(button);
        return li;
    }







    // Obtener referencias a las listas
    const alimentosList = document.getElementById('alimentos-list');
    const bebidasList = document.getElementById('bebidas-list');
    const snacksList = document.getElementById('snacks-list');

    // Ocultar la lista de bebidas al inicio
    alimentosList.style.display = 'none';
    bebidasList.style.display = 'none';
    snacksList.style.display = 'none';

    // Evento para mostrar alimentos al hacer clic en el botón
    document.getElementById('btn-alimentos').addEventListener('click', () => {
        fetch('/alimentos') // Ruta del endpoint que devuelve alimentos y rutas de imágenes
        .then(response => response.json())
        .then(data => {
            // Mostrar lista de alimentos y ocultar lista de bebidas
            alimentosList.style.display = 'grid';
            bebidasList.style.display = 'none';
            snacksList.style.display = 'none';

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
            snacksList.style.display = 'none';

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

    document.getElementById('btn-snacks').addEventListener('click', () => {
        fetch('/snacks') // Ruta del endpoint que devuelve snacks y rutas de imágenes
        .then(response => response.json())
        .then(data => {
            // Mostrar lista de snacks y ocultar lista de alimentos
            snacksList.style.display = 'grid';
            alimentosList.style.display = 'none';
            bebidasList.style.display = 'none';

            snacksList.innerHTML = ''; // Limpiar la lista antes de agregar nuevos elementos
            data.forEach(snack => {
                const snackElement = createSnackElement(snack);
                snacksList.appendChild(snackElement);
            });
        })
        .catch(error => {
            console.error('Error al obtener las snacks:', error);
        });
    });
    


    

    document.querySelectorAll('.food-button').forEach(button => {
        button.addEventListener('click', () => {
            console.log('hola');
            const foodId = button.getAttribute('id');
            console.log(foodId);
            /* const foodId = button.getAttribute('id');

            console.log(foodId);
            fetch('/insert-food-to-cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: foodId })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data);
                    console.log('Alimento añadido al carrito:', data);
                    // Aquí puedes actualizar la UI si es necesario
                } else {
                    console.error('Error al añadir el alimento al carrito:', data.message);
                }
            })
            .catch(error => {
                console.error('Error al añadir el alimento al carrito:', error);
            }); */
        });
    });
    
});

