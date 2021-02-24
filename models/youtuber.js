'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Youtuber extends Model {
    static associate(models) {
      Youtuber.belongsToMany(models.Game, { through : models.YoutuberGame, foreignKey : "youtuber_id" })
      Youtuber.hasMany(models.YoutuberGame, { foreignKey: "youtuber_id" })
    }
  };
  Youtuber.init({
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    birth_year: DataTypes.INTEGER,
    birth_place: DataTypes.STRING,
    about_youtuber: DataTypes.STRING,
    youtube_link: DataTypes.STRING,
    subscribers: DataTypes.INTEGER,
    photo_link: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Youtuber',
  });
  return Youtuber;
};