import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import starEmpty from '../icons/star-empty.svg';
import starFull from '../icons/star-full.svg';

const StarRatingWrapper = styled.div`
  padding: 0.5em;
  display: flex;
  justify-content: center;
`;

const StarRatingButton = styled.button`
  background: transparent;
  border-color: transparent;
`;

class StarRating extends React.Component {
  state = {
    stars: [false, false, false, false, false]
  };

  clickHandler = index => {
    this.setState(prevState => {
      const newStars = [...this.state.stars];
      const mappedStars = newStars.map(
        (star, i) => (i <= index ? true : false)
      );
      return { stars: mappedStars };
    });
  };

  render() {
    const getStars = () => {
      const arr = [];
      for (let i = 0; i < 5; i++) {
        arr.push(
          <StarRatingButton onClick={() => this.clickHandler(i)} key={i}>
            <Icon glyph={this.state.stars[i] ? starFull : starEmpty} />
          </StarRatingButton>
        );
      }
      return arr;
    };
    return <StarRatingWrapper>{getStars()}</StarRatingWrapper>;
  }
}

export default StarRating;
