import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router';

import Dashboard from './containers/Dashboard/Dashboard';
import LandingPage from './containers/LandingPage/LandingPage';
import App from './App';

test('renders the `App` component properly', () => {
  const wrapper = shallow(<App />);
  expect(wrapper).toMatchSnapshot();
});

test('renders the `LandingPage` component at `/`', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.find(Dashboard)).toHaveLength(0);
  expect(wrapper.find(LandingPage)).toHaveLength(1);
});

test('renders the `Dashboard` component at `/dashboard`', () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={['/dashboard']}>
      <App />
    </MemoryRouter>
  );

  expect(wrapper.find(Dashboard)).toHaveLength(1);
  expect(wrapper.find(LandingPage)).toHaveLength(0);
});
