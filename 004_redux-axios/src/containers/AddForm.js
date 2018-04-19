import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';

import { addAlbum } from '../actions/';
import FormInput from '../components/FormInput';

import sampleData from '../sample_discography.json';

const NewForm = styled.form`
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
`;

const NewFormSubmitButton = styled.button`
  width: 100%;
  padding: 1em 0.25em;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:not([disabled]) {
    cursor: pointer;
  }
`;

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
    formIsValid: true,
    submitted: false
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
    const newAlbum = createNewAlbum(updatedValues);
    this.props.onAddAlbum(newAlbum);
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
      <NewForm onSubmit={this.onSubmitForm}>
        {formElementsArray.map(formElement => {
          return (
            <FormInput
              key={formElement.id}
              name={formElement.id}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              validation={formElement.config.validation}
              valid={formElement.config.valid}
              touched={formElement.config.touched}
              changed={(event, payload) =>
                this.inputChangedHandler(event, formElement.id, payload)
              }
            />
          );
        })}

        <NewFormSubmitButton type="submit">Save</NewFormSubmitButton>
        {this.state.submitted ? <Redirect to="/" /> : null}
      </NewForm>
    );
  }
}

const mapDispatchToActions = dispatch => {
  return {
    onAddAlbum: newAlbum => dispatch(addAlbum(newAlbum))
  };
};

export default connect(null, mapDispatchToActions)(AddForm);
