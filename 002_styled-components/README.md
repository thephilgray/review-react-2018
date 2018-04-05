## Styled Components - 002_styled-components

* Recreate the components in this [VUE project](https://github.com/philgrayphilgray/designs-2018/tree/master/000_album-collector) using React, Styled Components, and a TDD approach.

### Create a new project with Create React App

```bash
npx create-react-app <project-name>
```

* Remove boilerplate

### Create `index.css` and add base styles

```css
/**  src/index.css **/
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
```

### Install testing tools

* Install `enzyme` and adapter

```bash
yarn add --dev enzyme enzyme-adapter-react-16 enzyme-to-json
```

* Create `setupTests.js` file for enzyme:

```js
// src/setupTests.js

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

### Add Storybook

* Storybook is like a styleguide generator but it also serves as a kind of visual testing interface because you can setup different use cases for each component and pass in different props and view the rendered component or error message in isolation.
* Jest component tests are a little redundant at this point; so, I might just use Storybook to test all the UI components; I'll come back and write jest tests as needed

```bash
npm i -g @storybook/cli
getstorybook
yarn run storybook
```

### Create `App` component

```js
// src/App.test.js
import React from 'react';
import { shallow } from 'enzyme';

import App from './App';

describe('App', () => {
  it('should render properly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });
});
```

```js
// src/App.js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return <div>App</div>;
  }
}

export default App;
```

* Create a `Card` container component story

```js
// src/stories/index.js
import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../components/Card';

const cards = [
  {
    id: '1521567322',
    title: 'Space is the Place',
    artist: 'Sun Ra',
    art:
      'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
    year: '1973',
    rating: 5
  },
  {
    id: '1521567405',
    title: 'Lanquidity',
    artist: 'Sun Ra',
    art: 'https://upload.wikimedia.org/wikipedia/en/2/22/Lanquidity.jpg',
    year: '1978',
    rating: 4
  }
];

storiesOf('Card', module).add('with card', () => <Card card={cards[0]} />);
```

### Install Styled-Components

```bash
yarn add styled-components
```

* Create the `Card` container component
* Download and import some SVGs
* Import `styled` from `styled-components`

```js
import React, { Component } from 'react';
import styled from 'styled-components';

import pencil from '../icons/pencil.svg';
import bin from '../icons/bin.svg';

const CardWrapper = styled.div`
  position: relative;
  width: 310px;
  padding: 1em;
  box-shadow: 1px 4px 2px 1px #aaa;
  margin: 0.5em;
`;

const CardImage = styled.img`
  flex: 100%;
  width: 100%;
  height: auto;
  position: relative;
`;

const CardBody = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CardDetails = styled.div`
  flex: 60%;
  padding: 1em;
`;

const CardControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 2em;
  justify-content: center;
  align-items: center;
`;

const CardButton = styled.button`
  padding: 0.25em;
  background: transparent;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const CardIcon = styled.span`
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  background-image: url(${props => props.icon});
  background-size: 100%;
`;

const Card = ({ card, placeholder = 'http://via.placeholder.com/300x300' }) => {
  return (
    <CardWrapper>
      <CardImage src={card.art || placeholder} />
      <CardBody>
        <CardDetails>
          <p>{card.title}</p>
          <p>{card.artist}</p>
          <p>{card.year}</p>
        </CardDetails>
        <CardControls>
          <CardButton aria-label="Edit this album">
            <CardIcon icon={pencil} />
          </CardButton>
          <CardButton aria-label="Delete this album">
            <CardIcon icon={bin} />
          </CardButton>
        </CardControls>
      </CardBody>
    </CardWrapper>
  );
};

export default Card;
```

* Wherever we use `props` within a styled component, it might make sense to move it out to its own file
* In the example above, `CardIcon` would probably be more useful in its own `Icon` file, where it can be easily imported and reused throughout the app

* Create a new `Icon` component file from `CardIcon`

```js
import styled from 'styled-components';
import pencil from '../assets/svg/pencil.svg';

const Icon = styled.span`
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  background-image: url(${props => props.name});
  background-size: 100%;
`;

Icon.defaultProps = {
  name: { pencil }
};

export default Icon;
```

* But actually, it would be nice to use inline SVG icons. Let's try using an external tool to help.
* Eject and install `svg-sprite-html-webpack`

```bash
yarn eject
yarn add svg-sprite-html-webpack
```

* Change `webpack.config`. These are insertions:

```js
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
  module: {
    rules: [
         {
            test: /\.svg?$/,
            exclude: /node_modules/,
            use: SvgSpriteHtmlWebpackPlugin.getLoader()
          },
    ]
    },
    plugins: [
      new SvgSpriteHtmlWebpackPlugin({
        generateSymbolId: function(svgFilePath, svgHash, svgContent) {
          return svgHash.toString();
      }
    }),
    ]
```

* Add a `webpack.config.js` file to `.storybook`. We need to extend storybook to support the inlining of SVG icons. See [Full Control Mode]('https://storybook.js.org/configurations/custom-webpack-config/#full-control-mode')

```js
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');
// Export a function. Accept the base config as the only param.
module.exports = (storybookBaseConfig, configType) => {
  storybookBaseConfig.module.rules.push({
    test: /\.svg?$/,
    exclude: /node_modules/,
    use: SvgSpriteHtmlWebpackPlugin.getLoader()
  });
  storybookBaseConfig.plugins.push(
    new SvgSpriteHtmlWebpackPlugin({
      generateSymbolId: function(svgFilePath, svgHash, svgContent) {
        return svgHash.toString();
      }
    })
  );

  // Return the altered config
  return storybookBaseConfig;
};
```

### Create `CardGrid` component

```js
// src/components/CardGrid.test.js

