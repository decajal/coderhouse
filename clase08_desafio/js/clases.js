class Numero {
    constructor(valor) {
        this.valor = valor
    }
}

export class Par extends Numero {
    constructor(valor, orden) {
        super(valor)
        this.orden = orden
    }
    
    identidad() {
        console.log(`Valor: ${this.valor} y es un PAR.`)
    }
}

export class Impar extends Numero {
    constructor(valor, orden) {
        super(valor)
        this.orden = orden
    }
    
    identidad() {
        console.log(`Valor: ${this.valor} y es un IMPAR.`)
    }   
}

export class Primo extends Numero {
    constructor(valor, orden) {
        super(valor)
        this.orden = orden
    }

    identidad() {
        console.log(`Valor: ${this.valor} y es un PRIMO.`)
    }   
}