const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./models'); // Lädt Sequelize und Modelle

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Test-Route
app.get('/test', (req, res) => {
  res.send('Bewertungsapp-Server läuft erfolgreich!');
});

// Router einbinden (Achte darauf, ob deine Dateien team.js oder teams.js heißen)
const teamsRouter = require('./routes/team');
const projectsRouter = require('./routes/project');
const evaluationsRouter = require('./routes/evaluation');

app.use('/team', teamsRouter);
app.use('/project', projectsRouter);
app.use('/evaluation', evaluationsRouter);

const PORT = 4000;

// Verbindung zur Datenbank aufbauen und Server starten
db.sequelize.authenticate()
  .then(() => {
    console.log('Datenbankverbindung erfolgreich hergestellt!');
    app.listen(PORT, '127.0.0.1', () => {
      console.log(`Server läuft aktiv auf http://127.0.0.1:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Fehler bei der Datenbankverbindung:', err);
  });