const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Router importieren
const teamsRouter = require('./routes/team');
const projectsRouter = require('./routes/project');
const evaluationsRouter = require('./routes/evaluation');

// Router einbinden
app.use('/team', teamsRouter);
app.use('/project', projectsRouter);
app.use('/evaluation', evaluationsRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));