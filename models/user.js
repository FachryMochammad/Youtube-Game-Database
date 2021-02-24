'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcyrpt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
    }
  };
  User.init({
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