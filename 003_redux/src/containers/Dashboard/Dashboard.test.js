import React from 'react';
import { shallow } from 'enzyme';

import Dashboard from './Dashboard';

test('renders the Dashboard component', () => {
  const wrapper = shallow(<Dashboard />);
  expect(wrapper).toMatchSnapshot();
});
