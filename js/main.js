const usuario = [{
    nombre: 'Fran',
    mail: 'fran@gmail.com',
    pass: 'Password1'
}]

const mailLogin = document.getElementById('inputEmail1');
passLogin = document.getElementById('inputPassword');
checkLogin = document.getElementById('inputCheck');
btnLogin = document.getElementById('login');
btnLogout = document.getElementById('logout');
toggles = document.querySelectorAll('.toggles');
msgError = document.querySelectorAll('.form-text');


// Valida si el usuario ya registrado en la "DB" ingreso los datos correctamente

function validarUsuario() {

    if (mailLogin.value === usuario[0].mail && passLogin.value === usuario[0].pass) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout("cambiarInfo(toggles, 'd-none')", 2000);
        errorLogin.innerHTML = ``;
    } else {
        errorLogin.innerHTML = `El usuario y/o contraseña son inválidos`;
    }
}

// Valida todos los campos del formulario: nombre, mail y contraseñ

function validarUsuarioNuevo() {

    const errorUsuario = document.getElementById('errorUsuario'),
        errorMail = document.getElementById('errorMail'),
        errorPass = document.getElementById('errorPass');

    let formValido;

    if (nombreUsuario.value.length >= 4) {
        formValido = true;
    } else {
        formValido = false;
        errorUsuario.classList.replace('d-none', 'd-block')
    }

    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailLoginNuevo.value))) {
        formValido = false;
        errorMail.classList.replace('d-none', 'd-block')
    } else {
        formValido = true;
    }

    if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/.test(passLoginNuevo.value))) {
        formValido = false;
        errorPass.classList.replace('d-none', 'd-block')
    } else {
        formValido = true;

    }

    if (formValido == true) {

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Usuario creado con exito!',
            showConfirmButton: false,
            timer: 1500
        })
        setTimeout("cambiarInfo(toggles, 'd-none')", 2000);
        crearUsuario();
        guardarEnStorage(usuario, localStorage);
        saludar(recuperarUsuario(localStorage));
    }

}

// Cambia la vista entre el login y vista principal

function cambiarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

// Guardar el usuario en el storage

function guardarEnStorage(DB, storage) {
    const user = {
        'nombre': usuario[0].nombre,
        'mail': usuario[0].mail,
    }

    storage.setItem('usuario', JSON.stringify(user));
};

// Recupera el usuario del storage

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}

// Crea el nuevo usuario

function crearUsuario() {
    usuario.unshift({ 'nombre': nombreUsuario.value, 'mail': mailLoginNuevo.value });
}

// Muestra el nombre del usuario en el navbar

function saludar(usuario) {

    const saludo = document.getElementById('saludo');

    saludo.innerHTML = '';
    mostrarUsuario = `Bienvenido/a ${usuario.nombre}`;
    saludo.innerHTML += mostrarUsuario;
}

// Borra los datos del usario del storage

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

// Valida si el usuario esta logueado

function estaLogueado(usuario) {

    if (usuario) {
        saludar(usuario);
        cambiarInfo(toggles, 'd-none');
    }
}


btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    validarUsuario();

    if (checkLogin.checked) {
        guardarEnStorage(usuario, localStorage);
        saludar(recuperarUsuario(localStorage));
    } else {
        guardarEnStorage(usuario, sessionStorage);
        saludar(recuperarUsuario(sessionStorage));
    }

});


registro.addEventListener('click', (e) => {
    e.preventDefault();

    const formulario = document.getElementById('registroLogin');

    document.getElementById('formLogin').className += ' d-none';

    let html = `<form class="container formulario d-flex flex-column align-items-center">
                        <div class="mb-3">
                            <label for="validationCustom01" class="form-label">Nombre</label>
                            <input type="text" class="form-control" id="nombre" aria-describedby="emailHelp" required>
                            <div id="errorUsuario" class="form-text d-none"><p class="msgError">El usuario es incorrecto. Debe contener 4 caracteres como minimo</p></div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputEmail1" class="form-label">Mail</label>
                            <input type="email" class="form-control" id="inputEmailNuevo" aria-describedby="emailHelp">
                            <div id="errorMail" class="form-text d-none"><p class="msgError">Ingrese un mail valido (ejemplo@mail.com)</p></div>
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                            <input type="password" class="form-control" id="inputPasswordNuevo">
                            <div id="errorPass" class="form-text d-none"><p class="msgError">La constraseña es incorrecta. Debe contener al menos 1 mayuscula, 1 numero y 8 caracteres como mínimo</p></div>
                        </div>
                        <button type="submit" class="btn btn-primary" id="registrarme">Registrame</button>
                    </form>`;

    formulario.innerHTML += html;

    const btnRegistrarme = document.getElementById('registrarme');
    nombreUsuario = document.getElementById('nombre');
    mailLoginNuevo = document.getElementById('inputEmailNuevo');
    passLoginNuevo = document.getElementById('inputPasswordNuevo');

    btnRegistrarme.addEventListener('click', (e) => {
        e.preventDefault();
        validarUsuarioNuevo();
    });


});

btnLogout.addEventListener('click', () => {
    borrarDatos();
    cambiarInfo(toggles, 'd-none');
});

window.onload = () => estaLogueado(recuperarUsuario(localStorage));


