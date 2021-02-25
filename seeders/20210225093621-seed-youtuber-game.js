'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = require('../datas/youtuber-game.json');
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('YoutuberGames', data, {})
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('YoutuberGames', null, {})
  }
};
