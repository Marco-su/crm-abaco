"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const empresasArray = [];

    for (let i = 0; i < 100; i++) {
      empresasArray.push({
        nombre: faker.company.catchPhrase(),
        vertical: faker.company.companySuffix(),
        tipo: faker.random.arrayElement(["Prospecto", "Cliente"]),
        status: "activo",
        etapa: faker.random.arrayElement([
          "En gestión",
          "Cierre",
          "Evaluación",
        ]),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    }

    await queryInterface.bulkInsert("empresas", empresasArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("empresas", null, {});
  },
};
