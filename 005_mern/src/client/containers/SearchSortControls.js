import React from 'react';
import styled from 'styled-components';

const SearchSortControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 310px;
  margin: 1em auto;
  justify-content: center;
  align-items: center;
  background: #c4c4c4;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 3em;
`;

const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: transparent;
`;

const SearchInput = styled.input`
  font-size: 1.5em;
  width: ${props => (props.active ? '100%' : '0')};
  padding: ${props => (props.active ? '0.5em' : '0')};
  flex: ${props => (props.active ? '3 0 50%' : '0')};
  margin: 0;
  border: none;
  transition: all 0.5s ease-in-out;
`;

const SearchSortControls = class extends React.Component {
  constructor(props) {
    super(props);
    this.searchInput = null;
    this.searchButton = null;
    this.searchButtonHandler = this.searchButtonHandler.bind(this);
  }

  searchButtonHandler() {
    this.props.onToggleSearchActive();
    if (this.props.searchActive) {
      this.searchButton.focus();
    } else {
      this.searchInput.focus();
    }
  }

  render() {
    const { props } = this;

    return (
      <SearchSortControlsWrapper>
        <SearchInput
          type="text"
          data-cy="searchAlbums"
          onChange={props.search}
          value={props.query}
          active={props.searchActive}
          innerRef={(el) => {
            this.searchInput = el;
          }}
        />
        <Button
          data-cy="searchButton"
          onClick={this.searchButtonHandler}
          innerRef={(el) => {
            this.searchButton = el;
          }}
        >
          Search
        </Button>
        <Button onClick={props.onSortByRatingAsc}>Sort By Rating (asc)</Button>
        <Button onClick={props.onSortByRatingDesc}>Sort By Rating (desc)</Button>
        <Button onClick={props.onSortByTitleAsc}>Sort By Title (asc)</Button>
        <Button onClick={props.onSortByTitleDesc}>Sort By Title (desc)</Button>
      </SearchSortControlsWrapper>
    );
  }
};

export default SearchSortControls;
