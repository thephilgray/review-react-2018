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

const createNewAlbum = () => {
  // for testing only
  const newId = Date.now().toString();
  const randomIndex = (max, min) =>
    Math.floor(Math.random() * (max + 1 - min) + min);
  const newAlbum = sampleData[randomIndex(sampleData.length, 0)];
  const newYear = newAlbum['Recorded'];
  const newTitle = newAlbum['Album'];
  const newRating = randomIndex(5, 3);

  return {
    id: newId,
    title: newTitle,
    artist: 'Sun Ra',
    art:
      'https://upload.wikimedia.org/wikipedia/commons/5/59/SunRa_in_1992.jpg',
    year: newYear,
    rating: newRating
  };
};

class AddForm extends React.Component {
  onSubmitForm = e => {
    e.preventDefault();
    const newAlbum = createNewAlbum();
    this.props.onAddAlbum(newAlbum);
    this.setState({ submitted: true });
  };
  state = {
    addForm: {
      art: {
        elementType: 'imageUpload',
        elementConfig: {
          alt: 'Upload an album cover'
        },
        value: '',
        validation: {
          required: true
        },
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
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      artist: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Artist'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },

      year: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Year Released'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      rating: {
        elementType: 'starRating',
        elementConfig: {},
        value: '0',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: true,
    submitted: false
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
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              validation={formElement.config.validation}
              valid={formElement.config.valid}
              touched={formElement.config.touched}
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
