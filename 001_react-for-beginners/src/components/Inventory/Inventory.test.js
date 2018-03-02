import React from 'react';
import { shallow } from 'enzyme';

import Inventory from './Inventory';
import AddFishForm from '../AddFishForm/AddFishForm';

const inventory = shallow(<Inventory />);

it('renders', () => {
  expect(inventory).toMatchSnapshot();
});

it('renders `AddFishForm` component', () => {
  expect(inventory.find(AddFishForm).exists()).toBe(true);
});
