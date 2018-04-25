# MERN

## Express + React Setup

Source: [https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708](https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708)

* Touch `.babelrc`. Preset `env` transforms `babel-preset-2015`, `babel-preset-2016`, and `babel-preset-2017` to es5. Preset `react` allows use of JSX.

```js
// .babelrc
{
    "presets": ["env", "react"]
}
```

* Touch `.eslintrc.json`

```js
//.eslintrc.json
{
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "no-console": "off",
    "comma-dangle": "off",
    "react/jsx-filename-extension": "off"
  }
}
```

* Touch `webpack.config.js`

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
  entry: './src/client/index.js', // where the application starts executing and webpack starts bundling
  output: {
    // the target directory and filename for the bundled output
    // __dirname is the directory name of the current module (this config file)
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader' // transform jsx to js
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'] // use css-loader to handler any css files
      }
    ]
  },
  devServer: {
    port: 3000, // listen to port 3000
    open: true, // open home page on startup
    proxy: {
      // for when you have a separate API backend development server and you want to send API requests on the same domain
      '/api': 'http://localhost:8080'
    }
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]), // remove the build files before building
    new HtmlWebpackPlugin({
      // loads the template at public/index.html and injects the output bundle
      template: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
```

* Touch `nodemon.json`. This watches for any changes in the server source in dev mode and restarts the server.

```js
{
  "watch": ["src/server/"]
}
```

* Create `src/server` directory and touch `index.js`.
* Touch `src/server/sampledata.json`

```js
const express = require('express');

const data = require('./sampledata.json');

const app = express();

const port = process.env.PORT || 8080;
app.use(express.static('dist'));
app.get('/api/albums', (req, res) => res.send(data));
app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
```

* npm init and write run scripts in `package.json`

```js
  "scripts": {
    "client":
      "webpack-dev-server --mode development --devtool inline-source-map --hot",
    "server": "nodemon src/server/index.js",
    "dev": "concurrently \"npm run server\" \"npm run client \""
  },
```

* Install dependencies

```bash
yarn add express react react-dom axios
yarn add -D babel-core babel-loader babel-preset-env babel-preset-react body-parser clean-webpack-plugin concurrently css-loader eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react html-webpack-plugin morgan nodemon style-loader webpack webpack-cli webpack-dev-server
```

* Create `src/client` and touch `index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

* Touch `App.js`

```js
import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { albums: null };
  }
  componentDidMount() {
    axios
      .get('/api/albums')
      .then(res => this.setState({ albums: res.data.albums }));
  }
  render() {
    return (
      <div>
        {this.state.albums !== null ? (
          this.state.albums.map(album => <h2 key={album.id}>{album.title}</h2>)
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}
```

* Touch `public/index.html` and `public/favicon.ico`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>React App</title>
</head>
<body>
  <noscript>
    You need to enable JavaScript to run this app.
  </noscript>
  <div id="root"></div>
</body>

</html>
```

## Connect to MongoDB

* Start MongoDB locally

```bash
mongod -dbpath ~/data/db
```

* Or provision a new db through MLAB. Create a username and password for the db. Add the username and password to the link from MLAB. Create a `.env` file and set `DATABASE_URL` to the full link.

* Install `mongoose`

```bash
yarn add -D mongoose
```

* Create `src/server/database/index.js`

```js
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const env = process.env.NODE_ENV || 'development';
const databaseUrl =
  process.env.DATABASE_URL || `mongodb://localhost/mern_${env}`;

module.exports = {
  mongoose,
  databaseUrl
};
```

* Connect to mongoose before starting the express app

## Setup server testing

* Install testing utilities

```bash
yarn add -D chai supertest mocha
```

* Touch `bin/mocha-test`

```bash
#/bin/sh

set -e

tests_that_are_not_features="$(ls src/server/**/*.test.js | grep -v features)"

NODE_ENV=test ./node_modules/.bin/mocha ${tests_that_are_not_features} --exit
```

* Make it executable

```bash
chmod +x bin/mocha-test
```

* Add `test` script to `package.json`

```js
// package.json
  "scripts": {
      // ...other scripts
    "test:server": "bin/mocha-test"
  },
```

## TDD: First Routes (to confirm proper setup)

* Touch `src/server/routes/index.test.js`
* Write a test for GET `/`

```js
const { assert } = require('chai');
const request = require('supertest');

const app = require('../../server/');

describe('GET `/`', () => {
  it('should return a JSON message and a status of 200', async () => {
    const response = await request(app).get('/');

    assert.equal(response.status, 200);
    assert.include(response.body, {
      message: 'root'
    });
  });
});
```

* Touch 'src/server/routes/index.js'

```js
const router = require('express').Router();

router.get('/', (req, res) => {
  res.json({
    message: 'root'
  });
});

module.exports = router;
```

* Update express app to use route and run on a separate port for testing

```js
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
  mongoose.connect(databaseUrl).then(() => {
    app.listen(7000, () => console.log('Listening on http://localhost:7000'));
  });
} else {
  mongoose.connect(databaseUrl).then(() => {
    app.listen(port, () =>
      console.log(`Listening on http://localhost:${port}`)
    );
  });
}

module.exports = app;
```

* Create a post route to add an album

```js
// src/server/routes/index.test.js

const { assert } = require('chai');
const request = require('supertest');

const app = require('../../server');
const Album = require('../models/');
const { mongoose, databaseUrl } = require('../database');

// setup and teardown utilities
beforeEach(async () => {
  await mongoose.connect(databaseUrl);
  await mongoose.connection.db.dropDatabase();
});

afterEach(async () => {
  await mongoose.disconnect();
});

describe('Server path: `/add`', () => {
  describe('POST', async () => {
    it('should return a `201` status code when creating a new album', async () => {
      const newAlbum = {
        title: 'Space is the Place',
        artist: 'Sun Ra',
        art:
          'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
        year: '1973',
        rating: 5
      };

      const response = await request(app)
        .post('/add')
        .type('json')
        .send(newAlbum);

      assert.equal(response.status, 201);
    });
  });
});

// src/server/routes/index.js

const router = require('express').Router();

const Album = require('../models');

router.get('/', (req, res) => {
  res.json({
    message: 'root'
  });
});

router.post('/add', async (req, res) => {
  const newAlbum = await new Album(req.body);
  newAlbum.save();
  const album = await Album.findOne(req.body);
  res.status(201).json(album);
});

module.exports = router;
```

* Create the model
* Touch `src/server/models/index.js`

```js
const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String
  },
  artist: {
    type: String
  },
  art: {
    type: String
  },
  year: {
    type: String
  },
  rating: {
    type: Number
  }
});

module.exports = mongoose.model('Album', albumSchema);
```

* Get all albums

```js
// src/server/routes/index.test.js

// ...imports and other tests

describe('GET `/`', () => {
  it('should return a status of 200', async () => {
    const response = await request(app).get('/');

    assert.equal(response.status, 200);
  });

  it('should return an array of albums', async () => {
    await request(app)
      .post('/add')
      .send(newAlbum);

    const response = await request(app).get('/');

    assert.include(JSON.stringify(response.body), newAlbum.title);
    assert.equal(response.body.length, 1);
  });
});
```
