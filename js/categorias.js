document.addEventListener('DOMContentLoaded', function() {
    let todosLosLibros = [];

    fetch('assets/data/libros.json')
        .then(response => response.json())
        .then(libros => {

            //categorias.html muestra todos los libros por defecto
            todosLosLibros = libros;
            mostrarLibros(libros); 
            configurarFiltros();
        })
        .catch(error => console.error('Error al cargar libros:', error));

        // se filtra por clase del menu y se define cada categoria 
    function configurarFiltros() {
        const links = document.querySelectorAll('.dropdown-item[info-categoria]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Evita la navegación
                const categoria = this.getAttribute('info-categoria');
                filtrarLibros(categoria);
            });
        });
    }

    // filtro por todos o categoria -- titulo
    function filtrarLibros(categoria) {
        let librosFiltrados;
        const tituloCategoria = document.getElementById('titulo-categoria');
        
        if (categoria === 'todos') {
            librosFiltrados = todosLosLibros; 
            tituloCategoria.textContent = "Todos los libros";
        } else {

            librosFiltrados = todosLosLibros.filter(libro => libro.categoria === categoria);
            
            const nombreCategoria = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            tituloCategoria.textContent = `Libros de ${nombreCategoria}`; // INFANTIL FALLA!!! ?
        }
        
        mostrarLibros(librosFiltrados);
    }

    function mostrarLibros(libros) {
        const contenedor = document.getElementById('cartas-container');
        contenedor.innerHTML = '';

        libros.forEach(libro => {
            contenedor.innerHTML += `
                <div class="grid-item" onclick="verDetalleLibro('${libro.id}')">
                    <div class="card">
                        <div class="contenedor-imagen">
                            <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${libro.titulo}</h5>
                            <p class="card-text"><em>${libro.autor}</em></p>
                            <a href="#" class="btn btn-primary"><i class="bi bi-bookmark-heart-fill"></i></a>
                            <a href="#" class="btn btn-secondary">Reservar</a>
                        </div>
                    </div>
                </div>
            `;
        });
    }
});

function verDetalleLibro(id) {
    localStorage.setItem("libroSeleccionado", id);
    window.location.href = "libro.html";
}