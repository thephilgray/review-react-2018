import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

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
    const wrapper = mount(
      <Order fishes={withUnavailableFish} order={{ fish1: 1 }} />
    );
    expect(wrapper.find('.order-wrap').text()).toContain('$0.00');
    expect(wrapper.find('.order-wrap').text()).toContain('Sorry');
  });
});
