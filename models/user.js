'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcyrpt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.belongsToMany(models.Youtuber, { through : models.Subscribe, foreignKey : "user_id" })
      User.hasMany(models.Subscribe, { foreignKey: "user_id" })
    }
  };
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password);
      }
    }
  });
  return User;
};