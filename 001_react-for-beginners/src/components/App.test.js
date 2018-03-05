import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import Header from './Header/Header';
import Order from './Order/Order';
import Inventory from './Inventory/Inventory';
import sampleFishes from '../sample-fishes';

describe('app', () => {
  const app = shallow(<App />);
  it('renders correctly', () => {
    expect(app).toMatchSnapshot();
  });

  it('renders a `Header` component', () => {
    expect(app.find(Header).length).toBe(1);
  });

  it('renders a `Order` component', () => {
    expect(app.find(Order).length).toBe(1);
  });

  it('renders a `Inventory` component', () => {
    expect(app.find(Inventory).exists()).toBe(true);
  });

  it('adds a single fish to app state on submit', () => {
    const wrapper = mount(<App />);
    wrapper.find('form').simulate('submit');
    expect(Object.keys(wrapper.state().fishes).length).toBe(1);
  });

  it('loads fishes object to app state', () => {
    const wrapper = mount(<App />);
    wrapper
      .find('Inventory')
      .find('.button-loadFishes')
      .simulate('click');
    expect(wrapper.state().fishes).toEqual(sampleFishes);
  });

  it('renders fish components from state', () => {
    const wrapper = mount(<App />);
    wrapper
      .find('Inventory')
      .find('.button-loadFishes')
      .simulate('click');

    const fishes = wrapper.find('.fishes');
    expect(toJson(fishes).children.length).toBe(
      Object.values(sampleFishes).length
    );
  });
});
