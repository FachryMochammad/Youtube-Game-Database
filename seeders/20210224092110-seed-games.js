'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const games = require('../datas/games.json');
    games.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Games', games, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Games', null, {})
  }
};
