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
                <div class="grid-item">
                    <div class="card">
                        <div class="contenedor-imagen" onclick="verDetalleLibro('${libro.id}')">
                            <img src="${libro.imagen}" class="card-img-top" alt="${libro.titulo}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${libro.titulo}</h5>
                            <p class="card-text"><em>${libro.autor}</em></p>
                            <a href="#" class="btn btn-primary" onclick="favorito('${libro.id}','${libro.titulo}')"><i class="bi bi-bookmark-heart-fill"></i>
                    </a>
                    <a href="#" class="btn btn-secondary" onclick="reservar('${libro.id}','${libro.titulo}')">Reservar</a>
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

function favorito(id,titulo) {
    
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioRecuperado.favoritos.includes(id)){
        usuarioRecuperado.favoritos.push(id);
       
     }
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));
    console.log(usuarioRecuperado);
    alerta(titulo);
  }


  
  function reservar(id,titulo) {
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    if (!usuarioRecuperado.reservas.includes(id)){
        usuarioRecuperado.reservas.push(id);
       
     }
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));
    console.log(usuarioRecuperado);
    alerta(titulo);
  }

  function alerta(titulo) {
    document.body.innerHTML += `
      <div class="modal fade" id="customModal" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="customModalLabel">Libro Añadido</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              Has Añadido el libro ${titulo}.
            </div>
            <div class="modal-footer">
              <button style="width: 100px;" type="button" class="btn btn-primary" data-bs-dismiss="modal">Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    `;  
    // Mostrar el modal automáticamente
    let myModal = new bootstrap.Modal(document.getElementById('customModal'));
    myModal.show();
  }
