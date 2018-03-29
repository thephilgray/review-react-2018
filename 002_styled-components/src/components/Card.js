import React, { Component } from 'react';
import styled from 'styled-components';

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
  flex-wrap: wrap;
`;

const CardDetails = styled.div`
  flex: 60%;
  padding: 1em;
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

const CardIcon = styled.span`
  width: 1.5em;
  height: 1.5em;
  display: inline-block;
  background-image: url(${props => props.icon});
  background-size: 100%;
`;

const Card = ({ card, placeholder = 'http://via.placeholder.com/300x300' }) => {
  return (
    <CardWrapper>
      <CardImage src={card.art || placeholder} />
      <CardBody>
        <CardDetails>
          <p>{card.title}</p>
          <p>{card.artist}</p>
          <p>{card.year}</p>
        </CardDetails>
        <CardControls>
          <CardButton aria-label="Edit this album">
            <CardIcon icon={pencil} />
          </CardButton>
          <CardButton aria-label="Delete this album">
            <CardIcon icon={bin} />
          </CardButton>
        </CardControls>
      </CardBody>
    </CardWrapper>
  );
};

export default Card;
