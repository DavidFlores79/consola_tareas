const { leerDB, guardarDB } = require('./helpers/operaciones_db');
const { inquirerMenu, pausa, leerDescripcion, listadoTareasBorrar, confirmar } = require('./helpers/inquirer');
const Tareas = require('./models/tareas.model');
require('colors')

const main = async () => {
    
    let opt = ''
    const tareas = new Tareas()

    const tareasDB = leerDB()
    if(tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }
    
    do {
        
        opt = await inquirerMenu()


        switch (opt) {
            case '1':
                const descripcion = await leerDescripcion('Descripcion:')
                tareas.crearTarea(descripcion)
                break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarPendientesCompletadas(true)
                break;
            case '4':
                tareas.listarPendientesCompletadas()
                break;
            case '5':
                
                break;
            case '6':
                if(tareasDB) {
                    const id = await listadoTareasBorrar( tareas.listadoArray  )
                    const ok = await confirmar('¿Está seguro?')
                    if(ok) {
                        tareas.borrarTarea(id)
                        console.log();
                        console.log('Tarea eliminada.');
                        console.log();
                    }
                }
                break;
        
        }

        guardarDB(tareas.listadoArray)

        await pausa()

    } while (opt != '0');

}

main();