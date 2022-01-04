const { Empleado, ClienteCrm, Permiso, Role } = require("../database");
const chalk = require("chalk");

const initialSetup = {};

// CREAR EMPLEADO ROOT
initialSetup.createInitialUser = () => {
  Empleado.count()
    .then((count) => {
      if (count === 0) {
        Empleado.create({
          nombre: "root",
          apellido: "root",
          cargo: "Primer usuario",
          correo: "root@mail.com",
          status: "activo",
          password:
            "$2a$10$07qvuOYAvA.KKZeK4F2UsOQcztQZy/KHp.2PlUqWaPdpfGReitWR.",
        })
          .then(() => console.log("Usuario ROOT creado"))
          .catch((err) => console.log("Error al crear usuario ROOT", err));
      }
    })
    .catch((err) => console.log("Error al crear usuario ROOT:", err));
};

// CREACIÓN DE ROLES Y PERMISOS
initialSetup.createInitialCrmUser = async () => {
  try {
    // constantes
    const countPermisos = await Permiso.count();
    const countRoles = await Role.count();

    const roles = [
      "Root",
      "Administrador",
      "Director de Marketing",
      "Gerente de Marketing",
      "Director de Tecnología",
      "Gerente de Tecnología",
      "Director de Ventas",
      "Gerente de Ventas",
      "Vendedor",
    ];

    const permisos = [
      {
        nombre: "crear empleados",
        descripcion: "Crear empleados",
      },
      {
        nombre: "crear empresa",
        descripcion: "Crear empresas",
      },
      {
        nombre: "creacion masiva",
        descripcion: "Crear empresas de forma masiva (por tablas de excel)",
      },
    ];

    // crear roles y permisos
    if (countPermisos === 0) {
      permisos.forEach((el) => {
        Permiso.create(el);
      });
    }

    if (countRoles === 0) {
      roles.forEach(async (el) => {
        const rol = await Role.create({ nombre: el });

        if (el === "Root") {
          const permisos = await Permiso.findAll();

          permisos.forEach((el) => {
            rol.addPermiso(el);
          });
        }
      });
    }
  } catch (error) {
    console.log(chalk.red("Error al crear primera empresa crm", error));
  }
};

module.exports = initialSetup;
