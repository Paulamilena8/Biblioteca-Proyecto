document.addEventListener('DOMContentLoaded', function() {

    
    //declarar los arrays
    let titulos = [];
    let descripciones = [];
    let imagenes = [];

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
            imagenes.push(libro.imagen);
        });
        //iniciamos la funcion de rellenar el carousel
        carousel();
    });


    //añadimos el html
    function carousel(){
        // para añadir un numero x de html
        let contenedor = document.getElementById('carousel-inner');
        let botones = document.getElementById('carousel-indicators');
        

        for(let i=0;i<5;i++){
            let titulo=titulos[i];
            let desc=descripciones[i];
            let imagenURL=imagenes[i];
            console.log(titulo, desc, imagenURL);

            let activo="carousel-item";
            if(i==0){
                activo="carousel-item active";
            }
            contenedor.innerHTML+=`
            <div class="${activo}">
              <img src="${imagenURL}" class="d-block w-100" alt="imagen de ${titulo}" tiltle="imagen de ${titulo}" >
              <div class="carousel-caption d-none d-md-block">
                <h5>${titulo}</h5>
                <p>${desc}</p>
              </div>
            </div>`;

            let numero=i+1;
            if(i==0){
                botones.innerHTML+=`<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${numero}"></button>`;
            }else{
                botones.innerHTML+=`<button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${i}" aria-label="Slide ${numero}"></button>`;
            }
        }
    };


});
