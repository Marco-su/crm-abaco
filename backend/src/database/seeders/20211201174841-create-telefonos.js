"use strict";
const faker = require("faker");
const { Empleado, Contacto } = require("../index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const telefonosArray = [];
    const empleados = await Empleado.findAll();

    // A cada empleado se le agrega un movil y un telefono
    empleados.forEach((empleado) => {
      telefonosArray.push({
        codPais: faker.random.arrayElement(["58", "57", "1"]),
        numero: faker.phone.phoneNumber(),
        tipo: "movil",
        telefonableId: empleado.id,
        telefonableType: "empleado",
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    });
    empleados.forEach((empleado) => {
      telefonosArray.push({
        codPais: faker.random.arrayElement(["58", "57", "1"]),
        numero: faker.phone.phoneNumber(),
        tipo: "telefono",
        telefonableId: empleado.id,
        telefonableType: "empleado",
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    });

    await queryInterface.bulkInsert("telefonos", telefonosArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("telefonos", null, {});
  },
};
