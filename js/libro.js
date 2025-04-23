document.addEventListener('DOMContentLoaded', function() {

    let libroId = localStorage.getItem('libroSeleccionado');
    console.log(libroId);

    let titulo;
    let descripcion;
    let imagen;
    let autor;
    let id;
    let categoria;
    
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
                id=libro.id;
                categoria=libro.categoria;
            }
        });
        detalles();
    });

    function detalles(){
        document.getElementById('titulo').innerText=titulo;
        document.getElementById('descripcion').innerText=descripcion;
        document.getElementById('autor').innerText=autor;
        document.getElementById('imagen').innerHTML=`
            <img src="${imagen}" alt="banner" class="banner-image">
        `
        document.getElementById('categoria').innerText="Categoria: "+categoria;
    };

    function categorias(categoria){
        localStorage.setItem("categoria", categoria);
        window.location.href = "categorias.html";
    }
    
});