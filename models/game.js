'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.belongsToMany(models.Youtuber, { through : models.YoutuberGame, foreignKey : "game_id" })
      Game.hasMany(models.YoutuberGame, { foreignKey: "game_id" })
    }
  };
  Game.init({
    name: DataTypes.STRING,
    genre: DataTypes.STRING,
    description: DataTypes.STRING,
    released_year: DataTypes.INTEGER,
    game_developer: DataTypes.STRING,
    photo_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};