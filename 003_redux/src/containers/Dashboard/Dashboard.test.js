import React from 'react';

import { shallow, mount } from 'enzyme';

import { Dashboard } from './Dashboard';

describe('Dashboard', () => {
  it('renders the Dashboard component', () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
  });

  it('displays the counter from props', () => {
    const props = { counter: 0 };
    const wrapper = mount(<Dashboard {...props} />);
    expect(wrapper.find('h3').text()).toContain('0');
  });

  it('calls the increment action when the increment button is clicked', () => {
    const mockIncrement = jest.fn();
    const props = { counter: 0, increment: mockIncrement };
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.find('.dashboard__buttonIncrement').simulate('click');
    expect(mockIncrement).toHaveBeenCalled();
  });
  it('calls the decrement action when the decrement button is clicked', () => {
    const mockDecrement = jest.fn();
    const props = { counter: 0, decrement: mockDecrement };
    const wrapper = mount(<Dashboard {...props} />);
    wrapper.find('.dashboard__buttonDecrement').simulate('click');
    expect(mockDecrement).toHaveBeenCalled();
  });
});
