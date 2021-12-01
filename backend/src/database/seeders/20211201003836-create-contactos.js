"use strict";
const faker = require("faker");
const { Empresa } = require("../index");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const contactosArray = [];
    const empresas = await Empresa.findAll();

    // A cada empresa se le agrega un contacto
    empresas.forEach((empresa) => {
      contactosArray.push({
        nombre: faker.name.firstName(),
        apellido: faker.name.lastName(),
        cargo: faker.random.arrayElement([
          "Gerente",
          "Gerente de ventas",
          "Desarrollador",
        ]),
        correo: faker.internet.email(),
        empresaId: empresa.id,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    });

    await queryInterface.bulkInsert("contactos", contactosArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("contactos", null, {});
  },
};
