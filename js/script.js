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


function validarUsuario() {

    if (mailLogin.value === usuario[0].mail && passLogin.value === usuario[0].pass) {
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Bienvenido!',
            showConfirmButton: false,
            timer: 1500
          })
        setTimeout( "cambiarInfo(toggles, 'd-none')", 2000);
        errorLogin.innerHTML = ``;
    } else {
        errorLogin.innerHTML = `El usuario y/o contraseña son inválidos`;
    }
}



function validarUsuarioNuevo() {

    const errorUsuario =  document.getElementById('errorUsuario'),
          errorMail =  document.getElementById('errorMail'),
          errorPass =  document.getElementById('errorPass');

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

    if(formValido == true){

        Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Usuario creado con exito!',
            showConfirmButton: false,
            timer: 1500
          })
        setTimeout( "cambiarInfo(toggles, 'd-none')", 2000);
        crearUsuario();
        guardarEnStorage(usuario, localStorage);
        saludar(recuperarUsuario(localStorage));
    }

}

function cambiarInfo(array, clase) {
    array.forEach(element => {
        element.classList.toggle(clase);
    });
}

function guardarEnStorage(DB, storage) {
    const user = {
        'nombre': usuario[0].nombre,
        'mail': usuario[0].mail,
        'pass': usuario[0].pass
    }

    storage.setItem('usuario', JSON.stringify(user));
};

function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem('usuario'));
    return usuarioEnStorage;
}


function crearUsuario() {
    usuario.unshift({ 'nombre': nombreUsuario.value, 'mail': mailLoginNuevo.value, 'pass': passLoginNuevo.value });
}


function saludar(usuario) {

    const saludo = document.getElementById('saludo');

    saludo.innerHTML = '';
    mostrarUsuario = `Bienvenido/a ${usuario.nombre}`;
    saludo.innerHTML += mostrarUsuario;
}

function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}


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

    let html = `<form class="container">
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



class Serie {

    constructor(title, author, year, genre, rating, episodes, platform, id) {
        this.title = title;
        this.author = author;
        this.year = parseInt(year);
        this.genre = genre;
        this.rating = parseInt(rating);
        this.episodes = parseInt(episodes);
        this.platform = platform;
        this.id = id;
    }

}

const series = [
    new Serie('Dahmer Monstruo: La historia de Jeffrey Dahmer', 'Ryan Murphy', 2022, 'Crimen', 8, 10, 'Netflix', 100),
    new Serie('El Señor de los Anillos: Los anillos de poder', 'John D. Payne', 2022, 'Fantasia', 7, 8, 'Prime Video', 200),
    new Serie('The Walking Dead', 'Frank Darabont', 2010, 'Fantasia', 8, 177, 'Netflix', 300),
    new Serie('Game of Thrones', 'David Benioff', 2011, 'Fantasia', 10, 80, 'HBO Max', 400),
    new Serie('Breaking Bad', 'Vince Gilligan', 2008, 'Drama', 9, 62, 'Netflix', 500),
    new Serie('Better Call Saul', 'Vince Gilligan', 2015, 'Drama', 10, 63, 'Netflix', 600),
    new Serie('Dragon Ball Z', 'Akira Toriyama', 1989, 'Anime', 7, 747, 'Torrent', 700),
    new Serie('Prison Break', 'Paul Scheuring', 2005, 'Drama', 8, 90, 'Star Plus', 800),
]

const contenedorTarjetas = document.getElementById('cards');
inputBuscador = document.getElementById('buscar');
btnBuscardor = document.getElementById('buscador');


function crearCards(array) {
    contenedorTarjetas.innerHTML = '';

    if (array.length != 0) {
        array.forEach(card => {
            let html = `<div class="card mb-3 toggles2" id="cards" style="width: 16rem;">
                        <img src="./images/${card.id}.jpg" class="card-img" alt="...">
                        <div class="card-body d-flex flex-column justify-content-around">
                        <h5 class="card-title">${card.title}</h5>
                        <p class="card-text">${card.author}</p>
                        <div class="d-flex justify-content-between"><a href="#" class="btn btn-primary more">Ver más</a></div>
                        </div>
                    </div>`
            contenedorTarjetas.innerHTML += html;

        })
    } else {
        let mensaje = `<p class="card-text">No encontramos resultados para su busqueda</p> `
        contenedorTarjetas.innerHTML += mensaje;
    }
}

crearCards(series);

// inicio buscador //

let busqueda;

function buscar() {
    busqueda = series.filter((serie) => serie[selectedOption.value].toLowerCase().includes((inputBuscador.value).toLowerCase()));
    return busqueda;
}

let select = document.getElementById('select');
select.addEventListener('change',
    function () {
        selectedOption = this.options[select.selectedIndex];
    });


btnBuscardor.addEventListener('click', (e) => {
    e.preventDefault();
    buscar();
    crearCards(busqueda);
});


// fin  buscador //






