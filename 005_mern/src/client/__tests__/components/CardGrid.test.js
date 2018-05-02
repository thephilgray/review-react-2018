import React from 'react';
import { shallow } from 'enzyme';

import { CardGrid } from '../../components/CardGrid';
import sampledata from '../../../server/sampledata.json';

describe('CardGrid', () => {
  it('renders', () => {
    const wrapper = shallow(<CardGrid />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders a card for each item', () => {
    const wrapper = shallow(<CardGrid items={sampledata} />);
    expect(wrapper.children().length).toBe(7);
  });
});
