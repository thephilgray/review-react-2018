import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import CardGrid from '../components/CardGrid/CardGrid';
import Card from '../components/Card/Card';
import StarRating from '../components/StarRating';

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

const cardNoArt = { ...cards[1], art: '' };

storiesOf('CardGrid', module).add('with cards', () => (
  <CardGrid cards={cards} />
));

storiesOf('Card', module)
  .add('with card', () => <Card card={cards[0]} />)
  .add('with card and no image', () => <Card card={cardNoArt} />);

storiesOf('StarRating', module).add('with 4 of 5 stars', () => (
  <StarRating stars="4" />
));
