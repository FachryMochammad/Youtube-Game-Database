'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Youtubers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: false,
        type: Sequelize.STRING
      },
      birth_year: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      birth_place: {
        allowNull: false,
        type: Sequelize.STRING
      },
      about_youtuber: {
        allowNull: false,
        type: Sequelize.STRING
      },
      youtube_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      subscribers: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      photo_link: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Youtubers');
  }
};