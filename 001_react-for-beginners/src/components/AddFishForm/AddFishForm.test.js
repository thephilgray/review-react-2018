// TODO: test the form inputs and that the App component updates its state with the new fish

import React from 'react';
import { shallow } from 'enzyme';
import AddFishForm from './AddFishForm';

it('renders', () => {
  const wrapper = shallow(<AddFishForm />);
  expect(wrapper).toMatchSnapshot();
});
