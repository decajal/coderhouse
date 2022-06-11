class Usuario
{
    constructor(nombre, apellido)
    {
        this.nombre = nombre
        this.apellido = apellido
        this.libros = []
        this.mascotas = []
    }

    getFullName()
    {
        return `${this.apellido}, ${this.nombre}`
    }

    addMascota(mascota)
    {
        this.mascotas.push(mascota)
    }

    cantMascotas()
    {
        return this.mascotas.length
    }

    addBook(name, author)
    {
        let newBook = { nombre: name, autor: author }
        this.libros.push(newBook)
    }

    getBookNames()
    {
        let arr = []
        this.libros.forEach(element => {
            arr.push(element.nombre)
        });
        return arr
    }
}

const user1 = new Usuario("John", "Doe")
user1.addMascota("Lucero")
user1.addMascota("Milo")
user1.addMascota("Garfield")
user1.addMascota("Pluto")
user1.addBook("El amor en los tiempos del colera", "Gabriel Garcia Marquez")
user1.addBook("La casa de los espiritus", "Isabel Allende")
user1.addBook("El tunel", "Ernesto Sabato")
user1.addBook("Papillon", "Henri Charrière.")

console.log(user1.getFullName())
console.log(user1.getBookNames())
console.log(user1.cantMascotas())
