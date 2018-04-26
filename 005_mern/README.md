# MERN: Mongo Express React Node
Album Collector App

## Express + React Setup
There's incredible diversity in approaches to structuring a full-stack MERN application. The end results are the same, but it seems that no two are alike, and the Goldilocks principle applies. I spent the better part of a week reviewing boilerplates and tutorials. Each one was either a little outdated, or for my needs, either over-simplistic or too advanced. 

But I found one tutorial (link at the bottom of this section) that presented just the right amount of configuration and explanation to understand how the pieces fit together while also building the foundation for an app intended for production (albeit a silly demo).

This first section comprises of my notes while following along with that tutorial.

### Initial Config and Project Setup

We'll be building out this project structure:

```md
├── README.md
├── bin
├── index.html
├── nodemon.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── client
│   │   ├── App.js
│   │   └── index.js
│   └── server
│       ├── database
│       ├── index.js
│       ├── models
│       ├── routes
├── webpack.config.js

* Generated with tree-cli: https://www.npmjs.com/package/tree-cli
```

The `React` code is in the `client` directory, the `Express` and `Mongo` code is all in the `server` directory. Config files are at the project root.

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

Source: [https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708](https://hackernoon.com/full-stack-web-application-using-react-node-js-express-and-webpack-97dbd5b9d708)
## Connect to MongoDB

The notes in these next three sections are primarily influenced by the projects I worked on in the [Codecademy TDD Intensive course](https://www.codecademy.com/pro/intensive/test-driven-development).

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

*Later, we'll set the DATABASE_URL in `.env` to connect to a Mongo db on MLAB when running in production.*

## Server Testing

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

Source: [https://www.codecademy.com/pro/intensive/test-driven-development](https://www.codecademy.com/pro/intensive/test-driven-development)

### Write initial server tests and routes (confirm setup)

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

## Feature Testing
`Enzyme` is awesome for feature-testing React. It's easy to setup and the DOM manipulation and traversal API is intuitive. It actually renders whatever components you're testing and allows you to assert against that rendered code. I definitely intend to use it in this project. 

However, by itself, it doesn't give me full confidence and is a little onerous in a test-driven environment, where it would be preferable to write the very first feature tests against the DOM and not an abstraction. 

I've had good experiences with `Storybook`, which lets you develop your components in isolation, ideally the way you would write your tests. Creating stories and being able to interact with default states and different edge cases in the browser gives me a lot more confidence when I'm starting out and it's great for design. But it's not a stand-in for an automated test suite.

I want my feature/integration testing pyramid to include a small suite of end-to-end tests backed by a more complete stack of granular Enzyme tests.

Originally, I thought to use Webdriver.io, but after several daunting experiences struggling with the initial setup, I decided to finally try out `Cypress`, which has a wonderful [set of videos about testing a simple React app](https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App).

### Setup Cypress

* Install cypress

```bash
yarn add -D cypress
```

* Add cypress command to `package.json` scripts

```js
// package.json

  "scripts": {
  // ...other scripts
    "cypress": "cypress open"
  },
```

* Run cypress for the first time

```bash
yarn cypress
```

Cypress will create some `cypress.json` config file at the project root as well as a `cypress` directory which includes the following directories:

```md
./cypress

├── fixtures
├── integration
├── plugins
├── screenshots
└── support
```

* Remove the sample files in `fixtures` and `integration`. We'll be writing our tests inside `integration`.

Our project structure now resembles this:

```md
├── README.md
├── bin
│   └── mocha-test
├── cypress
│   ├── fixtures
│   ├── integration
│   ├── plugins
│   │   └── index.js
│   ├── screenshots
│   │   └── my-image.png
│   └── support
│       ├── commands.js
│       └── index.js
├── cypress.json
├── index.html
├── nodemon.json
├── package.json
├── public
│   ├── favicon.ico
│   └── index.html
├── src
│   ├── client
│   │   ├── App.js
│   │   └── index.js
│   └── server
│       ├── database
│       │   └── index.js
│       ├── index.js
│       ├── models
│       │   └── index.js
│       ├── routes
│       │   ├── index.js
│       │   └── index.test.js
│       └── sampledata.json
├── webpack.config.js
└── yarn.lock

```

### Write First Feature Test


Source: [https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App](https://docs.cypress.io/examples/examples/tutorials.html#Test-a-React-Todo-App)