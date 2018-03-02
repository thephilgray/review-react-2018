import React from 'react';
import { shallow } from 'enzyme';

import App from './App';
import Header from './Header/Header';
import Order from './Order/Order';
import Inventory from './Inventory/Inventory';

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
