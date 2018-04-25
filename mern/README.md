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

const data = require('./sampledata.json'); // using temporarily as seed data

const app = express();

const port = 8080;
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
yarn add -D babel-core babel-loader babel-preset-env babel-preset-react clean-webpack-plugin concurrently css-loader eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react html-webpack-plugin nodemon style-loader webpack webpack-cli webpack-dev-server
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
