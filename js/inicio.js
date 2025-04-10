document.addEventListener('DOMContentLoaded', function() {

    
    //declarar los arrays
    let titulos = [];
    let descripciones = [];
    let imagenesInicio = [];
    let imagenes=[];
    let autores=[];
    let ids=[];

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
            <div class="grid-item" onclick="verDetalleLibro('${id}')">
                <div class="card">
                <div class="contenedor-imagen">
                <img src="${imagenURLCarta}" class="card-img-top" alt="imagen del libro ${tituloCarta}" title="imagen del libro ${tituloCarta}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${tituloCarta}</h5>
                    <p class="card-text"><em>${autorCarta}</em></p>
                    <a href="#" class="btn btn-primary" ><i class="bi bi-bookmark-heart-fill"></i>
                    </a>
                    <a href="#" class="btn btn-secondary">Reservar</a>
                </div>
                </div>
            </div>`;
        }
        
    };
});

function verDetalleLibro(id) {
    localStorage.setItem("libroSeleccionado", id);
    window.location.href = "libro.html";
    
  }