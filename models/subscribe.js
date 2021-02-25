'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscribe extends Model {
    static associate(models) {
    }
  };
  Subscribe.init({
    youtuber_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Subscribe'
  });
  return Subscribe;
};