'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    static associate(models) {
      Evaluation.belongsTo(models.Project, { foreignKey: 'projectId' });
      Evaluation.belongsTo(models.Criterion, { foreignKey: 'criterionId' });
      Evaluation.belongsTo(models.Juror, { foreignKey: 'jurorId' });
    }
  }
  Evaluation.init({
    projectId: DataTypes.INTEGER,
    criterionId: DataTypes.INTEGER,
    jurorId: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Evaluation',
  });
  return Evaluation;
};