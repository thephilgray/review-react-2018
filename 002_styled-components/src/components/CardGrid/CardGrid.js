import React, { Component } from 'react';
import styled from 'styled-components';
import Card from '../Card/Card';

const CardGridWraper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

class CardGrid extends Component {
  render() {
    return (
      <CardGridWraper>
        {this.props.cards.map((card, index) => (
          <Card key={index} card={card} />
        ))}
      </CardGridWraper>
    );
  }
}

export default CardGrid;
