import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const CardWrapper = styled.div`
  position: relative;
  width: 310px;
  padding: 1em 0.5em;
  box-shadow: 1px 4px 2px 1px #aaa;
  margin: 0.5em;
  background: #eee;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  &:hover {
    box-shadow: 1px 4px 2px 2px #aaa;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
`;

const CardImageWrapper = styled.div`
  position: relative;
  height: 294px;
  width: 294px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CardBody = styled.div`
  display: flex;
  background: #ddd;
  padding: 0.5em;
  width: 100%;
`;

const CardDetails = styled.div`
  flex: 60%;

  h3 {
    margin: 0;
    line-height: 1.5;
    word-break: break-word;
  }

  p {
    margin: 0;
  }

  & > h3 + p {
    margin-top: 0;
    word-break: break-all;
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

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CardWrapper data-cy="Card">
        <CardImageWrapper>
          <CardImage src={this.props.art} />
        </CardImageWrapper>
        <CardBody>
          <CardDetails>
            <h3>{this.props.title}</h3>
            <p>{this.props.year}</p>
          </CardDetails>
          <CardControls>
            <CardButton aria-label="Edit this album">Edit</CardButton>
            <CardButton aria-label="Delete this album">Delete</CardButton>
          </CardControls>
        </CardBody>
      </CardWrapper>
    );
  }
}

Card.propTypes = {
  artist: PropTypes.string,
  art: PropTypes.string,
  title: PropTypes.string,
  year: PropTypes.string
};
Card.defaultProps = {
  art: 'http://via.placeholder.com/300x300',
  title: 'Unknown title',
  artist: 'Unknown artist',
  year: 'Unknown year'
};
export default Card;
