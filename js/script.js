let userSaved = 'francisco';
let passSaved = 'Pass1234';

function login() {

    let ingresar = false;

    for (let i = 2; i >= 0; i--) {

        let user = prompt('Ingresa tu usuario');
        let pass = prompt('Ingresa tu contraseña');

        if (user === userSaved && pass === passSaved) {

            alert('Bienvenido ' + user);
            ingresar = true;
            break;

        } else {

            alert('El usuario o la contraseña son incorrectos. \nTe quedan ' + i + ' intentos');

        }

    }

    return ingresar;

}

if (login()) {

    let total = 0;
    let opcion = prompt('¿Que producto querés comprar? \n1 - Hamburguesa completa - $1200 \n2 - Milanesa con papas fritas - $1800. \n3 - Pizza de Muzzarela - $950. \n4 - Tarta Individual de Verdura- $700. \nPresioná X para salir.');

    while (opcion != 'X' && opcion != 'x') {

        switch (opcion) {

            case '1':
                producto = 'Hamburguesa completa';
                precioProducto = 1200 ;
                document.write(producto + ' $' + precioProducto + '<br>');      
                total += precioProducto;
                break;

            case '2':
                producto = 'Milanesa con papas fritas';
                precioProducto = 1800 ;
                document.write(producto + ' $' + precioProducto + '<br>');      
                total += precioProducto;
                break;

            case '3':
                producto = 'Pizza de Muzzarella';
                precioProducto = 950 ;
                document.write(producto + ' $' + precioProducto + '<br>');      
                total += precioProducto;
                break;

            case '4':
                producto = 'Tarta Individual de Verdura';
                precioProducto = 700;
                document.write(producto + ' $' + precioProducto + '<br>');      
                total += precioProducto;
                break;

            default:
                alert('Elegiste una opción inválida');
                break;
        }

        opcion = prompt('¿Que producto querés comprar? \n1 - Hamburguesa completa - $1200 \n2 - Milanesa con papas fritas - $1800. \n3 - Pizza de Muzzarela - $950. \n4 - Tarta Individual de Verdura- $700. \nPresioná X para salir.');

    }
    
    document.write('<br>El TOTAL del pedido es: $' + total);
    

} else {
    alert('Volvé a intentar dentro de 5 minutos')
}

