const fs = require('fs');

class Contenedor
{
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }
    async getAll()
    {
        try
        {
            const result = await fs.promises.readFile(this.nombreArchivo, 'utf-8');
            const data = await JSON.parse(result);
    
            return data;
        } catch (error) {
            const msg = `Ocurrió un error. No se pudo completar la solicitud.\n
                Descripción: ${error.message}`;
            console.log(msg);
        }
    }

    async save(newObject)
    {
        try {
            newObject.fecha = new Date().toLocaleString();
            const data = await this.getAll();
            if (data.length > 0)
            {
                let max = 0;
                data.forEach(x => {
                    if (x.id > max) max = x.id;
                });
                max++;
                newObject.id = max;
            }
            else newObject.id = 1;

            data.push(newObject);
            await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(data));
            
            return data;
        } catch (error) {
            const msg = `Ocurrió un error. No se pudo completar la solicitud.\n
                Descripción: ${error.message}`;
            console.log(msg);
        }
    }

}

module.exports = { Contenedor };