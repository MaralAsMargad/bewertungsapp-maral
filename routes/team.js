const express = require('express');
const router = express.Router();
const db = require('../models');
const { Team, Member, Project } = db;

// GET /teams - Alle Teams abrufen (inkl. Mitglieder und Projekte)
router.get('/', async (req, res) => {
  console.log("GET /team wurde aufgerufen..."); // Zum Testen
  try {
    const teams = await Team.findAll();
    res.json(teams);
  } catch (error) {
    console.error("Fehler bei DB-Abfrage:", error);
    res.status(500).json({ error: error.message });
  }
});

// GET /teams/:id - Ein Team per ID abrufen
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id, { include: [Member, Project] });
    if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /teams - Neues Team anlegen
router.post('/', async (req, res) => {
  try {
    const { Name, Klasse } = req.body;
    if (!Name || !Klasse) {
      return res.status(400).json({ error: 'Name und Klasse sind Pflichtfelder' });
    }
    const team = await Team.create({ Name, Klasse });
    res.status(201).json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /teams/:id - Team aktualisieren
router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
    await team.update(req.body);
    res.json(team);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /teams/:id - Team löschen
router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByPk(req.params.id);
    if (!team) return res.status(404).json({ error: 'Team nicht gefunden' });
    await team.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;