"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const empleadosArray = [];

    for (let i = 0; i < 100; i++) {
      empleadosArray.push({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        cargo: faker.random.arrayElement([
          "Gerente",
          "Gerente de ventas",
          "Desarrollador",
        ]),
        correo: faker.internet.email(),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
        password:
          "$2a$10$07qvuOYAvA.KKZeK4F2UsOQcztQZy/KHp.2PlUqWaPdpfGReitWR.",
        status: "activo",
      });
    }

    await queryInterface.bulkInsert("empleados", empleadosArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("empleados", null, {});
  },
};
