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
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Name is required!'
        }
      }
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required!'
        }
      }
    }
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