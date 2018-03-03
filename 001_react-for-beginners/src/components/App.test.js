import React from 'react';
import { shallow, mount } from 'enzyme';

import App from './App';
import Header from './Header/Header';
import Order from './Order/Order';
import Inventory from './Inventory/Inventory';
import sampleFishes from '../sample-fishes';

const app = shallow(<App />);
it('renders correctly', () => {
  expect(app).toMatchSnapshot();
});

it('renders a `Header` component', () => {
  expect(app.find(Header).length).toBe(1);
});

it('renders a `Order` component', () => {
  expect(app.find(Order).length).toBe(1);
});

it('renders a `Inventory` component', () => {
  expect(app.find(Inventory).exists()).toBe(true);
});

// const testFish = {
//   desc: 'Another fish',
//   image: 'http://images.com/perch.jpg',
//   name: 'Perch',
//   price: 29,
//   status: 'available'
// };
it('adds a single fish to app state on submit', () => {
  const wrapper = mount(<App />);
  // wrapper
  //   .find('.fish-edit')
  //   .find('input[name="name"]')
  //   .simulate('change', {
  //     target: { value: testFish.name }
  //   });

  wrapper.find('form').simulate('submit');
  expect(Object.keys(wrapper.state().fishes).length).toBe(1);
});

it('loads fishes object to app state', () => {
  const wrapper = mount(<App />);
  wrapper
    .find('Inventory')
    .find('.button-loadFishes')
    .simulate('click');
  expect(wrapper.state().fishes).toEqual(sampleFishes);
});
