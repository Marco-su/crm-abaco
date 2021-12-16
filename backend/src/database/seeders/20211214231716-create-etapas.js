"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "etapas",
      [
        {
          nombre: "Prospección",
          tipo: "oportunidad",
          paso: 1,
        },
        {
          nombre: "Calificación",
          tipo: "oportunidad",
          paso: 2,
        },
        {
          nombre: "Análisis de Necesidades",
          tipo: "oportunidad",
          paso: 3,
        },
        {
          nombre: "Análisis de Necesidades",
          tipo: "oportunidad",
          paso: 4,
        },
        {
          nombre: "Propuesta",
          tipo: "oportunidad",
          paso: 5,
        },
        {
          nombre: "Toma de decisiones",
          tipo: "oportunidad",
          paso: 6,
        },
        {
          nombre: "Análisis de percepción",
          tipo: "oportunidad",
          paso: 7,
        },
        {
          nombre: "Propuesta",
          tipo: "oportunidad",
          paso: 8,
        },
        {
          nombre: "Negociación",
          tipo: "oportunidad",
          paso: 9,
        },
        {
          nombre: "Cerrada - Ganada",
          tipo: "oportunidad",
          paso: 10,
        },
        {
          nombre: "Cerrada - Perdida",
          tipo: "oportunidad",
          paso: 10,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("etapas", null, {});
  },
};
