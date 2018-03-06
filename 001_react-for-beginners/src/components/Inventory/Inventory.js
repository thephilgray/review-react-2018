import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import base, { firebaseApp } from '../../base';
import AddFishForm from '../AddFishForm/AddFishForm';
import EditFishForm from '../EditFishForm/EditFishForm';
import Login from '../Login/Login';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object,
    updateFish: PropTypes.func,
    deleteFish: PropTypes.func,
    loadSampleFishes: PropTypes.func,
    storeId: PropTypes.string.isRequired
  };

  state = {
    uid: null,
    owner: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const store = await base.fetch(this.props.storeId, { context: this });
    console.log(store);
    if (!store.owner) {
      await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
      });
    }
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid
    });
  };
  logout = async () => {
    console.log('Logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  render() {
    const logout = <button onClick={this.logout}>Logout</button>;

    if (!this.state.uid) {
      return <Login authenticate={this.authenticate} />;
    }
    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }
    return (
      <div className="Inventory">
        <h2>Inventory</h2>
        {logout}
        {this.props.fishes
          ? Object.keys(this.props.fishes).map(key => (
              <EditFishForm
                key={key}
                index={key}
                fish={this.props.fishes[key]}
                updateFish={this.props.updateFish}
                deleteFish={this.props.deleteFish}
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
