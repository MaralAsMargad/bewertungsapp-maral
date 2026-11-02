'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Juror extends Model {
    static associate(models) {
      Juror.hasMany(models.Evaluation, { foreignKey: 'jurorId' });
    }
  }
  Juror.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Juror',
  });
  return Juror;
};