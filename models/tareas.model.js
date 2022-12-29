const Tarea = require("./tarea.model");

class Tareas {

    _listado = {};

    get listadoArray () {
        const listado = []

        Object.keys(this._listado).forEach( key => {
            // console.log(key);
            let tarea = this._listado[key]
            listado.push( tarea )
        })

        return listado
    }

    constructor() {
        this._listado = {}
    }

    crearTarea( descripcion = '' )
    {

        const tarea = new Tarea(descripcion)

        this._listado[tarea.id] = tarea

    }

    cargarTareasFromArray( tareas = [] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        })

        return this._listado
        
    }

    listadoCompleto () {

        console.log();
        this.listadoArray.forEach( (tarea, index) => {
            console.log(`${index + 1}.`.green, `${tarea.descripcion} :: `,  (tarea.completadoEn) ? 'Completada'.green : 'Pendiente'.red );
        })
        console.log();
    }

    listarPendientesCompletadas (completadas = false) {

        console.log();
        this.listadoArray.forEach( (tarea, index) => {
            if( tarea.completadoEn == completadas)
                console.log(`${index + 1}.`.green, `${tarea.descripcion} :: `,  (tarea.completadoEn) ? 'Completado'.green : 'Pendiente'.red );
        })
        console.log();
    }

    borrarTarea = ( id = '') => {
        if( this._listado[id]) {
            delete this._listado[id]
        }
        // console.log('listado', this._listado)
    }
    

}

module.exports = Tareas