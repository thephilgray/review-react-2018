import React from 'react';
import styled from 'styled-components';

import Icon from './Icon';
import StarRating from './StarRating';
import pencil from '../icons/pencil.svg';
import bin from '../icons/bin.svg';

const CardWrapper = styled.div`
  position: relative;
  width: 310px;
  padding: 1em;
  box-shadow: 1px 4px 2px 1px #aaa;
  margin: 0.5em;
`;

const CardImage = styled.img`
  flex: 100%;
  width: 100%;
  height: auto;
  position: relative;
`;

const CardBody = styled.div`
  display: flex;
`;

const CardDetails = styled.div`
  flex: 60%;
  padding: 1em;

  & > h3 {
    margin: 0;
    line-height: 1.5;
  }

  & > h3 + p {
    margin-top: 0;
  }
`;

const CardControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 2em;
  justify-content: center;
  align-items: center;
`;

const CardButton = styled.button`
  padding: 0.25em;
  background: transparent;
  border-color: transparent;
  &:hover {
    cursor: pointer;
  }
`;

const Card = ({ card, placeholder = 'http://via.placeholder.com/300x300' }) => {
  return (
    <CardWrapper>
      <CardImage src={card.art || placeholder} />
      <CardBody>
        <CardDetails>
          <h3>{card.title}</h3>
          <p>
            {card.artist}
            <br />
            {card.year}
          </p>
          <StarRating rating={card.rating} />
        </CardDetails>
        <CardControls>
          <CardButton aria-label="Edit this album">
            <Icon glyph={pencil} />
          </CardButton>
          <CardButton aria-label="Delete this album">
            <Icon glyph={bin} />
          </CardButton>
        </CardControls>
      </CardBody>
    </CardWrapper>
  );
};

export default Card;
