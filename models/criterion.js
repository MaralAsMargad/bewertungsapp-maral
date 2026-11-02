'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Criterion extends Model {
    static associate(models) {
      Criterion.hasMany(models.Evaluation, { foreignKey: 'criterionId' });
    }
  }
  Criterion.init({
    name: DataTypes.STRING,
    maxScore: DataTypes.INTEGER,
    weight: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Criterion',
  });
  return Criterion;
};