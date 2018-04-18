import React from 'react';

import styled from 'styled-components';

import Icon from './Icon';
import searchIcon from '../icons/search.svg';
import sortAlphaAsc from '../icons/sort-alpha-asc.svg';
import sortAlphaDesc from '../icons/sort-alpha-desc.svg';
import sortAmountAsc from '../icons/sort-amount-asc.svg';
import sortAmountDesc from '../icons/sort-amount-desc.svg';

const UserControlsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 310px;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  background: #c4c4c4;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 3em;
`;

const UserControlsSearchInput = styled.input`
  font-size: 1.5em;
  width: ${props => (props.active ? '100%' : '0')};

  padding: ${props => (props.active ? '0.5em' : '0')};
  flex: ${props => (props.active ? '3 0 50%' : '0')};
  margin: 0;
  border: none;
  transition: all 0.5s ease-in-out;
`;

const UserControlsButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: transparent;
`;

class UserControls extends React.Component {
  searchInput = null;
  searchButton = null;

  state = {
    search: { active: false, query: '' },
    sort: {
      alpha: { active: false, asc: true },
      rating: { active: false, asc: false }
    }
  };

  searchButtonHandler = () => {
    console.log('clicked');
    if (this.state.search.active) {
      this.setState(prevState => {
        return { ...{ search: { active: false, query: '' } } };
      });
      this.searchButton.focus();
    } else {
      this.setState(prevState => {
        return {
          ...{
            search: { ...prevState.search, active: !prevState.search.active }
          }
        };
      });

      this.searchInput.focus();
    }
  };

  sortAlphaHandler = () => {
    this.setState(prevState => {
      return {
        search: { ...prevState.search, active: false },
        sort: {
          rating: { ...prevState.sort.rating, active: false },
          alpha: { active: true, asc: !prevState.sort.alpha.asc }
        }
      };
    });
  };

  sortRatingHandler = () => {
    this.setState(prevState => {
      return {
        search: { ...prevState.search, active: false },
        sort: {
          alpha: { ...prevState.sort.alpha, active: false },
          rating: { active: true, asc: !prevState.sort.rating.asc }
        }
      };
    });
  };
  searchInputKeyHandler = e => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.setState(prevState => {
        return { ...{ search: { active: false, query: '' } } };
      });
      this.searchButton.focus();
    }
  };

  render() {
    return (
      <UserControlsWrapper>
        <UserControlsSearchInput
          fieldType="text"
          active={this.state.search.active === true}
          innerRef={el => {
            this.searchInput = el;
          }}
          onKeyDown={this.searchInputKeyHandler}
        />
        <UserControlsButton
          onClick={this.searchButtonHandler}
          innerRef={el => {
            this.searchButton = el;
          }}
        >
          <Icon glyph={searchIcon} fillColor="black" />
        </UserControlsButton>
        <UserControlsButton onClick={this.sortAlphaHandler}>
          <Icon
            glyph={this.state.sort.alpha.asc ? sortAlphaDesc : sortAlphaAsc}
            fillColor="black"
          />
        </UserControlsButton>
        <UserControlsButton onClick={this.sortRatingHandler}>
          <Icon
            glyph={this.state.sort.rating.asc ? sortAmountAsc : sortAmountDesc}
            fillColor="black"
          />
        </UserControlsButton>
      </UserControlsWrapper>
    );
  }
}

export default UserControls;
