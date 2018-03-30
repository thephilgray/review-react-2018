import React from 'react';
import { storiesOf } from '@storybook/react';

import Card from '../components/Card';

import CardGrid from '../components/CardGrid';
import StarRating from '../components/StarRating';
import Icon from '../components/Icon';
import cards from './sampleCards';
import FormInput from '../components/FormInput';

storiesOf('Card', module)
  .add('default', () => <Card />)
  .add('with card', () => <Card card={cards[0]} />);

storiesOf('CardGrid', module)
  .add('default', () => <CardGrid />)
  .add('with cards', () => <CardGrid cards={cards} />);

storiesOf('Icon', module)
  .add('default', () => <Icon />)
  .add('with size', () => <Icon size="4em" />)
  .add('with fillColor', () => <Icon fillColor="#000" />);

storiesOf('StarRating', module)
  .add('default', () => <StarRating />)
  .add('with rating', () => <StarRating rating={2} />)
  .add('with editable', () => <StarRating editable />);

storiesOf('FormInput', module)
  .add('default', () => <FormInput />)
  .add('with fieldType password', () => <FormInput fieldType="password" />);
