const { Empleado, ClienteCrm, Permiso, Role } = require("../database");
const chalk = require("chalk");

const initialSetup = {};

// CREAR EMPLEADO ROOT
initialSetup.createInitialUser = async () => {
  try {
    const clienteCrm = await ClienteCrm.findOne({
      where: { nombre: "Abaco Systems Technologies" },
      include: ["empleados"],
    });

    // Si no tengo el cliente abaco systems
    if (!clienteCrm) {
      const newClient = await ClienteCrm.create({
        nombre: "Abaco Systems Technologies",
      });

      const empleadoRoot = await Empleado.create({
        nombre: "root",
        apellido: "root",
        cargo: "Primer usuario",
        correo: "root@mail.com",
        status: "activo",
        password:
          "$2a$10$07qvuOYAvA.KKZeK4F2UsOQcztQZy/KHp.2PlUqWaPdpfGReitWR.",
        asociadoId: newClient.id,
      });

      console.log(chalk.green("Usuario ROOT creado"));

      // Si ya tengo el cliente abaco systems pero sin empleados
    } else if (clienteCrm && clienteCrm.empleados.length === 0) {
      const empleadoRoot = await Empleado.create({
        nombre: "root",
        apellido: "root",
        cargo: "Primer usuario",
        correo: "root@mail.com",
        status: "activo",
        password:
          "$2a$10$07qvuOYAvA.KKZeK4F2UsOQcztQZy/KHp.2PlUqWaPdpfGReitWR.",
        asociadoId: clienteCrm.id,
      });

      console.log(chalk.green("Usuario ROOT creado"));
    }

    //
  } catch (error) {
    console.log(chalk.red("Error al crear cliente CRM:", error));
  }
};

module.exports = initialSetup;
