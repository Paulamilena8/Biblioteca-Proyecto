document.addEventListener('DOMContentLoaded', function() {
    

    let todosLosLibros = [];

    let categoriaEscogida=localStorage.getItem("categoria");
    console.log(categoriaEscogida)

    fetch('assets/data/libros.json')
        .then(response => response.json())
        .then(libros => {
            libros.forEach(libro => {
                if(libro.categoria === categoriaEscogida){
                    todosLosLibros.push(libro);
                }
            });
            if(categoriaEscogida === 'todos'){
                todosLosLibros=libros;
            }
            
            mostrarLibros(); 
            titulo();
           
        })
        .catch(error => console.error('Error al cargar libros:', error));

       

       // filtro por todos o categoria -- titulo
        function titulo() {
        
        const tituloCategoria = document.getElementById('titulo-categoria');
            
       if (categoriaEscogida === 'todos') {

            tituloCategoria.textContent = "Todos los libros";
        } else {

            const nombreCategoria = categoriaEscogida.charAt(0).toUpperCase() + categoriaEscogida.slice(1);
            
            if(categoriaEscogida ==='infantil'){

                tituloCategoria.textContent = `Libros infantiles`; 
        }else{
                tituloCategoria.textContent = `Libros de ${nombreCategoria}`; 
            }
            
        }
        
    }

    function mostrarLibros() {
        const contenedor = document.getElementById('cartas-container');
        contenedor.innerHTML = '';

        todosLosLibros.forEach(libro => {
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
function categorias(categoria){
    localStorage.setItem("categoria", categoria);
    window.location.reload();
}