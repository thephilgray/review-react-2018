import React from 'react';
import { shallow, mount } from 'enzyme';

import Inventory from './Inventory';
import AddFishForm from '../AddFishForm/AddFishForm';
import sampleFishes from '../../sample-fishes';
import { toJson } from 'enzyme-to-json';

const inventory = shallow(<Inventory storeId="test-store" />);

describe('Inventory', () => {
  it('renders', () => {
    expect(inventory).toMatchSnapshot();
  });

  it('renders `AddFishForm` component', () => {
    const mockUpdate = jest.fn();
    const wrapper = mount(
      <Inventory
        fishes={sampleFishes}
        updateFish={mockUpdate}
        storeId="test-store"
      />
    );
    wrapper.setState({
      uid: process.env.REACT_APP_AUTH_UID,
      owner: process.env.REACT_APP_AUTH_UID
    });

    expect(wrapper.find(AddFishForm).exists()).toBe(true);
  });

  describe('when updating a field', () => {
    it('should call `updateFish`', () => {
      const mockUpdate = jest.fn();
      const wrapper = mount(
        <Inventory
          fishes={sampleFishes}
          updateFish={mockUpdate}
          storeId="test-store"
        />
      );
      wrapper.setState({
        uid: process.env.REACT_APP_AUTH_UID,
        owner: process.env.REACT_APP_AUTH_UID
      });
      const input = wrapper.find('.fish-edit input').first();
      input.simulate('change', { target: { value: 'Test' } });

      expect(mockUpdate).toHaveBeenCalled();
    });
  });
});
