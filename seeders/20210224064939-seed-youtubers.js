'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const youtubers = require('../datas/youtubers.json');
    youtubers.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    });
    return queryInterface.bulkInsert('Youtubers', youtubers, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Youtubers', null, {});
  }
};
