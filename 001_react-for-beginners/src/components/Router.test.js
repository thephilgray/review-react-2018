import React from 'react';
import { shallow } from 'enzyme';

import Router from './Router';

const router = shallow(<Router />);

it('renders the component', () => {
  expect(router).toMatchSnapshot();
});
