import React from 'react';
import { shallow } from 'enzyme';

import Card from '../../components/Card';
import sampleData from '../../../server/sampledata.json';

describe('Card', () => {
  it('renders', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a card title by default', () => {
    const wrapper = shallow(<Card />);
    expect(wrapper.find('h3').text()).toBeTruthy();
  });

  it('should render the title of the provided item', () => {
    const sampleItem = sampleData[0];
    const wrapper = shallow(<Card {...sampleItem} />);
    expect(wrapper.find('[data-cy="card__title"]').text()).toContain(sampleItem.title);
  });
});
