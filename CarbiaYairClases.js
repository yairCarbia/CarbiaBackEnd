//Clases , desafio.

class Usuario {
    constructor(nombre, apellido) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    getFullName() {
        return `Hola mi nombre completo es ${this.nombre} ${this.apellido}`;
    }
    addMascota(mascota) {
        this.mascotas.push(mascota);
    }
    countMascotas() {
        return this.mascotas.length;
    }
    addBook(name, autor) {
        const libro = {
            nombre: name,
            autor: autor
        }
        this.libros.push(libro);
    }
    getBookNames() {
        return this.libros.map(name => name.nombre);
        //  return this.libros.map((name) => { return name.nombre })
    }
}

const user = new Usuario("Yair", "Carbia")

user.addMascota("Tyson");
user.addMascota("Peludito");
user.addMascota("Rocky");

user.addBook("Frankenstein", "Shelley Mary Wollstonecraft");
user.addBook("Al faro", "Virginia Woolf");
user.addBook("Don Quijote de la Mancha", "Miguel de Cervantes");

console.log(user);
console.log(user.countMascotas());
console.log(user.getBookNames());
console.log(user.getFullName());
