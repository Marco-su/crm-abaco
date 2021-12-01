"use strict";
const faker = require("faker");
const { Empleado } = require("../index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const empleadosArray = [];
    const empleados = await Empleado.findAll();

    // A cada empresa se le agrega un contacto
    empleados.forEach((empleado) => {
      empleadosArray.push({
        codPais: faker.random.arrayElement(["+58", "+57", "+1"]),
        numero: faker.phone.phoneNumber(),
        tipo: faker.random.arrayElement(["movil", "telefono"]),
        empleadoId: empleado.id,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    });

    await queryInterface.bulkInsert("telefonoempleados", empleadosArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("telefonoempleados", null, {});
  },
};
