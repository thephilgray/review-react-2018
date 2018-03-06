import React from 'react';
import { shallow, mount } from 'enzyme';

import Inventory from './Inventory';
import AddFishForm from '../AddFishForm/AddFishForm';
import sampleFishes from '../../sample-fishes';
import { toJson } from 'enzyme-to-json';

const inventory = shallow(<Inventory />);

describe('Inventory', () => {
  it('renders', () => {
    expect(inventory).toMatchSnapshot();
  });

  it('renders `AddFishForm` component', () => {
    expect(inventory.find(AddFishForm).exists()).toBe(true);
  });

  describe('when updating a field', () => {
    it('should call `updateFish`', () => {
      const mockUpdate = jest.fn();
      const wrapper = mount(
        <Inventory fishes={sampleFishes} updateFish={mockUpdate} />
      );
      const input = wrapper.find('.fish-edit input').first();
      input.simulate('change', { target: { value: 'Test' } });

      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});
