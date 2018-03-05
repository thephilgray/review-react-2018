import React from 'react';
import { shallow } from 'enzyme';
import Fish from '../Fish/Fish';
import formatPrice from '../../helpers';

describe('Fish', () => {
  const sampleFish = {
    name: 'Pacific Halibut',
    image: '/images/hali.jpg',
    desc:
      'Everyones favorite white fish. We will cut it to the size you need and ship it.',
    price: 1724,
    status: 'available'
  };
  it('renders', () => {
    const wrapper = shallow(<Fish key="0" details={sampleFish} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('displays the fish name', () => {
    const wrapper = shallow(<Fish key="0" details={sampleFish} />);
    expect(wrapper.find('.fish-name').text()).toContain(sampleFish.name);
  });

  it('displays the price in USD', () => {
    const wrapper = shallow(<Fish key="0" details={sampleFish} />);
    expect(wrapper.find('.price').text()).toBe('$17.24');
  });

  describe('when the fish is unavailable', () => {
    it('disables the Add to Cart button', () => {
      const unavailableFish = { ...sampleFish };
      unavailableFish.status = 'unavailable';
      const wrapper = shallow(<Fish key="0" details={unavailableFish} />);
      expect(wrapper.find('button').prop('disabled')).toBe(true);
    });
  });
  describe('when the fish is available', () => {
    it('enables the Add to Cart button', () => {
      const wrapper = shallow(<Fish key="0" details={sampleFish} />);
      expect(wrapper.find('button').prop('disabled')).toBe(false);
    });
  });
});
