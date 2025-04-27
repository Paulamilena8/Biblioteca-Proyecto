document.addEventListener('DOMContentLoaded', function() {

    
    //declarar los arrays
    let titulos = [];
    let descripciones = [];
    let imagenesInicio = [];
    let imagenes=[];
    let autores=[];
    let ids=[];

    let usuario=null;

    usuario = JSON.parse(localStorage.getItem("usuario"));

    if(usuario==null){
        usuario = {
            favoritos : [],
            reservas : [],
            nombre: "",
            email:"",
            fecha:"Enero 2025",
            devueltos:"",
        };    
    }

    
    localStorage.setItem("usuario", JSON.stringify(usuario));
    if(usuario.nombre=="" ){
    login();
    }
    
    
    
    //obtener el json 
    fetch('assets/data/libros.json').then(objeto => {
        if(!objeto.ok){
            throw new Error('Error en la respuesta');
        }
        return objeto.json()
    }).then(libros => {
        // para ver el json entero y sus indices
        console.log(libros);

        libros.forEach(libro => {
        // para ver el objeto del json
            console.log(libro);
            titulos.push(libro.titulo);
            descripciones.push(libro.descripcion);
            imagenesInicio.push(libro.imagenInicio);
            imagenes.push(libro.imagen);
            autores.push(libro.autor);
            ids.push(libro.id);
        });
        //iniciamos la funcion de rellenar el carousel
        carousel();
        recomendaciones();
    });


    //añadimos el html
    function carousel(){
        // para añadir un numero x de html
        let contenedor = document.getElementById('carousel-inner');
        let botones = document.getElementById('carousel-indicators');
        

        for(let i=0;i<5;i++){
            let titulo=titulos[i];
            let desc=descripciones[i];
            let imagenURL=imagenesInicio[i];

            let activo="carousel-item";
            if(i==0){
                activo="carousel-item active";
            }
            contenedor.innerHTML+=`
            <div class="${activo}">
              <div class="imagen-inicio-container">
                <img src="${imagenURL}" class="d-block" alt="imagen de ${titulo}" tiltle="imagen de ${titulo}" >
              </div>
              <div class="carousel-caption d-none d-md-block">
                <h5>${titulo}</h5>
                <p>${desc}</p>
              </div>
            </div>`;

            //generamos los botones para ajustatrlos segun bootsrtap
            let numero=i+1;
            if(i==0){
                botones.innerHTML+=`<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${numero}"></button>`;
            }else{
                botones.innerHTML+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${numero}"></button>`;
            }
        }
    };

    function recomendaciones(){

        let contenedorCartas =document.getElementById('cartas-container');

        for(let i=0;i<5;i++){
            let tituloCarta=titulos[i];
            let autorCarta=autores[i];
            let imagenURLCarta=imagenes[i];
            let id=ids[i];

            console.log("cartas" +tituloCarta, autorCarta, imagenURLCarta);


            contenedorCartas.innerHTML+=`      
            <div class="grid-item">
                <div class="card">
                <div class="contenedor-imagen" onclick="verDetalleLibro('${id}')">
                <img src="${imagenURLCarta}" class="card-img-top" alt="imagen del libro ${tituloCarta}" title="imagen del libro ${tituloCarta}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${tituloCarta}</h5>
                    <p class="card-text"><em>${autorCarta}</em></p>
                    <a href="#" class="btn btn-primary" onclick="favorito('${id}','${tituloCarta}')"><i class="bi bi-bookmark-heart-fill"></i>
                    </a>
                    <a href="#" class="btn btn-secondary" onclick="reservar('${id}','${tituloCarta}')">Reservar</a>
                </div>
                </div>
            </div>`;
        }
        
    };

    /*preguntas frecuentes- expandible */

    document.querySelectorAll('.expandible').forEach(article => {
      const button = article.querySelector('.mas');
      button.addEventListener('click', () => {
        article.classList.toggle('expanded');
      });
    });
});

function categorias(categoria){
    localStorage.setItem("categoria", categoria);
    window.location.href = "categorias.html";
}

function verDetalleLibro(id) {
    localStorage.setItem("libroSeleccionado", id);
    window.location.href = "libro.html";
    
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

  function login(){
        document.body.innerHTML += `
          <div class="modal fade" id="customModal" tabindex="-1" aria-labelledby="customModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="customModalLabel">Inicio de Sesión</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
                </div>
                <div class="modal-body">
                  <form id="loginForm">
                    <div class="mb-3">
                      <label for="userName" class="form-label">Nombre</label>
                      <input type="text" class="form-control" id="nombreUsuario" required placeholder="Ingresa tu nombre">
                    </div>
                    <div class="mb-3">
                      <label for="userEmail" class="form-label">Correo electrónico</label>
                      <input type="email" class="form-control" id="emailUsuario" required placeholder="Ingresa tu correo">
                    </div>
                  </form>
                  <div id="resultado"></div>
                </div>
                <div class="modal-footer">
                  <button style="width: 100px;" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                  <button style="width: 100px;" type="submit" class="btn btn-primary" onclick="guardarDatos()">Guardar</button>
                </div>
              </div>
            </div>
          </div>
        `;

  let myModal = new bootstrap.Modal(document.getElementById('customModal'));
  myModal.show();
    
  }
  function guardarDatos() {
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    let nombre =document.getElementById("nombreUsuario").value;
    let email =document.getElementById("emailUsuario").value;

    if(nombre=="" || email==""){
        document.getElementById("resultado").innerHTML=`<div class="alert alert-danger" role="alert">Por favor, completa todos los campos.</div>`; 
    }
    
    usuarioRecuperado.nombre=nombre;
    usuarioRecuperado.email=email;
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));
    let myModal = bootstrap.Modal.getInstance(document.getElementById('customModal'));
    myModal.hide();
}
  


  