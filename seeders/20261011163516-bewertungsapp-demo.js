'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date();

    // 1. Teams
    await queryInterface.bulkInsert('Teams', [
      { Name: 'Team Blockchain', Klasse: '4AHITL', createdAt: now, updatedAt: now },
      { Name: 'Team RoboArm', Klasse: '4AHITL', createdAt: now, updatedAt: now }
    ]);

    // 2. Members
    await queryInterface.bulkInsert('Members', [
      { teamId: 1, vorname: 'Marl', nachname: 'Bat', createdAt: now, updatedAt: now },
      { teamId: 1, vorname: 'Loki', nachname: 'Smith', createdAt: now, updatedAt: now }
    ]);

    // 3. Projects (praesentiertAm als klarer String YYYY-MM-DD)
    await queryInterface.bulkInsert('Projects', [
      { teamId: 1, Titel: 'Dezentrale Wahl-App', Beschreibung: 'Abstimmungssystem auf Basis einer Blockchain', praesentiertAm: '2026-06-12', createdAt: now, updatedAt: now },
      { teamId: 2, Titel: 'Autonomer Greifarm', Beschreibung: 'Robotikarm mit Bilderkennung', praesentiertAm: '2026-06-12', createdAt: now, updatedAt: now }
    ]);

    // 4. Criteria
    await queryInterface.bulkInsert('Criteria', [
      { name: 'Inhalt', maxScore: 10, weight: 1.0, createdAt: now, updatedAt: now },
      { name: 'Präsentationstechnik', maxScore: 10, weight: 1.0, createdAt: now, updatedAt: now },
      { name: 'Technische Umsetzung', maxScore: 10, weight: 1.5, createdAt: now, updatedAt: now }
    ]);

    // 5. Jurors
    await queryInterface.bulkInsert('Jurors', [
      { name: 'M. Huber', email: 'm.huber@schule.at', createdAt: now, updatedAt: now },
      { name: 'S. Novak', email: 's.novak@schule.at', createdAt: now, updatedAt: now }
    ]);

    // 6. Evaluations
    await queryInterface.bulkInsert('Evaluations', [
      { projectId: 1, criterionId: 1, jurorId: 1, Score: 8, Comment: 'Konzept klar erklärt', createdAt: now, updatedAt: now },
      { projectId: 1, criterionId: 2, jurorId: 1, Score: 7, Comment: 'Etwas zu textlastige Folien', createdAt: now, updatedAt: now },
      { projectId: 2, criterionId: 3, jurorId: 2, Score: 9, Comment: 'Saubere Hardware-Dokumentation', createdAt: now, updatedAt: now }
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