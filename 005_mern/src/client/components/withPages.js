import React from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import styled from 'styled-components';

const PageButton = styled.button``;

const withPages = (WrappedComponent) => {
  class WithPages extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        maxItemsPerPage: props.maxItemsPerPage,
        pages: null,
        numberOfPages: 1,
        currentPageIndex: 0
      };
      this.pages = this.pages.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
      const pages = this.pages(this.props.items);
      const numberOfPages = pages.length;
      this.setState({ pages, numberOfPages });
    }

    pages(items) {
      return chunk(items, this.state.maxItemsPerPage);
    }
    nextPage() {
      this.setState((prevState) => {
        const nextPageIndex = prevState.currentPageIndex + 1;
        return { currentPageIndex: nextPageIndex };
      });
    }

    prevPage() {
      this.setState((prevState) => {
        const prevPageIndex = prevState.currentPageIndex - 1;
        return { currentPageIndex: prevPageIndex };
      });
    }

    render() {
      return (
        <div>
          {this.state.pages !== null ? (
            <WrappedComponent
              {...this.props}
              items={this.state.pages[this.state.currentPageIndex]}
            />
          ) : null}
          <p>
            {this.state.currentPageIndex + 1} of {this.state.numberOfPages} pages
          </p>
          {this.state.currentPageIndex > 0 ? (
            <PageButton data-cy="prevPage" onClick={this.prevPage}>
              Previous
            </PageButton>
          ) : null}
          {this.state.currentPageIndex < this.state.numberOfPages - 1 ? (
            <PageButton data-cy="nextPage" onClick={this.nextPage}>
              Next
            </PageButton>
          ) : null}
        </div>
      );
    }
  }
  WithPages.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    maxItemsPerPage: PropTypes.number
  };

  WithPages.defaultProps = {
    items: [{}],
    maxItemsPerPage: 10
  };
  return WithPages;
};

export default withPages;
