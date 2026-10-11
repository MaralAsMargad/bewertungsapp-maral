'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkInsert('Teams', [
      { name: 'Team Blockchain', klasse: '4AHITL', createdAt: now, updatedAt: now },
      { name: 'Team RoboArm', klasse: '4AHITL', createdAt: now, updatedAt: now }
    ]);

    await queryInterface.bulkInsert('Members', [
      { teamId: 1, vorname: 'Mar', nachname: 'Bat', createdAt: now, updatedAt: now },
      { teamId: 1, vorname: 'Loki', nachname: 'Smith', createdAt: now, updatedAt: now }
    ]);

    await queryInterface.bulkInsert('Projects', [
      { teamId: 1, titel: 'Dezentrale Wahl-App', beschreibung: 'Abstimmungssystem auf Basis einer Blockchain', praesentiertAm: new Date('2026-06-12'), createdAt: now, updatedAt: now },
      { teamId: 2, titel: 'Autonomer Greifarm', beschreibung: 'Robotikarm mit Bilderkennung', praesentiertAm: new Date('2026-06-12'), createdAt: now, updatedAt: now }
    ]);

    await queryInterface.bulkInsert('Criteria', [
      { name: 'Inhalt', maxScore: 10, weight: 1.0, createdAt: now, updatedAt: now },
      { name: 'Präsentationstechnik', maxScore: 10, weight: 1.0, createdAt: now, updatedAt: now },
      { name: 'Technische Umsetzung', maxScore: 10, weight: 1.5, createdAt: now, updatedAt: now }
    ]);

    await queryInterface.bulkInsert('Jurors', [
      { name: 'M. Huber', email: 'm.huber@schule.at', createdAt: now, updatedAt: now },
      { name: 'S. Novak', email: 's.novak@schule.at', createdAt: now, updatedAt: now }
    ]);

    await queryInterface.bulkInsert('Evaluations', [
      { projectId: 1, criterionId: 1, jurorId: 1, score: 8, comment: 'Konzept klar erklärt', createdAt: now, updatedAt: now },
      { projectId: 1, criterionId: 2, jurorId: 1, score: 7, comment: 'Etwas zu textlastige Folien', createdAt: now, updatedAt: now },
      { projectId: 2, criterionId: 3, jurorId: 2, score: 9, comment: 'Saubere Hardware-Dokumentation', createdAt: now, updatedAt: now }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Evaluations', null, {});
    await queryInterface.bulkDelete('Jurors', null, {});
    await queryInterface.bulkDelete('Criteria', null, {});
    await queryInterface.bulkDelete('Projects', null, {});
    await queryInterface.bulkDelete('Members', null, {});
    await queryInterface.bulkDelete('Teams', null, {});
  }
};