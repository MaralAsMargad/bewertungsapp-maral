
const express = require('express');
const router = express.Router();
const db = require('../models');

const { Evaluation, Project, Criterion, Juror } = db;

// POST /evaluation - Neue Bewertung erstellen
router.post('/', async (req, res) => {
  try {
    const {
      projectId,
      criterionId,
      jurorId,
      score,
      comment
    } = req.body;

    // Pflichtfelder prüfen
    if (
      !projectId ||
      !criterionId ||
      !jurorId ||
      score === undefined ||
      score === null
    ) {
      return res.status(400).json({
        error: 'projectId, criterionId, jurorId und score sind Pflichtfelder'
      });
    }

    // Score muss eine gültige Zahl sein
    if (!Number.isInteger(score) || score < 0) {
      return res.status(400).json({
        error: 'Score muss eine nichtnegative ganze Zahl sein'
      });
    }

    // Projekt prüfen
    const project = await Project.findByPk(projectId);
    if (!project) {
      return res.status(404).json({
        error: 'Projekt nicht gefunden'
      });
    }

    // Kriterium prüfen
    const criterion = await Criterion.findByPk(criterionId);
    if (!criterion) {
      return res.status(404).json({
        error: 'Kriterium nicht gefunden'
      });
    }

    // Maximal erlaubte Punkte prüfen
    if (score > criterion.maxScore) {
      return res.status(400).json({
        error: `Score darf maximal ${criterion.maxScore} sein`
      });
    }

    // Juror prüfen
    const juror = await Juror.findByPk(jurorId);
    if (!juror) {
      return res.status(404).json({
        error: 'Juror nicht gefunden'
      });
    }

    // Doppelte Bewertung verhindern
    const existingEvaluation = await Evaluation.findOne({
      where: { projectId, criterionId, jurorId }
    });

    if (existingEvaluation) {
      return res.status(409).json({
        error: 'Dieser Juror hat dieses Kriterium für dieses Projekt bereits bewertet'
      });
    }

    // Bewertung speichern
    const evaluation = await Evaluation.create({
      projectId,
      criterionId,
      jurorId,
      score,
      comment
    });

    return res.status(201).json(evaluation);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Interner Serverfehler'
    });
  }
});

// GET /evaluation - Alle Bewertungen abrufen
router.get('/', async (req, res) => {
  try {
    const evaluations = await Evaluation.findAll({
      include: [Project, Criterion, Juror]
    });

    return res.status(200).json(evaluations);

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Interner Serverfehler'
    });
  }
});

module.exports = router;
