import React from 'react';
import { shallow } from 'enzyme';

import Card from '../components/Card';

describe('Card', () => {
  it('renders', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a card title by default', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('h3').text()).toBe('Unknown title');
  });
});
