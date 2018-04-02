import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

import '../index.css';

import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import StarRating from '../components/StarRating';
import Icon from '../components/Icon';
import FormInput from '../components/FormInput';
import Overlay from '../components/Overlay';

import cards from './sampleCards';
import Navigation from '../components/Navigation';

storiesOf('Card', module)
  .add('default', () => <Card />)
  .add('with card', () => <Card card={cards[0]} />);

storiesOf('CardGrid', module)
  .add('default', () => <CardGrid />)
  .add('with cards', () => <CardGrid cards={cards} />);

storiesOf('Icon', module)
  .add('default', () => <Icon />)
  .add('with size', () => <Icon size="large" />)
  .add('with fillColor', () => <Icon fillColor="#000" />);

storiesOf('StarRating', module)
  .add('default', () => <StarRating />)
  .add('with rating', () => <StarRating rating={2} />)
  .add('with editable', () => <StarRating editable />);

storiesOf('FormInput', module)
  .add('default', () => <FormInput />)
  .add('with fieldType number', () => <FormInput fieldType="number" />);

storiesOf('Navigation', module).add('default', () => <Navigation />);

storiesOf('Overlay', module)
  .add('default', () => <Overlay toggled />)
  .add('with Navigation', () => (
    <Overlay toggled>
      <Navigation />
    </Overlay>
  ))
  .add('with toggle handler', () => {
    const store = new Store({
      toggled: true
    });
    const toggleOverlay = () => store.set({ toggled: false });
    return (
      <div>
        <State store={store}>
          <Overlay toggleHandler={toggleOverlay}>
            <Navigation />
          </Overlay>
        </State>
      </div>
    );
  });
