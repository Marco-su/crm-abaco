"use strict";
const faker = require("faker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const productosArray = [];

    for (let i = 0; i < 100; i++) {
      productosArray.push({
        nombre: faker.company.catchPhrase(),
        codigo: faker.vehicle.vin(),
        precio: faker.datatype.number({
          min: 1000,
          max: 100000,
        }),
        descripcion: faker.lorem.paragraph(),
        categoria: faker.random.arrayElement([
          "Desarrollo de software",
          "Redes",
          "Mantenimiento",
        ]),
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      });
    }

    await queryInterface.bulkInsert("productos", productosArray, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("productos", null, {});
  },
};
