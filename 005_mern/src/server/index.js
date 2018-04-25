const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const { mongoose, databaseUrl } = require('./database');
const routes = require('./routes');
const data = require('./sampledata.json');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Request-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
app.use(express.static('dist'));

app.use('/', routes);
app.get('/api/albums', (req, res) => res.send(data));

const port = process.env.PORT || 8080;
if (process.env.NODE_ENV === 'test') {
  mongoose
    .connect(databaseUrl)
    .then(() => {
      app.listen(7000, () => console.log('Listening on http://localhost:7000'));
    })
    .catch(console.error);
} else {
  mongoose.connect(databaseUrl).then(() => {
    app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
  });
}

module.exports = app;
