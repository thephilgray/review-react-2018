import React from 'react';
import { shallow } from 'enzyme';

import Order from './order';
import sampleFishes from '../../sample-fishes';

describe('Order', () => {
  it('renders', () => {
    const wrapper = shallow(
      <Order fishes={sampleFishes} order={{ fish1: 1 }} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  describe('when the fish becomes unavailable', () => {
    const withUnavailableFish = { ...sampleFishes };
    withUnavailableFish.fish1.status = 'unavailable';
    const wrapper = shallow(
      <Order fishes={withUnavailableFish} order={{ fish1: 1 }} />
    );
    expect(wrapper.find('.total').text()).toContain('$0.00');
    expect(wrapper.find('.order-wrap ul').text()).toContain('Sorry');
  });
});
