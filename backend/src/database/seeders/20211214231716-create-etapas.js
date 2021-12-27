"use strict";

const { date } = require("faker/locale/zh_TW");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "etapas",
      [
        {
          nombre: "Prospección",
          tipo: "oportunidad",
          paso: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Calificación",
          tipo: "oportunidad",
          paso: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Análisis de Necesidades",
          tipo: "oportunidad",
          paso: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Análisis de Necesidades",
          tipo: "oportunidad",
          paso: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Propuesta",
          tipo: "oportunidad",
          paso: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Toma de decisiones",
          tipo: "oportunidad",
          paso: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Análisis de percepción",
          tipo: "oportunidad",
          paso: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Propuesta",
          tipo: "oportunidad",
          paso: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Negociación",
          tipo: "oportunidad",
          paso: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Cerrada - Ganada",
          tipo: "oportunidad",
          paso: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          nombre: "Cerrada - Perdida",
          tipo: "oportunidad",
          paso: 10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("etapas", null, {});
  },
};
