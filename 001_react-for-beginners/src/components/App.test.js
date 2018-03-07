import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from './App';
import Header from './Header/Header';
import Order from './Order/Order';
import Inventory from './Inventory/Inventory';
import sampleFishes from '../sample-fishes';
import base from '../base';

class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = value;
  }
  removeItem(key) {
    delete this.store[key];
  }
}
global.localStorage = new LocalStorageMock();

describe('app', () => {
  afterEach(() => {
    base.remove('test-store/fishes');
  });

  const mockMatch = { params: { storeId: 'test-store' } };

  const app = shallow(<App match={mockMatch} />);
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
    const wrapper = mount(<App match={mockMatch} fishes={{}} />);
    wrapper.instance().addFish(sampleFishes.fish1);
    expect(Object.keys(wrapper.state().fishes).length).toBe(1);
  });

  it('loads fishes object to app state', () => {
    const wrapper = mount(<App match={mockMatch} />);
    wrapper.instance().loadSampleFishes();
    expect(wrapper.state().fishes).toEqual(sampleFishes);
  });

  it('renders fish components from state', () => {
    const wrapper = mount(<App match={mockMatch} />);

    wrapper.instance().loadSampleFishes();

    const fishes = wrapper.find('.fishes');
    expect(fishes.instance().children.length).toBe(
      Object.values(sampleFishes).length
    );
  });
  describe('when calling `addToOrder`', () => {
    it('adds to order', () => {
      const wrapper = mount(<App match={mockMatch} />);

      wrapper.instance().loadSampleFishes();

      wrapper.instance().addToOrder('fish1');

      expect(Object.values(wrapper.state().order)).toHaveLength(1);
    });
  });

  describe('when manually calling `updateFish`', () => {
    it('changes the value in `state.fishes`', () => {
      const wrapper = mount(<App match={mockMatch} />);

      wrapper.instance().loadSampleFishes();

      const updateFish = {
        desc: 'Test description',
        image: '/images/hali.jpg',
        name: 'Test',
        price: 1724,
        status: 'available'
      };

      wrapper.instance().updateFish('0', updateFish);
      expect(Object.values(wrapper.state().fishes[0])).toContain(
        'Test description'
      );
    });
  });
  describe('when manually calling `deleteFish`', () => {
    it('removes one item from `state.fishes`', () => {
      const testFishes = {
        fish1: {
          ...sampleFishes.fish1
        }
      };
      const wrapper = mount(<App match={mockMatch} fishes={testFishes} />);
      wrapper.instance().deleteFish(0);
      expect(Object.keys(wrapper.state().fishes).length).toBe(0);
    });
  });
  describe('`deleteOrder`', () => {
    it('removes one item from `state.order`', () => {
      const testOrder = {
        fish1: 1,
        fish2: 2
      };

      const wrapper = mount(<App match={mockMatch} order={testOrder} />);
      wrapper.instance().deleteOrder('fish2');
      expect(Object.keys(wrapper.state().order).length).toBe(1);
    });
  });
});
