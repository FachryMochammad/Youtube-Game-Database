'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class YoutuberGame extends Model {
    static associate(models) {
    }
  };
  YoutuberGame.init({
    youtuber_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'YoutuberGame',
  });
  return YoutuberGame;
};