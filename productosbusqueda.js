let products = [];

const searchBtn = document.getElementById('search-btn');
const searchBox = document.getElementById('search-box');
const searchInput = document.getElementById('search-input');
const clearBtn = document.getElementById('clear-btn');
const closeBtn = document.getElementById('close-btn');
const productList = document.getElementById('product-list');
const submitSearch = document.getElementById('submit-search');

// Cargar productos desde el archivo productos.json
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        products = data;  // Asignar los productos cargados a la variable global products
    })
    .catch(error => {
        console.error('Error al cargar productos:', error);
    });

// Mostrar el buscador al hacer clic en el botón de búsqueda
searchBtn.addEventListener('click', () => {
    searchBox.classList.toggle('hidden');
    searchInput.focus();
});

// Cerrar el buscador
closeBtn.addEventListener('click', () => {
    searchBox.classList.add('hidden');
    clearBtn.classList.add('hidden');
    searchInput.value = '';
    productList.innerHTML = ''; // Limpiar el contenedor de productos
});

// Actualizar la lista de productos mientras se escribe
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    clearBtn.classList.toggle('hidden', query.length === 0);
    
    productList.innerHTML = ''; // Limpiar la lista existente

    if (query) { // Solo realizar la búsqueda si hay texto en el campo de búsqueda
        const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));

        if (filteredProducts.length > 0) {
            // Solo agregar el título si hay productos filtrados
            const title = document.createElement('h2'); // Crear un nuevo elemento de título
            title.classList.add('product-list-title'); // Agregar clase para estilo del título
            title.textContent = 'PRODUCTOS'; // Establecer el texto del título
            productList.appendChild(title); // Agregar el título al listado de productos
        }

        filteredProducts.forEach(product => {
            const productItem = document.createElement('div');
            productItem.classList.add('product-item'); // Agregar clase para estilo del producto

            productItem.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="product-image" />
                <a href="${product.url}" class="product-name">${product.name}</a>
            `;
            productList.appendChild(productItem);
        });
    }
});

// Limpiar el campo de búsqueda
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    productList.innerHTML = ''; // Limpiar el contenedor de productos
});

// Redirigir a otra página de resultados de búsqueda
submitSearch.addEventListener('click', () => {
    const query = searchInput.value;
    if (query) {
        window.location.href = `pagina_resultados.html?query=${encodeURIComponent(query)}`; // Redirigir a la página de resultados
    }
});
