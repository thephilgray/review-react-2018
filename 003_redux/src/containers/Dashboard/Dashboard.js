import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../store/actions/actions';
export class Dashboard extends Component {
  render() {
    return (
      <div>
        <h2>Dashboard</h2>
        <h3>{this.props.counter}</h3>
        <button
          className="dashboard__button dashboard__buttonIncrement"
          onClick={() => this.props.increment()}
        >
          increment
        </button>
        <button
          className="dashboard__button dashboard__buttonDecrement"
          onClick={() => this.props.decrement()}
        >
          decrement
        </button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    counter: state.counter
  };
};
const mapDispatchToActions = dispatch => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  };
};
export default connect(mapStateToProps, mapDispatchToActions)(Dashboard);
