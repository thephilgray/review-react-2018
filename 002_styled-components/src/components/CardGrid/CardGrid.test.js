import React from 'react';
import { shallow } from 'enzyme';

import CardGrid from './CardGrid';

describe('CardGrid', () => {
  it('renders properly', () => {
    const wrapper = shallow(<CardGrid />);

    expect(wrapper).toMatchSnapshot();
  });
});
