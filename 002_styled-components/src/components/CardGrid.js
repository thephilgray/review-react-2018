import React, { Component } from 'react';
import styled from 'styled-components';

import Card from './Card';

const CardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class CardGrid extends Component {
  render() {
    return (
      <CardWrapper>
        {this.props.cards.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </CardWrapper>
    );
  }
}

export default CardGrid;
