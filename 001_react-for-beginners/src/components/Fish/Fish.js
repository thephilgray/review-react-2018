import React, { Component } from 'react';
import { formatPrice } from '../../helpers';

class Fish extends Component {
  render() {
    const { image, name, price, description, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{description}</p>
        <button disabled={!isAvailable}>
          {isAvailable ? 'Add to Order' : 'Sold Out'}
        </button>
      </li>
    );
  }
}

export default Fish;
