import React, { Component } from 'react';
import { formatPrice } from '../../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class Order extends Component {
  renderOrder = key => {
    const fish = this.props.fishes[key];
    const count = this.props.order[key];
    const isAvailable = fish && fish.status === 'available';
    if (!fish) return null;
    if (!isAvailable) {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 250, exit: 250 }}
        >
          <li key={key}>
            Sorry {fish ? fish.name : 'fish'} is no longer available
          </li>
        </CSSTransition>
      );
    } else {
      return (
        <CSSTransition
          classNames="order"
          key={key}
          timeout={{ enter: 250, exit: 250 }}
        >
          <li key={key}>
            {count} lbs {fish.name} {formatPrice(count * fish.price)}
            <button onClick={() => this.props.deleteOrder(key)}>
              Remove Order
            </button>
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
        <TransitionGroup component="ul">
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
