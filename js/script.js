class Serie {

    constructor(title, author, year, genre, rating, episodes, platform) {
        this.title = title;
        this.author = author;
        this.year = parseInt(year);
        this.genre = genre;
        this.rating = parseInt(rating);
        this.episodes = parseInt(episodes);
        this.platform = platform;
    }

}

const series = [
    new Serie('Dahmer Monstruo: La historia de Jeffrey Dahmer', 'Ryan Murphy', 2022, 'Crimen', 8, 10, 'Netflix'),
    new Serie('El Señor de los Anillos: Los anillos de poder', 'John D. Payne', 2022, 'Fantasia', 7, 8, 'Prime Video'),
    new Serie('The Walking Dead ', 'Frank Darabont', 2010, 'Fantasia', 8, 177, 'Netflix'),
    new Serie('Game of Thrones', 'David Benioff', 2011, 'Fantasia', 10, 80, 'HBO Max'),
    new Serie('Breaking Bad', 'Vince Gilligan', 2008, 'Drama', 9, 62, 'Netflix'),
    new Serie('Better Call Saul', 'Vince Gilligan', 2015, 'Drama', 10, 63, 'Netflix'),
    new Serie('Dragon Ball Z', 'Akira Toriyama', 1989, 'Anime', 7, 747, 'Torrent'),
]


let option = prompt('Elegí la opción deseada:\n1 - Título (A a Z) \n2 - Por categoria \n3 - Mejor a peor puntuado \n4 - Por plataforma \n5 - Por cantidad de episodios \nX - Para salir').toLowerCase();

while (option != 'x') {

        function order(option, array) {
        let orderedArray = array.slice(0);

        switch (option) {

            case '1':

                let ascName = orderedArray.sort((a, b) => a.title.localeCompare(b.title));
                return ascName;

            case '2':

                let chosenCategory = prompt('Elegí la categoria:');
                const filter = series.filter((serie) => serie.genre.toLowerCase().includes(chosenCategory.toLowerCase()));

                if (filter.length == 0 || chosenCategory == '') {
                    alert('Lo sentimos. No encontramos coincidencias en nuestro catálogo');
                } else {
                    return filter;
                }

            case '3':
                return orderedArray.sort((a, b) => b.rating - a.rating);

            case '4':
                let chosenPlatform = prompt('Elegí la Plataforma:');

                const filterPlatform = series.filter((serie) => serie.platform.toLowerCase().includes(chosenPlatform.toLowerCase()));

                if (filterPlatform.length == 0 || chosenPlatform == '') {
                    alert('Lo sentimos. No encontramos coincidencias en nuestro catálogo');
                } else {
                    return filterPlatform;
                };

            case '5':
                let qty = parseInt(prompt('Elegi la cantidad minima de capitulos y te mostraremos que series cumplen con el criterio'));
                const filterQty = series.filter((serie) => serie.episodes >= qty)
                    .map((title) => (title))
                    .sort((a, b) => a.episodes - b.episodes);
                    console.log(qty);
                if (filterQty.length == 0) {
                    alert('Lo sentimos. No encontramos coincidencias en nuestro catálogo');

                } else {
                    return filterQty;
                }

            default:
                alert('Elegiste una opción inválida');

        }
    }

    if (option == 5) {
        alert(createStringEpisodes(order(option, series)));
    } else {
        alert(createString(order(option, series)));
    }

    option = prompt('Elegí la opción deseada:\n1 - Título (A a Z) \n2 - Por categoria \n3 - Mejor a peor puntuado \n4 - Por plataforma \n5 - Por cantidad de episodios \nX - Para salir').toLowerCase();
}



function createString(array) {
    let info = '';

    array.forEach(e => {
        info += 'Título: ' + e.title + '\nAutor: ' + e.author + '\nAño: ' + e.year + '\nGenero: ' + e.genre + '\nValoración: ' + e.rating + ' puntos.' + '\nEpisodios: ' + e.episodes + '\nPlataforma: ' + e.platform + '\n\n'
    })

    return info;
}



function createStringEpisodes(array) {
    let info = 'La/s serie/s que cumplen con el criterio son: \n\n';

    array.forEach(e => { info += e.title + ' (' + e.episodes + ' episodios) ' + '\n' })

    return info;
}






