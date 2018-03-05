import React from 'react';
import { shallow } from 'enzyme';
import StorePicker from './StorePicker';

const storePicker = shallow(<StorePicker />);
// the input default value is selected randomly
it.skip('renders correctly', () => {
  expect(storePicker).toMatchSnapshot();
});
