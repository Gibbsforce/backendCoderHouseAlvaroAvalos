class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName () {
        console.log(`${this.nombre} ${this.apellido}`)
    }

    addMascotas (mascota) {
        for (let i = 0; i < mascota.length; i++) {
            this.mascotas.push(mascota[i]);
        }
    }

    countMascotas () {
        console.log(this.mascotas.length);
    }

    addBook (nombreLibro, autorLibro) {
        this.libros.push({nombre: nombreLibro, autor: autorLibro});
    }

    getBookNames () {
        let res = [];
        for (let i = 0; i < this.libros.length; i++) {
            res.push(this.libros[i].nombre);
        }
        return console.log(res);
    }
}

const usuario = new Usuario (
    "Alvaro",
    "Avalos",
    [
        {nombre: "Conversacion en La Catedral", autor: "Mario Vargas Llosa"},
        {nombre: "Fabla Salvaje", autor: "Cesar Vallejo"}
    ],
    ["Perro", "Gato"]
);

//obtener nombre completo
usuario.getFullName();

//obtener cantidad de MASCOTAS antes de agregar mascotas
usuario.countMascotas();

//agregando mascotas a traves de un array
usuario.addMascotas(["Gallina", "Pato"]);

//cantidad de MASCOTAS despues de agregar mascotas
usuario.countMascotas();

//obtener NOMBRES DE LOS LIBROS antes de agregar LIBRO
usuario.getBookNames();

//agregar LIBRO nombre y autor
usuario.addBook("Cronica de San Gabriel", "Julio Ramon Ribeyro");

//obtener NOMBRES DE LOS LIBROS despues de agregar LIBRO
usuario.getBookNames();
