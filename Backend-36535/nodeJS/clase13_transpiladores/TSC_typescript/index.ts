class Alumno {
    nombre: string;
    apellido: string;
    edad: Number;
    curso: string;
    constructor(nombre: string, appelido: string, edad: Number, curso: string) {
        this.nombre = nombre;
        this.apellido = appelido;
        this.edad = edad;
        this.curso = curso;
    }
    mostrarDatos(){
        return `
            <div>Nombre: ${this.nombre} Apellido: ${this.apellido} Edad: ${this.edad} Curso: ${this.curso}</div>`
    }
}

const alumno1 = new Alumno("Robert", "Plant", 24, "NodeJS");
const alumno2 = new Alumno("Ricardo", "Arjona", 55, "NodeJS");
const alumno3 = new Alumno("Ray", "Charles", 75, "NodeJS");
const alumno4 = new Alumno("John", "Lennon", 25, "NodeJS");
const alumno5 = new Alumno("James", "Brown", 46, "NodeJS");

console.log(alumno1.mostrarDatos());
console.log(alumno2.mostrarDatos());
console.log(alumno3.mostrarDatos());
console.log(alumno4.mostrarDatos());
console.log(alumno5.mostrarDatos());
