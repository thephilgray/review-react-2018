import React, { Component } from 'react';
import { getFunName } from '../../helpers';

class StorePicker extends Component {
  goToStore = e => {
    e.preventDefault();
    const storeName = this.textInput.value;
    this.props.history.push(`/store/${storeName}`);
  };

  render() {
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input
          type="text"
          ref={input => {
            this.textInput = input;
          }}
          required
          placeholder="Store"
          defaultValue={getFunName()}
        />
        <button type="submit">Visit Store</button>
      </form>
    );
  }
}
export default StorePicker;
