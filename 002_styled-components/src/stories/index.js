import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../components/Card';

import CardGrid from '../components/CardGrid';
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

storiesOf('Card', module).add('with card', () => <Card card={cards[0]} />);

storiesOf('CardGrid', module).add('with two cards', () => (
  <CardGrid cards={cards} />
));

storiesOf('StarRating', module)
  .add('default', () => <StarRating />)
  .add('read-only', () => <StarRating rating={2} />)
  .add('editable', () => <StarRating editable />);
