const { Empleado } = require("../database");

const initialSetup = {};

initialSetup.createInitialUser = () => {
  Empleado.count()
    .then((count) => {
      if (count > 0) return;

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
    })
    .catch((err) => console.log("Error al crear usuario ROOT", err));
};

module.exports = initialSetup;
