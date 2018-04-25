const express = require('express');

const data = require('./sampledata.json');

const app = express();

const port = 8080;
app.use(express.static('dist'));
app.get('/api/albums', (req, res) => res.send(data));
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
