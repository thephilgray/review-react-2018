import React, { Component } from 'react';

class AddFishForm extends Component {
  createFish = e => {
    e.preventDefault();
    const fish = {
      name: this.nameRef.value,
      price: parseFloat(this.priceRef.value),
      status: this.statusRef.value,
      desc: this.descRef.value,
      image: this.imageRef.value
    };
    this.props.addFish(fish);
    e.currentTarget.reset();
  };

  render() {
    return (
      <form className="fish-edit" onSubmit={this.createFish}>
        <input
          type="text"
          name="name"
          ref={input => {
            this.nameRef = input;
          }}
          placeholder="Name"
        />
        <input
          type="text"
          name="price"
          ref={input => {
            this.priceRef = input;
          }}
          placeholder="Price"
        />
        <select
          name="status"
          ref={input => {
            this.statusRef = input;
          }}
          placeholder="Status"
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea
          name="desc"
          ref={input => {
            this.descRef = input;
          }}
          placeholder="Desc"
        />
        <input
          type="text"
          name=" image"
          ref={input => {
            this.imageRef = input;
          }}
          placeholder="Image"
        />
        <button type="submit">+ Add Fish</button>
      </form>
    );
  }
}

export default AddFishForm;
