const seguimiento = document.getElementById("seguimiento");
let peliculasEnStorage = [];
let html;

function recuperarPeliculaStorage() {
  peliculasEnStorage = JSON.parse(localStorage.getItem("favoritos"));
  return peliculasEnStorage;
}

// Genera el html con los detalles de las peliculas en seguimiento

function mostrarListaSeguimiento() {
  seguimiento.innerHTML = "";

  recuperarPeliculaStorage(peliculasEnStorage);

  if(peliculasEnStorage == null ){
    seguimiento.innerHTML = `<h3>No hay ninguna pelicula en seguimiento</h3>`;
  }else if (peliculasEnStorage.length == 0) {
    seguimiento.innerHTML = `<h3>No hay ninguna pelicula en seguimiento</h3>`;
  } else {
    peliculasEnStorage.forEach(async (pelicula) => {
      const urlPelicula = `http://www.omdbapi.com/?i=${pelicula}&apikey=22d953e4`;
      resultadoPelicula = await fetch(urlPelicula);
      dataPelicula = await resultadoPelicula.json();

      html = `
            <div class="d-flex justify-content-evenly align-items-center p-3" id="${dataPelicula.imdbID}">                        
            <div  class="poster-container"><img class="poster-seguimiento" src="${dataPelicula.Poster}" alt=""></div>
            <div class="infoPelicula">
                <h2 class="tituloPelicula">${dataPelicula.Title}</h2>
                <p class="released">(${dataPelicula.Released})</p>
                <p class="puntaje">Puntaje:  ${dataPelicula.imdbRating}</p>
                <p class="resumen">${dataPelicula.Plot}</p>
                <p class="diretor">${dataPelicula.Writer}</p>
                <button type="submit" data-id="${dataPelicula.imdbID}" class="btn btn-danger eliminarBtn">Dejar de seguir</button>
            </div>
            </div>
            `   

      seguimiento.innerHTML += html;
      botones = document.querySelectorAll(".eliminarBtn");

      for (const btn of botones) {
        btn.addEventListener("click", eliminarPeliculas);
      }

    });
  }
}

// Elimina las peliculas en seguimiento tanto del localStorage como del html

function eliminarPeliculas(e) {
  const idBtn = e.target.getAttribute("data-id");
  const favoritosFiltrado = peliculasEnStorage.filter((pelicula) => pelicula !== idBtn);
  item = document.getElementById(idBtn);
  Swal.fire({
    text: '¿Está seguro de eliminar la pelicula?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, seguro',
    cancelButtonText: 'No, no quiero',
    backdrop: '#66f4ae55'
  })
    .then((result) => {
        if (result.isConfirmed) {
            localStorage.setItem("favoritos", JSON.stringify(favoritosFiltrado));
            item.remove();
            location.reload()
            
        }
    })

  
  
}

mostrarListaSeguimiento();
