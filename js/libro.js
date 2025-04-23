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
        <a href="#" class="btn btn-primary" style="padding: 12px" onclick="favorito('${libroId}')"><i class="bi bi-bookmark-heart-fill"></i>
        </a>
        <a href="#" class="btn btn-secondary" onclick="reservar('${libroId}')">Reservar</a>
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
        document.getElementById('categoria').innerText="Categoria: "+categoria;

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

function favorito(id) {
    
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    usuarioRecuperado.favoritos.push(id);
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));
    console.log(usuarioRecuperado);
  }


  
  function reservar(id) {
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    usuarioRecuperado.reservas.push(id);
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));
    console.log(usuarioRecuperado);
    window.location.reload();

  }