/////////////////////////////////  FIN LOGIN     /////////////////////////////////


const detallePelicula = document.getElementById('detallePelicula');
inputBuscador = document.getElementById('buscar');
contenedorLista = document.getElementById('busqueda-lista');
listaBusqueda = document.getElementById('busqueda-lista')
seguimiento = document.getElementById('seguimiento');
seguimientoLink = document.getElementById('seguimientoLink');

let botones = []; 
let btnID;
let busqueda;
let movies = [];
let peliculasEnStorage = [];
let peliculaFavorita;



// Trae las peliculas de la API

async function cargarPeliculas(busqueda) {

    const url = `http://www.omdbapi.com/?s=${busqueda}&apikey=22d953e4`
    const resultado = await fetch(url)
    const data = await resultado.json()
    if (data.Response == "True") cargarLista(data.Search)
}

// Input buscador

function buscar() {
    busqueda = (inputBuscador.value).trim();

    if (busqueda.length > 0) {
        listaBusqueda.classList.remove('d-none');
        cargarLista(movies);
    } else {
        listaBusqueda.classList.add('d-none');
    }
}

// Carga la lista de peliculas segun lo ingresado en el input de busqueda

function cargarLista(movies) {

    contenedorLista.innerHTML = '';

    for (let id = 0; id < movies.length; id++) {

        let idPelicula = movies[id].imdbID;


        if (movies[id].Poster === 'N/A') {
            movies[id].Poster = './images/noavailable.jpg'
        }

        let html = `                        
                <li>
                    <a id="${idPelicula}" class="d-flex lista align-items-center" href="">
                        <div>
                            <img class="busqueda-thumbnail" src="${movies[id].Poster}" alt="">
                         </div>
                        <div class="busqueda-detalle">
                            <h2 class="busqueda-titulo">${movies[id].Title}</h2>
                            <p class="busqueda-anio">${movies[id].Year}</p>
                        </div>
                    </a>
                </li>
            `
        contenedorLista.innerHTML += html;



    }

    cargarDetalle();

}



// Trae la info de la pelicula seleccionada para luego crear el detalle

function cargarDetalle() {


    let itemSeleccionado = document.querySelectorAll('.lista');


    itemSeleccionado.forEach(pelicula => {

        pelicula.addEventListener('click', async (e) => {
            e.preventDefault();
            listaBusqueda.classList.add('d-none');
            inputBuscador.value = '';
            const urlPelicula = `http://www.omdbapi.com/?i=${pelicula.id}&apikey=22d953e4`
            resultadoPelicula = await fetch(urlPelicula)
            dataPelicula = await resultadoPelicula.json()
            mostrarDetalles(dataPelicula);


        });

    });

} 


// Crea el html con la info de la pelicula seleccionada de la lista

function mostrarDetalles(detalle) {

    detallePelicula.classList.remove('d-none')

    if (detalle.Poster === 'N/A') {
        detalle.Poster = './images/noavailable.jpg'
    }

    let html = `                        
    <div  class="poster-container"><img class="poster" src="${detalle.Poster}" alt=""></div>
    <div class="infoPelicula">
        <h2  id="${detalle.imdbID}" class="tituloPelicula">${detalle.Title}<span class="released">(${detalle.Released})</span></h2>
        <p class="genero">${detalle.Genre}<span class="duracion">  ${detalle.Runtime}</span></p>
        <p class="puntaje">Puntaje:  ${detalle.imdbRating}</p>
        <h5 class="subtitulo">Resumen:<h5>
        <p class="resumen">${detalle.Plot}</p>
        <h5 class="subtitulo">Director:<h5>
        <p class="diretor">${detalle.Writer}</p>
        <h5 class="subtitulo">Reparto:<h5>
        <p class="reparto">${detalle.Actors}</p>
        <button type="submit" class="btn btn-primary" id="favorito">Agregar a seguimiento</button>
    </div>
    `

    detallePelicula.innerHTML = html;

    let favoritoBtn = document.getElementById('favorito')
    favoritoBtn.addEventListener('click', (e) => {

        guardarFavoritos(detalle)
        seguimientoTostify()
    });

}



inputBuscador.addEventListener('keyup', () => {

    buscar();
    if (busqueda.length < 3) {
        buscar();
    } else {
        cargarPeliculas(busqueda);
        cargarLista(movies);
    }
});


// Guarda el ID de la peliculas favoritas en en el LocalStorage

function guardarFavoritos(detalle) {

    peliculaFavorita = {
        peliculaId: detalle.imdbID,
    };

    peliculasEnStorage = JSON.parse(localStorage.getItem("favoritos"));

    if (peliculasEnStorage == null) {
        peliculasEnStorage = [];
    }

    if (peliculasEnStorage.indexOf(peliculaFavorita.peliculaId) === -1) {
        peliculasEnStorage.push(peliculaFavorita.peliculaId);
        localStorage.setItem("favoritos", JSON.stringify(peliculasEnStorage));
    }

};

// Recupera las peliculas en seguimiento del storage

function recuperarPeliculaStorage() {

    peliculasEnStorage = JSON.parse(localStorage.getItem('favoritos'));
    return peliculasEnStorage;
}



function seguimientoTostify(){

Toastify({
    text: "Agregada a seguimiento",
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function(){} // Callback after click
  }).showToast();

}



