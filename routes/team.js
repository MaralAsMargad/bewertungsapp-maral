
const express = require('express');
const router = express.Router();
const db = require('../models');
const { Team, Member, Project } = db;

// Hilfsfunktion: Prüft, ob eine ID eine positive ganze Zahl ist
function istGueltigeId(id) {
  return /^[1-9]\d*$/.test(id) &&
    Number.isSafeInteger(Number(id));
}

// GET /team - Alle Teams abrufen
router.get('/', async (req, res) => {
  try {
    const teams = await Team.findAll();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// GET /team/:id - Einzelnes Team abrufen
router.get('/:id', async (req, res) => {
  if (!istGueltigeId(req.params.id)) {
    return res.status(400).json({
      error: 'Ungültige Team-ID'
    });
  }

  try {
    const team = await Team.findByPk(req.params.id, {
      include: [Member, Project]
    });

    if (!team) {
      return res.status(404).json({
        error: 'Team nicht gefunden'
      });
    }

    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// POST /team - Neues Team erstellen
router.post('/', async (req, res) => {
  try {
    const { name, klasse } = req.body;

    if (
      typeof name !== 'string' ||
      !name.trim() ||
      typeof klasse !== 'string' ||
      !klasse.trim()
    ) {
      return res.status(400).json({
        error: 'name und klasse sind Pflichtfelder'
      });
    }

    const team = await Team.create({
      name: name.trim(),
      klasse: klasse.trim()
    });

    res.status(201).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// PUT /team/:id - Team aktualisieren
router.put('/:id', async (req, res) => {
  if (!istGueltigeId(req.params.id)) {
    return res.status(400).json({
      error: 'Ungültige Team-ID'
    });
  }

  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({
        error: 'Team nicht gefunden'
      });
    }

    const { name, klasse } = req.body;
    const daten = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({
          error: 'Ungültiger Name'
        });
      }
      daten.name = name.trim();
    }

    if (klasse !== undefined) {
      if (typeof klasse !== 'string' || !klasse.trim()) {
        return res.status(400).json({
          error: 'Ungültige Klasse'
        });
      }
      daten.klasse = klasse.trim();
    }

    await team.update(daten);
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

// DELETE /team/:id - Team löschen
router.delete('/:id', async (req, res) => {
  if (!istGueltigeId(req.params.id)) {
    return res.status(400).json({
      error: 'Ungültige Team-ID'
    });
  }

  try {
    const team = await Team.findByPk(req.params.id);

    if (!team) {
      return res.status(404).json({
        error: 'Team nicht gefunden'
      });
    }

    await team.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Interner Serverfehler' });
  }
});

module.exports = router;
