'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Youtuber extends Model {
    static associate(models) {
      Youtuber.belongsToMany(models.Game, { through : models.YoutuberGame, foreignKey : "youtuber_id" })
      Youtuber.hasMany(models.YoutuberGame, { foreignKey: "youtuber_id" })
      Youtuber.belongsToMany(models.User, { through : models.Subscribe, foreignKey : "youtuber_id" })
      Youtuber.hasMany(models.Subscribe, { foreignKey: "youtuber_id" })
    }
    customTotalSubs() {
      if (this.subscribers > 1000000) {
        let beforeM = Math.round(this.subscribers / 1000000)
        return this.subscribers = `${beforeM}M`
      } else if (this.subscribers > 1000) {
        let beforeK = Math.round(this.subscribers / 1000)
        return this.subscribers = `${beforeK}K`
      } else {
        return this.subscribers
      }
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