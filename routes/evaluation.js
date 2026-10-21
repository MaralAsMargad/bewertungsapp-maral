const express = require('express');
const router = express.Router();
const db = require('../models');
const { Evaluation, Project, Criterion, Juror } = db;

// POST /evaluations - Eine neue Bewertung abgeben
router.post('/', async (req, res) => {
  try {
    const { projectId, criterionId, jurorId, Score, Comment } = req.body;

    // Pflichtfelder prüfen
    if (!projectId || !criterionId || !jurorId || Score === undefined) {
      return res.status(400).json({ 
        error: 'projectId, criterionId, jurorId und Score sind Pflichtfelder' 
      });
    }

    // Prüfen, ob FK-Referenzen tatsächlich in der DB existieren
    const project = await Project.findByPk(projectId);
    if (!project) return res.status(404).json({ error: 'Projekt nicht gefunden' });

    const criterion = await Criterion.findByPk(criterionId);
    if (!criterion) return res.status(404).json({ error: 'Kriterium nicht gefunden' });

    const juror = await Juror.findByPk(jurorId);
    if (!juror) return res.status(404).json({ error: 'Juror nicht gefunden' });

    // Prüfen auf doppelte Bewertung (Unique-Constraint Verhinderung)
    const existingEvaluation = await Evaluation.findOne({
      where: { projectId, criterionId, jurorId }
    });
    if (existingEvaluation) {
      return res.status(409).json({ 
        error: 'Dieser Juror hat dieses Kriterium für dieses Projekt bereits bewertet' 
      });
    }

    const evaluation = await Evaluation.create({
      projectId,
      criterionId,
      jurorId,
      Score,
      Comment
    });

    res.status(201).json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /evaluations - Alle Bewertungen abrufen
router.get('/', async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll({
      include: [Project, Criterion, Juror]
    });
    res.json(evaluations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;