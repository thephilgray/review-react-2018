import React from 'react';
import { shallow } from 'enzyme';
import Fish from '../Fish/Fish';

it('renders', () => {
  const wrapper = shallow(<Fish />);
  assert(wrapper).toMatchSnapshot();
});
