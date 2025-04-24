document.addEventListener('DOMContentLoaded', function() {

    let libroId = localStorage.getItem('libroSeleccionado');
    console.log(libroId);

    let titulo;
    let descripcion;
    let imagen;
    let autor;
    let categoria;
    let cantidad;    



    fetch('assets/data/libros.json').then(objeto => {
        if(!objeto.ok){
            throw new Error('Error en la respuesta');
        }
        return objeto.json()
    }).then(libros => {

        libros.forEach(libro => {
            if(libro.id === libroId ){
                titulo=libro.titulo;
                descripcion=libro.descripcion;
                imagen=libro.imagen;
                autor=libro.autor;
                categoria=libro.categoria;
                cantidad=libro.cantidad;
                
            }
        });
        
        botones();
        detalles();
        
    });
    console.log(id);

    function botones(){
        //Botones de favorito y reserva
        document.getElementById('botones').innerHTML+=`  
        <div>
        <a href="#" class="btn btn-primary" style="padding: 12px" onclick="favorito('${libroId}','${titulo}')"><i class="bi bi-bookmark-heart-fill"></i>
        </a>
        <a href="#" class="btn btn-secondary" onclick="reservar('${libroId}','${titulo}')">Reservar</a>
        </div>
        `;
     }

 
    


    function detalles(){
        document.getElementById('titulo').innerText=titulo;
        document.getElementById('descripcion').innerText=descripcion;
        document.getElementById('autor').innerText=autor;
        document.getElementById('imagen').innerHTML=`
            <img src="${imagen}" alt="banner" class="banner-image">
        `
        document.getElementById('categoria').innerText=categoria;
        document.getElementById('categoria').setAttribute('onclick', `categorias('${categoria.toLowerCase()}')`);
        //Editar cantidad de libros disponibles
    
         let usuario = JSON.parse(localStorage.getItem("usuario"));
         if (usuario.reservas.includes(libroId)){
            cantidad= cantidad-1;
           
         }
         document.getElementById("unidades").innerHTML = cantidad;
         
    };

   
    
});





function categorias(categoria){
    localStorage.setItem("categoria", categoria);
    localStorage.setItem("usuario",usuario)
    window.location.href = "categorias.html";
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
              <button style="width: 100px;" type="button" class="btn btn-primary" data-bs-dismiss="modal" onclick='aceptar()'>Aceptar</button>
            </div>
          </div>
        </div>
      </div>
    `;  
    // Mostrar el modal automáticamente
    let myModal = new bootstrap.Modal(document.getElementById('customModal'));
    myModal.show();
  }
  function aceptar() {
    window.location.reload();
  }