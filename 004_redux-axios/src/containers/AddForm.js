import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { addAlbum, updateAlbum } from '../actions/';
import sampleData from '../sample_discography.json';
import axios from '../lib/albums';
import Form from '../components/Form';

const createNewAlbum = ({ art, title, artist, year, rating }) => {
  // for testing only
  const newId = Date.now().toString();
  const randomIndex = (max, min) =>
    Math.floor(Math.random() * (max + 1 - min) + min);
  const newAlbum = sampleData[randomIndex(sampleData.length, 0)];
  const newArtist = artist || 'Sun Ra';
  const newArt =
    art ||
    'https://upload.wikimedia.org/wikipedia/commons/5/59/SunRa_in_1992.jpg';
  const newTitle = title || newAlbum['Album'];
  const newYear = year || newAlbum['Recorded'];
  const newRating = rating || randomIndex(5, 3);

  return {
    id: newId,
    title: newTitle,
    artist: newArtist,
    art: newArt,
    year: newYear,
    rating: newRating
  };
};

class AddForm extends React.Component {
  componentDidMount() {
    if (this.props.match.path === '/:id/edit') {
      this.setState({ existing: this.props.match.params.id });
      axios.get(`/${this.props.match.params.id}`).then(response => {
        // set activeAlbum in redux store here

        this.formSetter(response.data);
      });
    }
  }

  state = {
    addForm: {
      art: {
        elementConfig: {
          type: 'imageUpload'
        },
        value: '',
        valid: false,
        touched: false
      },
      title: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Album Title'
        },
        value: '',
        valid: false,
        touched: false
      },
      artist: {
        elementConfig: {
          type: 'text',
          placeholder: 'Artist'
        },
        value: '',
        valid: false,
        touched: false
      },

      year: {
        elementConfig: {
          type: 'text',
          placeholder: 'Year Released'
        },
        value: '',
        valid: false,
        touched: false
      },
      rating: {
        elementConfig: {
          type: 'starRating'
        },
        value: 0,
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    submitted: false,
    existing: null
  };

  // checkValidity = (field, value, rule) => {

  // }

  formSetter = albumObject => {
    const updatedForm = Object.keys(this.state.addForm).reduce(
      (collection, current) => {
        collection[current].value = albumObject[current];
        return collection;
      },
      { ...this.state.addForm }
    );

    this.setState({
      // ...this.state,
      addForm: updatedForm,
      formIsValid: true
    });
  };

  inputChangedHandler = (event, inputIdentifier, payload) => {
    const updatedForm = {
      ...this.state.addForm
    };

    const updatedFormElement = {
      ...updatedForm[inputIdentifier]
    };

    if (payload) {
      updatedFormElement.value = payload;
    } else {
      updatedFormElement.value = event.target.value;
    }
    updatedFormElement.touched = true;
    updatedFormElement.valid = true; // customize this with a helper function
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    // check if form is valid

    this.setState({
      addForm: updatedForm,
      formIsValid: formIsValid
    });
  };

  onSubmitForm = e => {
    e.preventDefault();
    const updatedValues = Object.keys(this.state.addForm).reduce(
      (coll, curr) => {
        coll[curr] = this.state.addForm[curr].value;
        return coll;
      },
      {}
    );
    if (!this.state.existing) {
      const newAlbum = createNewAlbum(updatedValues);
      this.props.onAddAlbum(newAlbum);
    } else {
      this.props.onUpdateAlbum({ ...updatedValues, id: this.state.existing });
    }
    this.setState({ submitted: true });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.addForm) {
      formElementsArray.push({
        id: key,
        config: this.state.addForm[key]
      });
    }

    return (
      <div>
        {(!this.state.existing || this.state.formIsValid) && (
          <Form
            onSubmitForm={this.onSubmitForm}
            formElementsArray={formElementsArray}
            inputChangedHandler={this.inputChangedHandler}
          />
        )}

        {this.state.submitted ? <Redirect to="/" /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selected: state.albums.selected
  };
};

const mapDispatchToActions = dispatch => {
  return {
    onAddAlbum: newAlbum => dispatch(addAlbum(newAlbum)),
    onUpdateAlbum: albumToUpdate => dispatch(updateAlbum(albumToUpdate))
  };
};

export default connect(mapStateToProps, mapDispatchToActions)(AddForm);
