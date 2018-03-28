import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';

import store from './store/store';
import Dashboard from './containers/Dashboard/Dashboard';
import LandingPage from './containers/LandingPage/LandingPage';
import App from './App';

it('renders the `App` component properly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

it('renders the `LandingPage` component at `/`', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.find(Dashboard)).toHaveLength(0);
  expect(wrapper.find(LandingPage)).toHaveLength(1);
});

it('renders the `Dashboard` component at `/dashboard`', () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/dashboard']}>
        <App />
      </MemoryRouter>
    </Provider>
  );
  expect(wrapper.find(Dashboard)).toHaveLength(1);
  expect(wrapper.find(LandingPage)).toHaveLength(0);
});
