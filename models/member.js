'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    static associate(models) {
      Member.belongsTo(models.Team, { foreignKey: 'teamId' });
    }
  }
  Member.init({
    teamId: DataTypes.INTEGER,
    vorname: DataTypes.STRING,
    nachname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Member',
  });
  return Member;
};