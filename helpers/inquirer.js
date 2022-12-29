const inquirer = require("inquirer");
require("colors");

const menuOptions = [
  {
    type: "list",
    name: "opcion",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar tareas completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar tareas pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("==========================".green);
  console.log("  SELECCIONE UNA OPCION");
  console.log("==========================".green);

  const { opcion } = await inquirer.prompt(menuOptions);

  return opcion;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"ENTER".green} para continuar\n`,
    },
  ];

  await inquirer.prompt(question);
};

const leerDescripcion = async (message) => {
  const question = {
    type: "input",
    name: "descripcion",
    message,
    validate(value) {
      if (value.length === 0) {
        return "Por favor ingrese un valor";
      }
      return true;
    },
  };

  const { descripcion } = await inquirer.prompt(question);

  return descripcion;
};

const listadoTareasBorrar = async (tareas = []) => {
  const choices = tareas.map((tarea, index) => {
        return {
        value: tarea.id,
        name: `${((index + 1) + '.').green} ${tarea.descripcion}`,
        }
    })
    const pregunta = {
        type: 'list',
        name: 'id',
        message: 'Desea borrar la tarea selecionada?',
        choices
    }

    const { id } = await inquirer.prompt(pregunta)

    return id
}

const confirmar = async (message) => {
    const pregunta = {
        type: 'confirm',
        name: 'ok',
        message
    }

    const { ok } = await inquirer.prompt(pregunta)
    return ok
}

const mostrarListadoCheklist = async (tareas = []) => {
  
  const choices = tareas.map((tarea, index) => {
        return {
        value: tarea.id,
        name: `${((index + 1) + '.').green} ${tarea.descripcion}`,
        checked: (tarea.completadoEn) ? true : false
        }
    })

    const pregunta = {
        type: 'checkbox',
        name: 'ids',
        message: '¿Desea completar las tareas selecionadas?',
        choices
    }

    const { ids } = await inquirer.prompt(pregunta)

    return ids
}

module.exports = { inquirerMenu, pausa, leerDescripcion, listadoTareasBorrar, confirmar, mostrarListadoCheklist };
