class Persona {
    constructor(id, nombre, apellido, dni, celular) {
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.dni = dni,
        this.celular = celular
    }
}

export class Mecanico extends Persona {
    constructor(id, nombre, apellido, dni, celular) {
        super(id, nombre, apellido, dni, celular)
    }
}

export class Cliente extends Persona {
    constructor(id, nombre, apellido, dni, celular) {
        super(id, nombre, apellido, dni, celular)
    }
}

class ProductoBase {
    constructor(id, nombre, precio) {
        this.id = id,
        this.nombre = nombre,
        this.precio = precio       
    }
}

export class Producto extends ProductoBase {
    constructor(id, nombre, marca, precio, stock) {
        super(id, nombre, precio)       
        this.marca = marca,
        this.stock = stock
    }
}

export class Servicio extends ProductoBase {
    constructor(id, nombre, precio) {
        super(id, nombre, precio)
    }
}

export class Elemento {
    constructor(nombre) {
        this.nombre = nombre
    }
}

export class Ticket {
    constructor(numero, cliente, elemento, problema, mecanico) {
        this.numero = numero,
        this.cliente = cliente,
        this.elemento = elemento,
        this.problema = problema
        this.mecanico = mecanico
    }
}