import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';

// experienced issues passing/setting state for 2 components with @sambego/storebook-state in the second NavBar example
import { withState } from '@dump247/storybook-state';

import '../index.css';

import Card from '../components/Card';
import CardGrid from '../components/CardGrid';
import StarRating from '../components/StarRating';
import Icon from '../components/Icon';
import FormInput from '../components/FormInput';
import Overlay from '../components/Overlay';
import NavBar from '../components/NavBar';

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
  .add('with toggleHandler', () => {
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

storiesOf('NavBar', module)
  .add('defualt', () => <NavBar />)
  .add(
    'with toggleHandler',
    withState({ toggled: false }, store => {
      const toggleOpen = () => store.set({ toggled: true });
      const toggleClosed = () => store.set({ toggled: false });
      return (
        <div>
          <NavBar {...store.state} toggleHandler={toggleOpen} />
          <Overlay {...store.state} toggleHandler={toggleClosed}>
            <Navigation />
          </Overlay>
        </div>
      );
    })
  );
