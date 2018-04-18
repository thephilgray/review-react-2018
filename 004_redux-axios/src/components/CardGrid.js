import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import Card from './Card';
import Spinner from './Spinner';

const propTypes = {
  cards: PropTypes.array,
  fallbackMessage: PropTypes.string
};

const defaultProps = {
  fallbackMessage: 'No items'
};

const CardWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: relative;
`;

class CardGrid extends Component {
  render() {
    const renderedCards = this.props.cards ? (
      this.props.cards.map((card, index) => <Card card={card} key={index} />)
    ) : (
      <Spinner />
    );

    return <CardWrapper>{renderedCards}</CardWrapper>;
  }
}

CardGrid.propTypes = propTypes;
CardGrid.defaultProps = defaultProps;

export default CardGrid;
