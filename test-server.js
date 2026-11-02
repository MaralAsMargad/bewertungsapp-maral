const express = require('express');
const app = express();
const PORT = 4000;

app.get('/test', (req, res) => {
  res.send('Reiner Express-Server läuft!');
});

app.listen(PORT, () => {
  console.log(`Test-Server läuft dauerhaft auf Port ${PORT}`);
});