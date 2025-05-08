document.addEventListener('DOMContentLoaded', function () {
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    let librosFavoritos = [];
    let librosReservados=[];
    let numeroReservas = usuarioRecuperado.reservas;
    let reservasTotales = usuarioRecuperado.reservas.length;
    
    let devueltos=localStorage.getItem("devueltos");

    document.getElementById("reserva").innerText = numeroReservas.length;
    document.getElementById("prestamo").innerText = reservasTotales;
    document.getElementById("devueltos").innerText = devueltos;
   
  
    // Datos del usuario
    document.getElementById("nombreUsuario").innerHTML ="<strong>Usuario:</strong> " + usuarioRecuperado.nombre;
    document.getElementById("emailUsuario").innerHTML ="<strong>Email:</strong> " + usuarioRecuperado.email;
    document.getElementById("fechaMiembro").innerHTML ="<strong>Fecha de alta:</strong> " + usuarioRecuperado.fecha;
  
    // Petición de libros y filtrado de favoritos
    fetch('assets/data/libros.json')
      .then(response => {
        if (!response.ok) throw new Error('Error en la respuesta');
        return response.json();
      })
      .then(libros => {
        librosFavoritos = libros.filter(libro =>
          usuarioRecuperado.favoritos.includes(libro.id)
        );
        librosReservados = libros.filter(libro =>
            usuarioRecuperado.reservas.includes(libro.id)
          );
        añadirFavoritos(librosFavoritos);
        añadirReservas(librosReservados)
      })
      .catch(error => console.error('Error al cargar los libros:', error));

 


});
//eliminar favoritos
function eliminar(id){
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    let favoritos=usuarioRecuperado.favoritos;
    usuarioRecuperado.favoritos=[];
    for(let i=0;i<favoritos.length;i++){
        if(id != favoritos[i]){
            usuarioRecuperado.favoritos.push(favoritos[i]);
        }
    }
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));
    window.location.reload();
  }

  //eliminar reservas
  function eliminarReserva(id) {
    let usuarioRecuperado = JSON.parse(localStorage.getItem("usuario"));
    let reservas = usuarioRecuperado.reservas;
    usuarioRecuperado.reservas = [];
  
    for (let i = 0; i < reservas.length; i++) {
      if (id != reservas[i]) { 
        usuarioRecuperado.reservas.push(reservas[i]);
      }
    }
    
    localStorage.setItem("usuario", JSON.stringify(usuarioRecuperado));

    let d=localStorage.getItem("devueltos");
    localStorage.setItem("devueltos",parseInt(d)+1);

    window.location.reload();
  }
  
  // Función para pintar favoritos en la tabla
  function añadirFavoritos(favoritos) {
    const contFav = document.getElementById('tablaFav');
    const cuerpoTabla = contFav.querySelector('tbody');
    cuerpoTabla.innerHTML = ''; // limpiar contenido previo

    favoritos.forEach(fav => {
      cuerpoTabla.innerHTML += `
        <tr data-id="${fav.id}">
          <td>${fav.titulo}</td>
          <td>${fav.autor}</td>
          <td>
            <button class="btnEliminar" onclick="eliminar(${fav.id})">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    });
  }

  function añadirReservas(reservas) {
    const contReservas = document.getElementById('tablaReservas');
    const cuerpoTabla = contReservas.querySelector('tbody');
    cuerpoTabla.innerHTML = ''; // limpiar contenido previo
  
    reservas.forEach(reser => {
      cuerpoTabla.innerHTML += `
        <tr data-id="${reser.id}">
          <td>${reser.titulo}</td>
          <td>${reser.autor}</td>
          <td>
            <button class="btnEliminar" onclick="eliminarReserva(${reser.id})">
              Eliminar
            </button>
          </td>
        </tr>
      `;
    });
  }
  
  
  

  
  
  
