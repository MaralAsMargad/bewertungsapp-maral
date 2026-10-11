'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Team.hasMany(models.Member, { foreignKey: 'teamId' });
      Team.hasMany(models.Project, { foreignKey: 'teamId' });
    }

    static associate(models) {
      Member.belongsTo(models.Team, { foreignKey: 'teamId' });
    }

    static associate(models) {
      Project.belongsTo(models.Team, { foreignKey: 'teamId' });
      Project.hasMany(models.Evaluation, { foreignKey: 'projectId' });
    }

    static associate(models) {
      Criterion.hasMany(models.Evaluation, { foreignKey: 'criterionId' });
    }

    static associate(models) {
      Juror.hasMany(models.Evaluation, { foreignKey: 'jurorId' });
    }

    static associate(models) {
      Evaluation.belongsTo(models.Project, { foreignKey: 'projectId' });
      Evaluation.belongsTo(models.Criterion, { foreignKey: 'criterionId' });
      Evaluation.belongsTo(models.Juror, { foreignKey: 'jurorId' });
    }
  }
  Team.init({
    name: DataTypes.STRING,
    klasse: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};