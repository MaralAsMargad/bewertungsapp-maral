const express = require('express');
const router = express.Router();
const { fn, col } = require('sequelize');
const db = require('../models');
const { Project, Team, Evaluation, Criterion } = db;

// GET /projects - Alle Projekte abrufen
router.get('/', async (req, res) => {
  try {
    const projects = await Project.findAll({ include: [Team, Evaluation] });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /projects/:id - Ein Projekt per ID abrufen
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, { include: [Team, Evaluation] });
    if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /projects/:id/statistik - Durchschnitt der Punkte pro Kriterium für ein Projekt
router.get('/:id/statistik', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });

    const statistik = await Evaluation.findAll({
      where: { projectId: req.params.id },
      attributes: [
        'criterionId',
        [fn('AVG', col('Score')), 'durchschnittsScore']
      ],
      include: [{ model: Criterion, attributes: ['Name', 'Weight'] }],
      group: ['criterionId', 'Criterion.id']
    });

    res.json(statistik);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /projects - Neues Projekt anlegen
router.post('/', async (req, res) => {
  try {
    const { teamId, Titel, Beschreibung, Praesentiert_am } = req.body;
    if (!teamId || !Titel) {
      return res.status(400).json({ error: 'teamId und Titel sind Pflichtfelder' });
    }

    const teamExists = await Team.findByPk(teamId);
    if (!teamExists) return res.status(404).json({ error: 'Das angegebene Team existiert nicht' });

    const project = await Project.create({ teamId, Titel, Beschreibung, Praesentiert_am });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /projects/:id - Projekt aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
    await project.update(req.body);
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /projects/:id - Projekt löschen
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });
    await project.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;