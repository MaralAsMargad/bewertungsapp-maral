'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    static associate(models) {
      Team.hasMany(models.Member, { foreignKey: 'teamId' });
      Team.hasMany(models.Project, { foreignKey: 'teamId' });
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