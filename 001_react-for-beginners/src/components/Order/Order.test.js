import React from 'react';
import { shallow } from 'enzyme';

import Order from './order';

const order = shallow(<Order />);

it('renders', () => {
  expect(order).toMatchSnapshot();
});