import React from 'react';
import { shallow } from 'enzyme';

import CardGrid from './CardGrid';

const cards = [
  {
    id: '1521567322',
    title: 'Space is the Place',
    artist: 'Sun Ra',
    art:
      'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
    year: '1973',
    rating: 5
  },
  {
    id: '1521567405',
    title: 'Lanquidity',
    artist: 'Sun Ra',
    art: 'https://upload.wikimedia.org/wikipedia/en/2/22/Lanquidity.jpg',
    year: '1978',
    rating: 4
  }
];

describe('CardGrid', () => {
  it('renders properly', () => {
    const wrapper = shallow(<CardGrid cards={cards} />);

    expect(wrapper).toMatchSnapshot();
  });
});
```

```js
// src/components/CardGrid.js

import React, { Component } from 'react';
import styled from 'styled-components';

import Card from './Card';

const CardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class CardGrid extends Component {
  render() {
    return (
      <CardWrapper>
        {this.props.cards.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </CardWrapper>
    );
  }
}

export default CardGrid;
```

* Add `CardGrid` to stories

```js
import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../components/Card';

import CardGrid from '../components/CardGrid';

const cards = [
  {
    id: '1521567322',
    title: 'Space is the Place',
    artist: 'Sun Ra',
    art:
      'https://upload.wikimedia.org/wikipedia/en/6/6c/Space_Is_The_Place_album_cover.jpg',
    year: '1973',
    rating: 5
  },
  {
    id: '1521567405',
    title: 'Lanquidity',
    artist: 'Sun Ra',
    art: 'https://upload.wikimedia.org/wikipedia/en/2/22/Lanquidity.jpg',
    year: '1978',
    rating: 4
  }
];

storiesOf('Card', module).add('with card', () => <Card card={cards[0]} />);

storiesOf('CardGrid', module).add('with two cards', () => (
  <CardGrid cards={cards} />
));
```

### Create the `StarRating` component

* Design to be accessible-first
* Add propTypes and defaultProps

```js
import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Icon from './Icon';
import starFull from '../icons/star-full.svg';

const propTypes = {
  rating: PropTypes.number,
  editable: PropTypes.bool
};

const defaultProps = {
  rating: 0,
  editable: false
};

const StarRatingWrapper = styled.div``;

const StarRatingButton = styled.button`
  background: transparent;
  border-color: transparent;
  cursor: ${props => (props.disabled ? 'cursor' : 'pointer')};
`;

class StarRating extends React.Component {
  state = {
    stars: [false, false, false, false, false],
    hoverStars: [false, false, false, false, false]
  };

  /**Set the stars to the rating */
  componentDidMount() {
    this.setState(({ stars }) => {
      return { stars: this.updatedStars(this.props.rating - 1, stars) };
    });
  }
  updatedStars = (rating, prevStars) =>
    prevStars.map((star, index) => index <= rating);

  calculateNewRating = arr => arr.filter(Boolean).length;

  clickHandler = index => {
    this.setState(({ stars }) => {
      const newStars = this.updatedStars(index, stars);
      // console.log(this.calculateNewRating(newStars)); // update rating in store
      return { stars: newStars };
    });
  };

  mouseEnterHandler = index => {
    if (!this.props.editable) return;
    this.setState(({ hoverStars }) => {
      const newStars = this.updatedStars(index, hoverStars);
      return { hoverStars: newStars };
    });
  };

  mouseLeaveHandler = () => {
    if (!this.props.editable) return;
    this.setState(prevState => {
      const newStars = prevState.stars;
      return { hoverStars: [false, false, false, false, false] };
    });
  };

  render() {
    return (
      <StarRatingWrapper
        aria-labelledby={`${this.calculateNewRating(this.state.stars)} out of ${
          this.state.stars.length
        } stars`}
      >
        {this.state.stars
          ? this.state.stars.map((star, i) => (
              <StarRatingButton
                onClick={() => this.clickHandler(i)}
                key={i}
                aria-labelledby="star"
                aria-pressed={this.state.stars[i]}
                onMouseEnter={() => this.mouseEnterHandler(i)}
                onMouseLeave={this.mouseLeaveHandler}
                disabled={!this.props.editable}
              >
                <Icon
                  glyph={starFull}
                  inverted={!this.state.stars[i] && !this.state.hoverStars[i]}
                  altText={`${i + 1} of ${this.state.stars.length} stars`}
                  strokeColor="#000"
                  fillColor="#000"
                />
              </StarRatingButton>
            ))
          : null}
      </StarRatingWrapper>
    );
  }
}

StarRating.propTypes = propTypes;
StarRating.defaultProps = defaultProps;

export default StarRating;
```

### Dynamically size the Icon with `styled-props`

* Install `styled-props`

```bash
yarn add styled-props
```

* Create a `styles.js` file

```js
// src/styles.js

export const size = {
  width: {
    small: 1,
    medium: 2,
    large: 3
  },
  height: {
    small: 1,
    medium: 2,
    large: 3
  }
};
```

* import `styled-props` and `styles.js`
* Setup default props for the styled-component

```js
const IconWrapper = styled.div`
  display: inline-block;
  color: #1abc9c;
  width: ${styledProps(size.width, 'size')}em;
  height: ${styledProps(size.height, 'size')}em;
`;

IconWrapper.defaultProps = {
  size: 'medium'
};
```

* Now we can simply pass in 'small', 'medium', or 'large'

```js
storiesOf('Icon', module)
  .add('default', () => <Icon />)
  .add('with size', () => <Icon size="large" />);
```

* TODO: The above is not really a good example

### Create a Modal component

* Add `polished` for tons of CSS helpers

```bash
yarn add polished
```
