import React from 'react';

import styled from 'styled-components';

import FormInput from '../components/FormInput';

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

class AddForm extends React.Component {
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
    formIsValid: false
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
      <NewForm onSubmit={e => e.preventDefault()}>
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

        <NewFormSubmitButton disabled={!this.state.addForm.formIsValid}>
          Save
        </NewFormSubmitButton>
      </NewForm>
    );
  }
}

export default AddForm;
