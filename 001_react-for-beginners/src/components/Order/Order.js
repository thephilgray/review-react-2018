import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { formatPrice } from '../../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    order: PropTypes.object
  };

  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: 'order',
      key,
      timeout: { enter: 500, exit: 500 }
    };

    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );
    } else {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition
                  classNames="count"
                  key={count}
                  timeout={{ enter: 500, exit: 500 }}
                >
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name} {formatPrice(count * fish.price)}
            </span>
            <button onClick={() => this.props.deleteOrder(key)}>x</button>
          </li>
        </CSSTransition>
      );
    }
  };
  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((acc, curr) => {
      const fish = this.props.fishes[curr];
      const count = this.props.order[curr];
      const isAvailable = fish && fish.status === 'available';
      if (isAvailable) {
        return acc + count * fish.price;
      }
      return acc;
    }, 0);
    return (
      <div className="order-wrap">
        <h2>Order</h2>
        <TransitionGroup component="ul" className="order">
          {orderIds.map(this.renderOrder)}
        </TransitionGroup>
        <div className="total">
          <strong>Total: </strong>
          {formatPrice(total)}
        </div>
      </div>
    );
  }
}

export default Order;
