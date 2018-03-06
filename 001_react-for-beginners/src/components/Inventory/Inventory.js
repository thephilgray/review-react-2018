import React, { Component } from 'react';
import AddFishForm from '../AddFishForm/AddFishForm';
import EditFishForm from '../EditFishForm/EditFishForm';

class Inventory extends Component {
  render() {
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
        {this.props.fishes
          ? Object.keys(this.props.fishes).map(key => (
              <EditFishForm
                key={key}
                index={key}
                fish={this.props.fishes[key]}
                updateFish={this.props.updateFish}
              />
            ))
          : null}
        <AddFishForm addFish={this.props.addFish} />
        <button
          className="button-loadFishes"
          onClick={this.props.loadSampleFishes}
        >
          Load Sample Fishes
        </button>
      </div>
    );
  }
}

export default Inventory;
