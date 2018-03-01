import React from 'react';

import { shallow } from 'enzyme';
import Header from './Header';

const props = { tagline: 'Fresh' };
const header = shallow(<Header {...props} />);

it('renders', () => {
  expect(header).toMatchSnapshot();
});

it('renders the `tagline` prop', () => {
  expect(header.find('.tagline').text()).toEqual('Fresh');
});
