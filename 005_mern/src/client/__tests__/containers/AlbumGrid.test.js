import React from 'react';
import { shallow } from 'enzyme';

import { AlbumGrid } from '../../containers/AlbumGrid';

describe('AlbumGrid container', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AlbumGrid />);
  });

  it('should render', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
