import React from 'react';

import { shallow } from 'enzyme';
import Header from './Header';

const header = shallow(<Header />);

it('renders', () => {
  expect(header).toMatchSnapshot();
});
