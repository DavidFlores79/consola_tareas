const { v4: uuidv4 } = require("uuid")

class Tarea {


    id = ''
    descripcion = ''
    completadoEn = false

    constructor( desc ) {
        this.id = uuidv4();
        this.descripcion = desc
        this.completadoEn = false
    }

}

module.exports = Tarea